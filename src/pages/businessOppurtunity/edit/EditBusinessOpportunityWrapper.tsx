import React, { useState, useEffect } from "react";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import { Formik, Form, FormikHelpers } from "formik";
import { object, string } from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { showToast } from "src/utils/toaster/showToast";
import EditBusinessOpportunity from "./EditBusinessOpportunity";
import { BusinessOpportunityListResponse } from "src/models/BusinessOpportunity.model";
import ATMPageLoader from "src/components/UI/atoms/ATMPageLoader/ATMPageLoader";
import {
  useGetBusinessOpportunityByIdQuery,
  useUpdateBusinessOpportunityMutation,
} from "src/services/BusinessOpportunityService";

export type AoCodeInitialValues = {
  commission: string;
  retailerReward: string;
  serviceName: string;
};

const EditBusinessOpportunityWrapper = () => {
  const { id = "" } = useParams();

  const navigate = useNavigate();
  const [updateAOCode] = useUpdateBusinessOpportunityMutation();
  const { data, isLoading, isFetching } =
    useGetBusinessOpportunityByIdQuery(id);
  const [aoCode, setAoCode] = useState<BusinessOpportunityListResponse | null>(
    null
  );

  const initialValues: AoCodeInitialValues = {
    commission: aoCode?.commission || "",
    retailerReward: aoCode?.retailerReward || "",
    serviceName: aoCode?.serviceName || "",
  };
  // Form Initial Values
  useEffect(() => {
    if (!isFetching && !isLoading) {
      setAoCode(data?.data);
    }
  }, [isLoading, isFetching, data]);

  // Form Validation Schema
  const validationSchema = object({
    commission: string().required("Commission is required"),
    retailerReward: string().required("Retailer Reward is required"),
  });

  // Form Submit Handler
  const handleSubmit = (
    values: AoCodeInitialValues,
    { setSubmitting }: FormikHelpers<AoCodeInitialValues>
  ) => {
    updateAOCode({
      id: id,
      body: values,
    })
      .then((res: any) => {
        if (res.error) {
          showToast("error", res.error.data.message);
          setSubmitting(false);
        } else {
          showToast("success", res?.data?.message);
          navigate("/business-opportunity");
          setSubmitting(false);
        }
      })
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
          <Form className="h-full" noValidate>
            <EditBusinessOpportunity formikProps={formikProps} />
          </Form>
        </SideNavLayout>
      )}
    </Formik>
  );
};

export default EditBusinessOpportunityWrapper;
