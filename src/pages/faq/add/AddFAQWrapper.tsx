import React from "react";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import { Formik, Form, FormikHelpers } from "formik";
import {  object, string } from "yup";
import AddFAQ from "./AddFAQ";
import { useNavigate } from "react-router-dom";
import { useAddFAQMutation } from "src/services/FAQService";
import { showToast } from "src/utils/toaster/showToast";
import { EditorState as EditorStateType } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { convertToRaw, EditorState } from "draft-js";

export type FAQInitialValues = {
  question: string;
  answer: EditorStateType;
};

const AddFAQWrapper = () => {
  const navigate = useNavigate();
  const [addFAQ] = useAddFAQMutation();

  // Form Initial Values
  const initialValues: FAQInitialValues = {
    question: "",
    answer: EditorState.createEmpty(),
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
  const handleSubmit = (
    values: FAQInitialValues,
    { setSubmitting }: FormikHelpers<FAQInitialValues>
  ) => {
    const formattedValues = {
      ...values,
      answer: draftToHtml(convertToRaw(values.answer.getCurrentContent())),
    };

    addFAQ(formattedValues).then((res: any) => {
      if (res.error) {
        showToast("error", res?.error?.data?.message);
        setSubmitting(false);
      } else {
        if (res?.data?.status) {
          showToast("success", res?.data?.message);
          setSubmitting(false);
          navigate("/faq");
        } else {
          showToast("error", res?.data?.message);
          setSubmitting(false);
        }
      }
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <SideNavLayout>
          <Form className="h-full">
            <AddFAQ formikProps={formikProps} />
          </Form>
        </SideNavLayout>
      )}
    </Formik>
  );
};

export default AddFAQWrapper;
