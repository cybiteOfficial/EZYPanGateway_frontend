import React from "react";
import { Formik, Form, FormikHelpers } from "formik";
import {  number, object, string } from "yup";
import AddAppVideo from "./AddAppVideo";
import { useAddAppVideoMutation } from "src/services/VideoService";
import { showToast } from "src/utils/toaster/showToast";
import { useNavigate } from "react-router-dom";

export type AddAppVideoInitialValues = {
  videoLink: string;
  order: string;
  showOnMobile: boolean;
};

const AddAppVideoWrapper = () => {

  const navigate = useNavigate()
  const [addAppVideo] = useAddAppVideoMutation();

  // Form Initial Values
  const initialValues: AddAppVideoInitialValues = {

    videoLink: "",
    order:"",
    showOnMobile: true,
  };

  // Form Validation Schema
  const validationSchema = object({
    videoLink: string().url("Please enter valid URL").required("Video Link is required"),
    order: number()
    .typeError("Order must be number")
    .min(1, "Order must be greater than 0")
    .required("Order is required"),
    });

  // Form Submit Handler
  const handleSubmit = (
    values: AddAppVideoInitialValues,
    { setSubmitting }: FormikHelpers<AddAppVideoInitialValues>
  ) => {
    addAppVideo(values) 
    .then((res: any) => {
      if (res.error) {
        showToast("error", res?.error?.data?.message)
        setSubmitting(false)
      }
      else {
        showToast("success", res?.data?.message)
        navigate("/videos/app-videos")
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
            <AddAppVideo
              formikProps={formikProps}
            />
          </Form>
      )}
    </Formik>
  );
};

export default AddAppVideoWrapper;
