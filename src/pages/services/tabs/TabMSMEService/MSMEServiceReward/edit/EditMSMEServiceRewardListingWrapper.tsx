import { Formik, Form, FormikHelpers } from "formik";
import React from "react";
import { number, object } from "yup";
import EditMSMEServiceReward from "./EditMSMEServiceReward";
import { useGetMSMERewardServiceQuery, useUpdateMSMERewardMutation } from "src/services/MSMERewardService";
import { MSMERewardListResponse } from "src/models/MSMEServiceReward.model";
import { showToast } from "src/utils/toaster/showToast";
import ATMPageLoader from "src/components/UI/atoms/ATMPageLoader/ATMPageLoader";
export type MSMEServiceRewardInitialValues = {
  rewardForDistributor: number;
  rewardForRetailer: number;
  rewardForGuest: number;
};

const EditMSMEServiceRewardListingWrapper = () => {
  const { data, isLoading, isFetching } = useGetMSMERewardServiceQuery("");

  // State
  const [msmeData, setMsmeData] = React.useState<MSMERewardListResponse | null>(
    null
  );
  // Setting Data

  React.useEffect(() => {
    if (!isFetching && !isLoading) {
      setMsmeData(data?.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isFetching, isLoading]);
  // Form Initial Values
  const initialValues: MSMEServiceRewardInitialValues = {
    rewardForDistributor: msmeData?.rewardForDistributor || 0,
    rewardForRetailer: msmeData?.rewardForRetailer || 0,
    rewardForGuest: msmeData?.rewardForGuest || 0,
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
  const [updateMSMEReward]=useUpdateMSMERewardMutation()
  const handleSubmit = (values: MSMEServiceRewardInitialValues,{setSubmitting} :FormikHelpers<MSMEServiceRewardInitialValues>) => {
    updateMSMEReward(values).then((res: any) => {
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
            <EditMSMEServiceReward formikProps={formikProps} />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default EditMSMEServiceRewardListingWrapper;
