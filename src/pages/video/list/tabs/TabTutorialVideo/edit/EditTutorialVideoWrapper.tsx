import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { Formik, Form, FormikHelpers } from "formik";
import { number, object, string } from "yup";
import EditTutorialVideo from "./EditTutorialVideo";
import { useUpdateTutorialVideoMutation, useGetTutorialVidoeByIdQuery } from 'src/services/TutorialVideoService';
import { showToast } from "src/utils/toaster/showToast";
import { useNavigate } from "react-router-dom";
import {  TutorialVideoListResponse } from 'src/models/TutorialVideo.model';
import ATMPageLoader from 'src/components/UI/atoms/ATMPageLoader/ATMPageLoader';

export type EditTutorialVideoInitialValues = {
  videoHeading: string,
  videoLink: string,
  order: string,
  showOnMobile: boolean;

};

const EditTutorialVideoWrapper = () => {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const [updateTutorialVideo] = useUpdateTutorialVideoMutation();
  // Fetch existing data for the specified video
  const { data, isLoading, isFetching } = useGetTutorialVidoeByIdQuery(id);

  const [tutorialVideoWrapper, setTutorialVideoWrapper] =
  useState<TutorialVideoListResponse | null>(null);

  const intialValues: EditTutorialVideoInitialValues = {
    videoLink: tutorialVideoWrapper?.videoLink || "",
    videoHeading: tutorialVideoWrapper?.videoHeading || "",
    order: tutorialVideoWrapper?.order || "",
    showOnMobile:  tutorialVideoWrapper?.showOnMobile || false,
  };
  
  useEffect(() => {
    if (!isFetching && !isLoading) {
      setTutorialVideoWrapper(data?.data);
    }
  }, [isLoading, isFetching, data]);


  // Form validation schema
  const validationSchema = object({
    videoLink: string().url("Please enter valid URL").required("Video Link is required"),
    order: number().min(0, "Price must be positive")
    .typeError("Price Must be a number")
    .required("Price is required"),
    videoHeading : string().required('Video Heading is required'),

  });

  // Form submit handler
  const handleSubmit = (
    values: EditTutorialVideoInitialValues,
    { setSubmitting }: FormikHelpers<EditTutorialVideoInitialValues>,
  ) => {
    updateTutorialVideo({
      id: id,
      body: values,
    }).then((res: any) => {
      if (res.error) {
        showToast("error", res?.error?.data?.message);
        setSubmitting(false);
      } else {
        showToast("success", res?.data?.message);
        navigate("/videos/tutorial-videos");
        setSubmitting(false);
      }
    });
  };
  if (isFetching || isLoading) {
    return <ATMPageLoader />;
  }
  return (
    <Formik enableReinitialize initialValues={intialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {(formikProps) => (
        <Form className="h-full">
          <EditTutorialVideo formikProps={formikProps} />
        </Form>
      )}
    </Formik>
  );
};

export default EditTutorialVideoWrapper;
