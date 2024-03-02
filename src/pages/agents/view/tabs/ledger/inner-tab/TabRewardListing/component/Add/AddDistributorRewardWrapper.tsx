import React from "react";
import Dialog from "@mui/material/Dialog";
import { Form, Formik, FormikHelpers } from "formik";
import { object, string } from "yup";
import DistributorRewardForm from "../Layout/DistributorRewardForm";
import { showToast } from "src/utils/toaster/showToast";
import { useParams } from "react-router-dom";
import { useAddRewardEntryInLedgerMutation } from "src/services/RewardService";
 
export type  DistributorRewadFormValues = {
  applicationType: string;
  rewardPoints: string;
  transactionType: string;
  remark: string;
};

type Props = {
  onClose: () => void;
};

const AddDistributorRewardWrapper = ({ onClose }: Props) => {
  const [addRewardEntry] = useAddRewardEntryInLedgerMutation(); 
  const {distributorId} = useParams() 
  
  // Form Initial Values
  const initialValues: DistributorRewadFormValues = {
    applicationType: "",
    rewardPoints: "",
    transactionType: "",
    remark:''
  };

  // Validation Schema
  const validationSchema = object().shape({
    applicationType: string().required("Please enter applicationType"),
    rewardPoints: string().required("Please enter point"),
    transactionType: string().required("Please enter transactionType"),
    remark: string().required("Please enter remark"),
  });

  // Handle Submit
  const handleSubmit = (
    values: DistributorRewadFormValues,
    { setSubmitting, resetForm }: FormikHelpers<DistributorRewadFormValues>
  ) => { 
  
     const formatedvalues ={
      ...values ,
      userId :distributorId
     }

    addRewardEntry(formatedvalues).then((res: any) => {
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
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formikProps) => (
          <Form>
            <DistributorRewardForm
              formikProps={formikProps}
              onClose={onClose}
              formType="Add"
            />
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default AddDistributorRewardWrapper;
