import React, {useState, useEffect}from 'react'
import { useParams } from "react-router-dom";
import { Formik, Form, FormikHelpers } from "formik";
import { number, object, string } from "yup";
import EditAppVideo from "./EditAppVideo";
import { useUpdateAppVideoMutation, useGetAppVidoeByIdQuery } from 'src/services/VideoService';
import { showToast } from "src/utils/toaster/showToast";
import { useNavigate } from "react-router-dom";
import {  AppVideoListResponse } from 'src/models/AppVideo.model';
import ATMPageLoader from 'src/components/UI/atoms/ATMPageLoader/ATMPageLoader';

export type EditAppVideoInitialValues = {
  videoLink: string;
  order: string;
  showOnMobile: boolean;
};

const EditAppVideoWrapper = () => {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const [updateAppVideo] = useUpdateAppVideoMutation();

  // Fetch existing data for the specified video
  const { data, isLoading, isFetching } = useGetAppVidoeByIdQuery(id);
  const [appVideoWrapper, setAppVideoWrapper] =
  useState<AppVideoListResponse | null>(null);
  // Set initial values based on the fetched data
  useEffect(() => {
    if (!isFetching && !isLoading) {
      setAppVideoWrapper(data?.data);
    }
  }, [isLoading, isFetching, data]);
  const initialValues: EditAppVideoInitialValues = {
    videoLink: appVideoWrapper?.videoLink || "",
    order: appVideoWrapper?.order || "",
    showOnMobile:  appVideoWrapper?.showOnMobile || false ,
  }; 

  // Form validation schema
  const validationSchema = object({
    videoLink: string().url("Please enter valid URL").required("Video Link is required"),
    order: number().min(0, "Price must be positive")
    .typeError("Price Must be a number")
    .required("Price is required"),
  });

  // Form submit handler
  const handleSubmit = (
    values: EditAppVideoInitialValues,
    { setSubmitting }: FormikHelpers<EditAppVideoInitialValues>,
  ) => {
    updateAppVideo({
      id: id,
      body: values,
    })
    .then((res: any) => {
      if (res.error) {
        showToast("error", res?.error?.data?.message);
        setSubmitting(false);
      } else {
        showToast("success", res?.data?.message);
        navigate("/videos/app-videos");
        setSubmitting(false);
      }
    });
  };
  if (isFetching || isLoading) {
    return <ATMPageLoader />;
  }
  return (
    <Formik enableReinitialize initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {(formikProps) => (
        <Form className="h-full">
          <EditAppVideo formikProps={formikProps} />
        </Form>
      )}
    </Formik>
  );
};

export default EditAppVideoWrapper;