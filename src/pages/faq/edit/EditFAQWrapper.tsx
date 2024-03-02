import React from "react";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import { Formik, Form } from "formik";
import { object, string } from "yup";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSingleFAQQuery,
  useUpdateFAQMutation,
} from "src/services/FAQService";
import { showToast } from "src/utils/toaster/showToast";
import EditFAQ from "./EditFAQ";
import ATMPageLoader from "src/components/UI/atoms/ATMPageLoader/ATMPageLoader";
import { FAQListResponse } from "src/models/FAQ.model";
import {
  ContentState,
  convertFromHTML,
  convertToRaw,
  EditorState,
} from "draft-js";
import { EditorState as EditorStateType } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";

export type FAQInitialValues = {
  question: string;
  answer: EditorStateType;
};

const EditFAQWrapper = () => {
  const [FAQData, setFAQData] = React.useState<FAQListResponse | null>(null);
  const navigate = useNavigate();
  const { faqId } = useParams();
  const { data, isFetching, isLoading } = useGetSingleFAQQuery(faqId || "");
  const [updateFAQ, { isLoading: isUpdating }] = useUpdateFAQMutation();

  React.useEffect(() => {
    if (!isFetching && !isLoading) {
      setFAQData(data?.data || null);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching, isLoading, data]);

  // Form Initial Values
  const initialValues: FAQInitialValues = {
    question: FAQData?.question || "",
    answer: EditorState.createWithContent(
      ContentState.createFromBlockArray(
        convertFromHTML(FAQData?.answer || "").contentBlocks,
        convertFromHTML(FAQData?.answer || "").entityMap
      )
    ),
  };

  // Form Validation Schema
  const validationSchema = object({
    answer: object()
      .test("has text", "Answer is rewuired", (value: any) => {
        return value.getCurrentContent().hasText();
      })
      .required("Answer is required"),
    question: string().required("Question is required"),
  });

  // Form Submit Handler
  const handleSubmit = (values: FAQInitialValues) => {
    const formattedValues = {
      ...values,
      answer: draftToHtml(convertToRaw(values.answer.getCurrentContent())),
    };

    updateFAQ({ body: formattedValues, id: faqId }).then((res: any) => {
      if (res.error) {
        showToast("error", res?.error?.data?.message);
      } else {
        if (res?.data?.status) {
          showToast("success", res?.data?.message);
          navigate("/faq");
        } else {
          showToast("error", res?.data?.message);
        }
      }
    });
  };

  if (isLoading || isFetching) {
    return <ATMPageLoader />;
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <SideNavLayout>
          <Form className="h-full">
            <EditFAQ formikProps={formikProps} isUpdating={isUpdating} />
          </Form>
        </SideNavLayout>
      )}
    </Formik>
  );
};

export default EditFAQWrapper;
