import { Formik, Form, FormikHelpers } from "formik";
import React from "react";
import EditPANServiceReward from "./EditPANServiceReward";
import { number, object } from "yup";
import { useGetPANRewardServiceQuery } from "src/services/PANRewardService";
import { PANRewardListResponse } from "src/models/PANServiceReward.model";
import ATMPageLoader from "src/components/UI/atoms/ATMPageLoader/ATMPageLoader";
import { useUpdatePANRewardMutation } from "src/services/PANRewardService";
import { showToast } from "src/utils/toaster/showToast";
export type PANServiceRewardInitialValues = {
  rewardForDistributor: number;
  rewardForRetailer: number;
  rewardForGuest: number;
};

const EditPanServiceRewardListingWrapper = () => {
  const { data, isLoading, isFetching } = useGetPANRewardServiceQuery("");
  const [rewardData, setRewardData] =
    React.useState<PANRewardListResponse | null>(null);

  React.useEffect(() => {
    if (!isFetching && !isLoading) {
      setRewardData(data?.data || null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching, isLoading, data]);

  // Form Initial Values
  const initialValues: PANServiceRewardInitialValues = {
    rewardForDistributor: rewardData?.rewardForDistributor || 0,
    rewardForRetailer: rewardData?.rewardForRetailer || 0,
    rewardForGuest: rewardData?.rewardForGuest || 0,
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
  const [updatePANReward] = useUpdatePANRewardMutation();
  const handleSubmit = (
    values: PANServiceRewardInitialValues,
    { setSubmitting }: FormikHelpers<PANServiceRewardInitialValues>
  ) => {
    updatePANReward(values).then((res: any) => {
      if (res?.error) {
        showToast("error", res?.error?.data?.message);
        setSubmitting(false);
      } else {
        if (res?.data?.status) {
          showToast("success", res?.data?.message);
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
            <EditPANServiceReward formikProps={formikProps} />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default EditPanServiceRewardListingWrapper;
