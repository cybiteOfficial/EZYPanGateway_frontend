import { Formik, Form, FormikHelpers } from "formik";
import React from "react";
import { number, object } from "yup";
import EditGumastaServiceReward from "./EditGumastaServiceReward";
import {
  useGetGumastaRewardServiceQuery,
  useUpdateGumastaRewardMutation,
} from "src/services/GumastaRewardService";
import { GumastaRewardListResponse } from "src/models/GumastaServiceReward.model";
import { showToast } from "src/utils/toaster/showToast";
import ATMPageLoader from "src/components/UI/atoms/ATMPageLoader/ATMPageLoader";
export type GumastaServiceRewardInitialValues = {
  rewardForDistributor: number;
  rewardForRetailer: number;
  rewardForGuest: number;
};

const EditGumastaServiceRewardListingWrapper = () => {
  const { data, isFetching, isLoading } = useGetGumastaRewardServiceQuery("");
  //  State
  const [gumastaData, setGumastaData] =
    React.useState<GumastaRewardListResponse | null>(null);

  // UseEffect
  React.useEffect(() => {
    if (!isFetching && !isLoading) {
      setGumastaData(data?.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching, isLoading, data]);

  // Form Initial Values
  const initialValues: GumastaServiceRewardInitialValues = {
    rewardForDistributor: gumastaData?.rewardForDistributor || 0,
    rewardForRetailer: gumastaData?.rewardForRetailer || 0,
    rewardForGuest: gumastaData?.rewardForGuest || 0,
  };
  // Form Validation Schema
  const validationSchema = object({
    rewardForDistributor: number()
      .typeError("Reward Point must be a number")
      .min(0, "Reward Point must be positive")
      .required("Please enter Reward Point"),
    rewardForRetailer: number()
      .typeError("Reward Point must be a number")
      .min(0, "Reward Point must be positive")
      .required("Please enter Reward Point"),
    rewardForGuest: number()
      .typeError("Reward Point must be a number")
      .min(0, "Reward Point must be positive")
      .required("Please enter Reward Point"),
  });
  const [updateGumastaReward] = useUpdateGumastaRewardMutation();
  const handleSubmit = (
    values: GumastaServiceRewardInitialValues,
    { setSubmitting }: FormikHelpers<GumastaServiceRewardInitialValues>
  ) => {
    updateGumastaReward(values).then((res: any) => {
      if (res?.error) {
        setSubmitting(false);
        showToast("error", res?.error?.data?.message);
      } else {
        if (res?.data?.status) {
          setSubmitting(false);
          showToast("success", res?.data?.message);
        } else {
          setSubmitting(false);
          showToast("error", res?.data?.message);
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
            <EditGumastaServiceReward formikProps={formikProps} />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default EditGumastaServiceRewardListingWrapper;
