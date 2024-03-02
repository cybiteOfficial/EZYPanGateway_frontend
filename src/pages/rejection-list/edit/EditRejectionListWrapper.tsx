import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Formik, Form, FormikHelpers } from "formik";
import { object, string } from "yup";
import EditRejectionList from "./EditRejectionList";
import {
  useUpdateRejectionListMutation,
  useGetRejectionListByIdQuery,
} from "src/services/RejectionListService";
import { showToast } from "src/utils/toaster/showToast";
import { useNavigate } from "react-router-dom";
import { RejectionListResponse } from "src/models/RejectionList.model";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import ATMPageLoader from "src/components/UI/atoms/ATMPageLoader/ATMPageLoader";

export type EditRejectionListInitialValues = {
  rejectionMsg: string;
};

const EditRejectionListWrapper = () => {
  const [rejectionMessageData, setRejectionMessageData] =
    useState<RejectionListResponse | null>(null);
  const { rejectionId } = useParams();

  const navigate = useNavigate();
  const [UpdateRejectionList] = useUpdateRejectionListMutation();

  // Fetch existing data for the specified video
  const { data, isLoading, isFetching } = useGetRejectionListByIdQuery(
    rejectionId || ""
  );

  const initialValues: EditRejectionListInitialValues = {
    rejectionMsg: rejectionMessageData?.rejectionMsg || "",
  };
  useEffect(() => {
    if (!isFetching && !isLoading) {
      setRejectionMessageData(data?.data || null);
    }
  }, [isLoading, isFetching, data]);

  // Form validation schema
  const validationSchema = object({
    rejectionMsg: string().required("Rejection Message is required"),
  });

  // Form submit handler
  const handleSubmit = (
    values: EditRejectionListInitialValues,
    { setSubmitting }: FormikHelpers<EditRejectionListInitialValues>
  ) => {
    UpdateRejectionList({
      id: rejectionId,
      body: values,
    }).then((res: any) => {
      if (res.error) {
        showToast("error", res?.error?.data?.message);
        setSubmitting(false);
      } else {
        showToast("success", res?.data?.message);
        navigate("/rejection-list");
        setSubmitting(false);
      }
    });
  };

  if (isFetching || isLoading) {
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
            <EditRejectionList formikProps={formikProps} />
          </Form>
        </SideNavLayout>
      )}
    </Formik>
  );
};

export default EditRejectionListWrapper;
