import React, { useEffect, useState } from "react";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import { Formik, Form, FormikHelpers } from "formik";
import { number, object } from "yup";
import AddRewardPointValue from "./AddRewardPointValue";
import {
  useGetAllRewardPointValueQuery,
  useUpdateRewardPointValueMutation,
} from "src/services/RewardPointValueService";
import { SingleRewardPointValueResponse } from "src/models/RewardPointValue.model";
import { showToast } from "src/utils/toaster/showToast";

export type RewardPointInitialValues = {
  perRupeeRewardValue: number;
};


const AddRewardPointValueWrapper = () => {
  const [rewardPoinValueData, setRewardPointValue] =
    useState<SingleRewardPointValueResponse | null>(null);
 
  // Calling Data
  const { data, isLoading, isFetching } = useGetAllRewardPointValueQuery("");
  // Update Mutation
  const [updateRewardPointValue] = useUpdateRewardPointValueMutation();
  // Setting data into State
  useEffect(() => {
    if (!isLoading || !isFetching) {
      setRewardPointValue(data?.data?.[0] || null);
    }
  }, [data, isFetching, isLoading]);
  // Form Initial Values
  const initialValues: RewardPointInitialValues = {
    perRupeeRewardValue: rewardPoinValueData?.perRupeeRewardValue || 0,
  };

  // Form Validation Schema
  const validationSchema = object({
    perRupeeRewardValue: number().min(0,"Reward Point must be positive").required("Reward Point Value is required"),
  });
  // setting values

  // Form Submit Handler
  const handleSubmit = (
    values: RewardPointInitialValues,
    { setSubmitting }: FormikHelpers<RewardPointInitialValues>
  ) => {
    updateRewardPointValue({
      body: values,
      id: rewardPoinValueData?._id || "",
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

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formikProps) => (
          <SideNavLayout>
            <Form className="h-full">
              <AddRewardPointValue formikProps={formikProps} />
            </Form>
          </SideNavLayout>
        )}
      </Formik>
    </>
  );
};

export default AddRewardPointValueWrapper;
