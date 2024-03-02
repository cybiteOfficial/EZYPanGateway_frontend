import { Form, Formik, FormikHelpers } from "formik";
import React, { useState, useEffect } from "react";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import { DownLoadFormListResponse } from "src/models/DownLoadForm.model";
import {
  useGetSingleFormQuery,
  useUpdateFormMutation,
} from "src/services/DownloadFormService";
import { useNavigate, useParams } from "react-router-dom";
import { DownloadFormInitialValues } from "../add/AddDownLoadFormWrapper";
import { showToast } from "src/utils/toaster/showToast";
import { object, string } from "yup";
import ATMPageLoader from "src/components/UI/atoms/ATMPageLoader/ATMPageLoader";
import EditDownLoadForm from "./EditDownLoadForm";

const validationSchema = object({
  fileUrl: string().required("URL is required"),
  fileTitle: string().required("File Title is required"),
  description: string().required("Description is required"),
});
const EditDownLoadFormWrapper = () => {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const [updateForm] = useUpdateFormMutation();
  const { data, isLoading, isFetching } = useGetSingleFormQuery(id);
  const [downloadForm, setDownloadForm] =
    useState<DownLoadFormListResponse | null>(null);
  // Form Initial Values
  useEffect(() => {
    if (!isFetching && !isLoading) {
      setDownloadForm(data?.data);
    }
  }, [isLoading, isFetching, data]);

  const intialValues: DownloadFormInitialValues = {
    fileTitle: downloadForm?.fileTitle || "",
    fileUrl: downloadForm?.fileUrl || "",
    description: downloadForm?.description || "",
  };

  const handleSubmit = (
    values: DownloadFormInitialValues,
    { setSubmitting }: FormikHelpers<DownloadFormInitialValues>
  ) => {
    updateForm({
      id: id,
      body: values,
    }).then((res: any) => {
      if (res.error) {
        showToast("error", res.error.data.message);
        setSubmitting(false);
      } else {
        setSubmitting(false);
        showToast("success", res.data.message);
        navigate("/download-form");
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
            <EditDownLoadForm formikProps={formikProps} />
          </Form>
        </SideNavLayout>
      )}
    </Formik>
  );
};

export default EditDownLoadFormWrapper;
