import { Formik, Form, FormikHelpers } from "formik";
import React from "react";
import { number, object } from "yup";
import EditITRServiceReward from "./EditITRServiceReward";
import {
  useGetITRRewardServiceQuery,
  useUpdateITRRewardMutation,
} from "src/services/ITRRewardService";
import { ITRRewardListResponse } from "src/models/ITRServiceReward.model";
import { showToast } from "src/utils/toaster/showToast";
import ATMPageLoader from "src/components/UI/atoms/ATMPageLoader/ATMPageLoader";
export type ITRServiceRewardInitialValues = {
  rewardForDistributor: number;
  rewardForRetailer: number;
  rewardForGuest: number;
};

const EditITRServiceListingWrapper = () => {
  const { data, isFetching, isLoading } = useGetITRRewardServiceQuery("");
  const [itrData, setItrData] = React.useState<ITRRewardListResponse | null>(
    null
  );

  // setting data in state
  React.useEffect(() => {
    if (!isFetching && !isLoading) {
      setItrData(data?.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching, isLoading, data]);

  // Form Initial Values
  const initialValues: ITRServiceRewardInitialValues = {
    rewardForDistributor: itrData?.rewardForDistributor || 0,
    rewardForRetailer: itrData?.rewardForRetailer || 0,
    rewardForGuest: itrData?.rewardForGuest || 0,
  };
  // Form Validation Schema
  const validationSchema = object({
    rewardForDistributor: number().typeError("Reward Point must be a number")
    .min(0, "Reward Point must be positive")
    .required("Please enter Reward Point"),
  rewardForRetailer: number().typeError("Reward Point must be a number")
    .min(0, "Reward Point must be positive")
    .required("Please enter Reward Point"),
  rewardForGuest: number().typeError("Reward Point must be a number")
    .min(0, "Reward Point must be positive")
    .required("Please enter Reward Point"),
  });
  const [updateITRReward] = useUpdateITRRewardMutation();
  const handleSubmit = (
    values: ITRServiceRewardInitialValues,
    { setSubmitting }: FormikHelpers<ITRServiceRewardInitialValues>
  ) => {
    updateITRReward(values).then((res: any) => {
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
            <EditITRServiceReward formikProps={formikProps} />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default EditITRServiceListingWrapper;
