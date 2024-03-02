import { Form, Formik, FormikHelpers } from "formik";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import { mixed, object, string } from "yup";
import { showToast } from "src/utils/toaster/showToast";
import { useNavigate } from "react-router-dom";
import { useAddStaticPagesMutation } from "src/services/StaticPagesService";
import AddStaicPages from "./AddStaticPages";
import { EditorState as EditorStateType } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";

import {
  ContentState,
  convertFromHTML,
  convertToRaw,
  EditorState,
} from "draft-js";

export type StaticPagesInitialValues = {
  name: string;
  url: string;
  pageContent: EditorStateType;
};

const AddStaticPagesWrapper = () => {
  const [addStaticPages] = useAddStaticPagesMutation();
const navigate = useNavigate()
  const initialValues: StaticPagesInitialValues = {
    name: "",
    url: "",
    pageContent:EditorState.createWithContent(
      ContentState.createFromBlockArray(
        convertFromHTML( "").contentBlocks,
        convertFromHTML( "").entityMap
      )
    ),
  };
  const validationSchema = object({
    name: string().required("Name is required"),
    url: string().required("Url Title is required"),
    pageContent: mixed().required("Page Content is required"),
  });
  const handleSubmit = (values: StaticPagesInitialValues,{ setSubmitting }: FormikHelpers<StaticPagesInitialValues>) => {
    const formattedValues = {
      ...values,
      pageContent: draftToHtml(
        convertToRaw(values.pageContent.getCurrentContent())
      ),
    };
    addStaticPages(formattedValues).then((res:any)=>{
      if (res.error) {
        showToast("error", res?.error?.data?.message);
        setSubmitting(false);
      } else {
        showToast("success", res?.data?.message);
        navigate("/static-page");
        setSubmitting(false);
      }
    })
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {(formikProps) => (
        <SideNavLayout>
          <Form className="h-full">
            <AddStaicPages formikProps={formikProps} />
          </Form>
        </SideNavLayout>
      )}
    </Formik>
  );
};

export default AddStaticPagesWrapper;
