import React, { useEffect, useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { number, object } from "yup";
import AddDscCommissionValue from "./AddDscCommissionValue";
import { SingleDscCommissionResponse } from "src/models/DSCCommission.model";
import { showToast } from "src/utils/toaster/showToast";
import {
   useGetServiceCommissionViewQuery,  useUpdateServiceCommissionMutation,
} from "src/services/CommissionService";
import ATMPageLoader from "src/components/UI/atoms/ATMPageLoader/ATMPageLoader";

export type DscCommissionInitialValues = {
  commissionForDistributor: number;
};

const AddDscCommissionValueWrapper = () => {
  const [commissionData, setCommissionData] =
    useState<SingleDscCommissionResponse | null>(null);

  // Calling Data
  const { data, isLoading, isFetching } = useGetServiceCommissionViewQuery("DSC");
  // Update Mutation
  const [updateCommissionDsc] = useUpdateServiceCommissionMutation();
  // Setting data into State
  useEffect(() => {
    if (!isLoading || !isFetching) {
      setCommissionData(data?.data || null);
    }
  }, [data, isFetching, isLoading]);
  // Form Initial Values
  const initialValues: DscCommissionInitialValues = {
    commissionForDistributor: commissionData?.commissionForDistributor || 0,
  };

  // Form Validation Schema
  const validationSchema = object({
    commissionForDistributor: number().min(0, "Commission must be positive").required("Commission is required"),
  });
  // setting values

  // Form Submit Handler
  const handleSubmit = (
    values: DscCommissionInitialValues,
    { setSubmitting }: FormikHelpers<DscCommissionInitialValues>
  ) => {
    updateCommissionDsc({
      body: values,
      commissionName: commissionData?.commissionName || "DSC",
      // commissionData?.applicat ||
    }).then((res: any) => {
      if (res.error) {
        showToast("error", res.error.data.message);
        setSubmitting(false);
      } else {
        if (res.data?.status) {
          showToast("success", res.data.message);
          setSubmitting(false);
        } else {
          showToast("error", res?.data?.message);
          setSubmitting(false);
        }
      }
    });
  };

  if (isFetching || isLoading) {
    return <ATMPageLoader />;
  }

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formikProps) => (
          <Form className="h-full">
            <AddDscCommissionValue formikProps={formikProps} />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddDscCommissionValueWrapper;
