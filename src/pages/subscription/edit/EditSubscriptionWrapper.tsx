import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Formik, Form, FormikHelpers } from "formik";
import { number, object, string } from "yup";
import EditSubscription from "./EditSubscription";
import {
  useGetSubscriptionByIdQuery,
  useUpdateSubscriptionMutation,
} from "src/services/SubscriptionService";
import { showToast } from "src/utils/toaster/showToast";
import { useNavigate } from "react-router-dom";
import { SubscriptionListResponse } from "src/models/Subscription.model";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import ATMPageLoader from "src/components/UI/atoms/ATMPageLoader/ATMPageLoader";
import { SelectOption } from "src/models/FormField/FormField.model";

export type EditSubscriptionInitialValues = {
  durationIndays: number;
  durationInWords: string;
  amount: string;
  planName: string;
  description: string;
};

export type DropdownOptions = {
  subscriptionOptions: SelectOption[];
};

const subscriptionOptions = [
  {
    label: "ANNUAL",
    value: "ANNUAL",
  },
  {
    label: "LIFETIME",
    value: "LIFETIME",
  },
];

const EditSubscriptionWrapper = () => {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const [UpdateSubscription] = useUpdateSubscriptionMutation();

  // Fetch existing data for the specified video
  const { data, isLoading, isFetching } = useGetSubscriptionByIdQuery(id);
  const [subscriptionWapper, setSubscriptionWapper] =
    useState<SubscriptionListResponse | null>(null);

  const initialValues: EditSubscriptionInitialValues = {
    durationIndays: subscriptionWapper?.durationIndays || NaN,
    durationInWords: subscriptionWapper?.durationInWords || "",
    amount: subscriptionWapper?.amount || "",
    planName: subscriptionWapper?.planName || "",
    description: subscriptionWapper?.description || "",
  };
  useEffect(() => {
    if (!isFetching && !isLoading) {
      setSubscriptionWapper(data?.data);
    }
  }, [isLoading, isFetching, data]);

  // Form validation schema
  const validationSchema = object({
    durationIndays: number().typeError("Duration in days must be in number").min(1,"Duation in days must be more than 0").required("Duration in days is required"),
    amount: number().typeError("Amount must be in number").min(0,"Amount cannot be negative").required("Amount is required"),
    planName: string().required("Plan Name is required"),
    description: string().required("Description is required"),
  });

  // Form submit handler
  const handleSubmit = (
    values: EditSubscriptionInitialValues,
    { setSubmitting }: FormikHelpers<EditSubscriptionInitialValues>
  ) => { 
    const {planName, ...valuesForUpdate } = values
    UpdateSubscription({
      id: id,
      body: valuesForUpdate,
    }).then((res: any) => {
      if (res.error) {
        showToast("error", res?.error?.data?.message);
        setSubmitting(false);
      } else {
        showToast("success", res?.data?.message);
        navigate("/subscription");
        setSubmitting(false);
      }
    });
  };
  if (isFetching || isLoading) {
    return <ATMPageLoader />;
  }

  // Dropdown Option
  const dropdownOptions = {
    subscriptionOptions,
  };

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
            <EditSubscription
              formikProps={formikProps}
              dropdownOptions={dropdownOptions}
            />
          </Form>
        </SideNavLayout>
      )}
    </Formik>
  );
};

export default EditSubscriptionWrapper;
