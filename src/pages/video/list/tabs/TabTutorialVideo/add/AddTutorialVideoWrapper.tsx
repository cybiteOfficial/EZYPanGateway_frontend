import React from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { number, object, string } from "yup";
import AddTutorialVideo from "./AddTutorialVideo";
import { useNavigate } from "react-router-dom";
import { useAddTutorialVideoMutation } from "src/services/TutorialVideoService";
import { showToast } from "src/utils/toaster/showToast";

export type AddTutorialVideoInitialValues = {
  videoLink: string;
  videoHeading: string;
  order: string;
  showOnMobile: boolean;
};

const AddTutorialVideoWrapper = () => {

  const navigate = useNavigate()
  const [addTutorialVideo] = useAddTutorialVideoMutation();

  // Form Initial Values
  const initialValues: AddTutorialVideoInitialValues = {

    videoLink: "",
    videoHeading: "",
    order: "",
    showOnMobile: true,
  };

  // Form Validation Schema
  const validationSchema = object({
    videoLink: string().url("Please enter valid URL").required("Video Link is required"),
    videoHeading: string().required("Video Title is required"),
    order: number()
    .typeError("Order must be number")
    .min(1, "Order must be greater than 0")
    .required("Order is required"),
    });

  // Form Submit Handler
  const handleSubmit = (
    values: AddTutorialVideoInitialValues,
    { setSubmitting }: FormikHelpers<AddTutorialVideoInitialValues>
  ) => {
    addTutorialVideo(values)
    .then((res: any) => {
      if (res.error) {
        showToast("error", res?.error?.data?.message)
        setSubmitting(false)
      }
      else {
        showToast("success", res?.data?.message)
        navigate("/videos/tutorial-videos")
        setSubmitting(false)
      }
    })
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <Form className="h-full">
          <AddTutorialVideo
            formikProps={formikProps}
          />
        </Form>
      )}
    </Formik>
  );
};

export default AddTutorialVideoWrapper;
