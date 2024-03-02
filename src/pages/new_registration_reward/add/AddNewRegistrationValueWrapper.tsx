import React, { useEffect, useState } from "react";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import { Formik, Form, FormikHelpers } from "formik";
import { number, object } from "yup";
import AddNewRegistrationValue from "./AddNewRegistrationValue";
import { SingleNewRegistrationRewardResponse } from "src/models/NewRegistartionReward.model";
import { showToast } from "src/utils/toaster/showToast";
import { useUpdateNewRegistrationRewardServiceMutation } from "src/services/NewRegistrationRewardService";
import { useGetAllNewRegistrationRewardServiceQuery } from "src/services/NewRegistrationRewardService";
import ATMPageLoader from "src/components/UI/atoms/ATMPageLoader/ATMPageLoader";

export type NewRegistrationRewardInitialValues = {
  retailerRegisterRewardPoint: number;
};

const AddNewRegistrationValueWrapper = () => {
  const [rewardPoinValueData, setRewardPointValue] =
    useState<SingleNewRegistrationRewardResponse | null>(null);

  // Calling Data
  const { data, isLoading, isFetching } =
    useGetAllNewRegistrationRewardServiceQuery("");
  // Update Mutation
  const [updateNewRegistrationReward] =
    useUpdateNewRegistrationRewardServiceMutation();
  // Setting data into State
  useEffect(() => {
    if (!isLoading || !isFetching) {
      setRewardPointValue(data?.data?.[0] || null);
    }
  }, [data, isFetching, isLoading]);
  // Form Initial Values
  const initialValues: NewRegistrationRewardInitialValues = {
    retailerRegisterRewardPoint:
      rewardPoinValueData?.retailerRegisterRewardPoint || 0,
  };

  // Form Validation Schema
  const validationSchema = object({
    retailerRegisterRewardPoint: number().required(
      "Retailer Register Reward Value is required"
    ),
  });
  // setting values

  // Form Submit Handler
  const handleSubmit = (
    values: NewRegistrationRewardInitialValues,
    { setSubmitting }: FormikHelpers<NewRegistrationRewardInitialValues>
  ) => {
    updateNewRegistrationReward({
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
          <SideNavLayout>
            <Form className="h-full">
              <AddNewRegistrationValue formikProps={formikProps} />
            </Form>
          </SideNavLayout>
        )}
      </Formik>
    </>
  );
};

export default AddNewRegistrationValueWrapper;
