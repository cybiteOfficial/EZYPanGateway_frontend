import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import { Form, Formik, FormikHelpers } from "formik";
import { object, string } from "yup";
import { showToast } from "src/utils/toaster/showToast";
import { useParams } from "react-router-dom";
import RetaierRewardForm from "../Layout/RetaierRewardForm";
import {
  useGetRewardEntryInLedgerQuery,
  useUpdateRewardEntryInLedgerMutation,
} from "src/services/RewardService";
import { CircularProgress } from "@mui/material";

export type RetaierRewardFormValues = {
  applicationType: string;
  rewardPoints: string;
  transactionType: string;
  remark: string;
};

type Props = {
  onClose: () => void;
  RewardId: string;
};

const EditRetailerRewardWrapper = ({ onClose, RewardId }: Props) => {
  const [rewardData, setRewardData] = useState<any>({});
  const [updateEntryInReward] = useUpdateRewardEntryInLedgerMutation();
  const { retailerId } = useParams();
  const { data, isLoading, isFetching } =
    useGetRewardEntryInLedgerQuery(RewardId);

  useEffect(() => {
    if (!isFetching && !isLoading) {
      setRewardData(data?.data);
    }
  }, [isFetching, isLoading, data]);
  // Form Initial Values
  const initialValues: RetaierRewardFormValues = {
    applicationType: rewardData?.applicationType,
    rewardPoints: rewardData?.points,
    transactionType: rewardData?.rewardTransactionType,
    remark: rewardData?.logs,
  };

  // Validation Schema
  const validationSchema = object().shape({
    applicationType: string().required("Please enter applicationType"),
    rewardPoints: string().required("Please enter amount"),
    transactionType: string().required("Please enter transactionType"),
    remark: string().required("Please enter remark"),
  });

  // Handle Submit
  const handleSubmit = (
    values: RetaierRewardFormValues,
    { setSubmitting, resetForm }: FormikHelpers<RetaierRewardFormValues>
  ) => {
    const formatedvalues = {
      ...values,
      userId: retailerId,
    };
    updateEntryInReward({
      body: formatedvalues,
      id: RewardId,
    }).then((res: any) => {
      if (res?.error) {
        showToast("error", res?.error?.data?.message);
      } else {
        if (res?.data?.status) {
          showToast("success", res?.data?.message);
          resetForm();
          onClose();
        } else {
          showToast("error", res?.data?.message);
        }
      }
      setSubmitting(false);
    });
  };

  return (
    <Dialog open maxWidth="xs" fullWidth>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formikProps) => (
          <Form>
            {(isLoading || isFetching) && (
              <div className="absolute w-[100%] h-[100%] flex justify-center items-center z-10 bg-slate-100 opacity-50">
                <CircularProgress />
              </div>
            )}
            <RetaierRewardForm
              formikProps={formikProps}
              onClose={onClose}
              formType="Edit"
            />
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default EditRetailerRewardWrapper;
