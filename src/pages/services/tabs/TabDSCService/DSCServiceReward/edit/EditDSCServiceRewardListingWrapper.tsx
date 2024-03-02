import { Formik, Form, FormikHelpers } from "formik";
import React from "react";
import { number, object } from "yup";
import EditDSCServiceReward from "./EditDSCServiceReward";
import {
  useGetDSCRewardServiceQuery,
  useUpdateDSCRewardMutation,
} from "src/services/DSCRewardService";
import { DSCRewardListResponse } from "src/models/DSCServiceReward.model";
import ATMPageLoader from "src/components/UI/atoms/ATMPageLoader/ATMPageLoader";
import { showToast } from "src/utils/toaster/showToast";
export type DSCServiceRewardInitialValues = {
  rewardForDistributor: number;
  rewardForRetailer: number;
  rewardForGuest: number;
};

const EditDSCServiceRewardListingWrapper = () => {
  const { data, isLoading, isFetching } = useGetDSCRewardServiceQuery("");

  // Setting Data in state
  const [dscData, setDscData] = React.useState<DSCRewardListResponse | null>(
    null
  );

  // Setting data
  React.useEffect(() => {
    if (!isFetching && !isLoading) {
      setDscData(data?.data || null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching, isLoading, data]);
  // Form Initial Values
  const initialValues: DSCServiceRewardInitialValues = {
    rewardForDistributor: dscData?.rewardForDistributor || 0,
    rewardForRetailer: dscData?.rewardForRetailer || 0,
    rewardForGuest: dscData?.rewardForGuest || 0,
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
  // Mutation
  const [updateDSCReward] = useUpdateDSCRewardMutation();
  const handleSubmit = (
    values: DSCServiceRewardInitialValues,
    { setSubmitting }: FormikHelpers<DSCServiceRewardInitialValues>
  ) => {
    updateDSCReward(values).then((res: any) => {
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
            <EditDSCServiceReward formikProps={formikProps} />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default EditDSCServiceRewardListingWrapper;
