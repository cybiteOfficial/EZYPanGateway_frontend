import React from "react";
import { Form, Formik, FormikHelpers } from "formik";

import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";

import { useNavigate, useParams } from "react-router-dom";
import { showToast } from "src/utils/toaster/showToast";
import { mixed, object, string } from "yup";
import EditStaticPages from "./EditStaticPages";
import { StaticPagesInitialValues } from "../add/AddStaticPagesWrapper";
import {
  useGetSingleStaticPageQuery,
  useUpdateStaticPageMutation,
} from "src/services/StaticPagesService";
import {
  ContentState,
  convertFromHTML,
  convertToRaw,
  EditorState,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import { StaticPagesListResponse } from "src/models/StaticPages.model";
import ATMPageLoader from "src/components/UI/atoms/ATMPageLoader/ATMPageLoader";

const validationSchema = object({
  name: string().required("URL is required"),
  url: string().required("File Title is required"),
  pageContent: mixed().required("Page Content is required"),
});
const EditStaticPageWrapper = () => {
  const { staticPageUrl = "" } = useParams();
  const navigate = useNavigate();
  const [updateStaticPage] = useUpdateStaticPageMutation();
  const { data, isLoading, isFetching } =
    useGetSingleStaticPageQuery(staticPageUrl);
  const [urlData, setUrlData] = React.useState<StaticPagesListResponse | null>(
    null
  );

  React.useEffect(() => {
    if (!isFetching && !isLoading) {
      setUrlData(data?.data || null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching, isLoading, data]);

  //   // Form Initial Values
  const intialValues: StaticPagesInitialValues = {
    name: urlData?.name || "",
    url: urlData?.url || "",
    pageContent: EditorState.createWithContent(
      ContentState.createFromBlockArray(
        convertFromHTML(urlData?.pageContent || "").contentBlocks,
        convertFromHTML(urlData?.pageContent || "").entityMap
      )
    ),
  };

  const handleSubmit = (values: StaticPagesInitialValues, { setSubmitting }: FormikHelpers<StaticPagesInitialValues>   ) => {
    const formattedValues = {
      ...values,
      pageContent: draftToHtml(
        convertToRaw(values.pageContent.getCurrentContent())
      ),
    };
    updateStaticPage({
      id: urlData?._id,
      body: formattedValues,
    }).then((res: any) => {
      if (res.error) {
        showToast("error", res.error.data.message);
        setSubmitting(false);
      } else {
        setSubmitting(false);
        showToast("success", res.data.message);
        navigate("/static-page");
      }
    });
  };

  if (isFetching || isLoading) {
    return <ATMPageLoader />;
  }

  return (
    <Formik
      enableReinitialize
      initialValues={intialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <SideNavLayout>
          <Form className="h-full">
            <EditStaticPages formikProps={formikProps} />
          </Form>
        </SideNavLayout>
      )}
    </Formik>
  );
};

export default EditStaticPageWrapper;
