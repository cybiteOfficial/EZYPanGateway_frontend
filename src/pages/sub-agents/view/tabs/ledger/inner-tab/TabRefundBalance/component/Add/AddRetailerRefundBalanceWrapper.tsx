import React from "react";
import Dialog from "@mui/material/Dialog";
import { Form, Formik, FormikHelpers } from "formik";
import { object, string } from "yup";
import { showToast } from "src/utils/toaster/showToast";
import { useAddRefundEntryInLedgerMutation } from "src/services/RefundBalanceService";
import { useParams } from "react-router-dom";
import RetalierRefundBalanceForm from "../Layout/RetalierRefundBalanceForm";
 
export type RetailerRefundFormValues = {
  applicationType: string;
  amountToBeUpdate: string;
  transactionType: string;
  remark: string;
};

type Props = {
  onClose: () => void;
};

const AddRetailerRefundBalanceWrapper = ({ onClose }: Props) => {
  const [addRefundEntry] = useAddRefundEntryInLedgerMutation(); 
  const {retailerId} = useParams()

  // Form Initial Values
  const initialValues: RetailerRefundFormValues = {
    applicationType: "",
    amountToBeUpdate: "",
    transactionType: "",
    remark:''
  };

  // Validation Schema
  const validationSchema = object().shape({
    applicationType: string().required("Please enter applicationType"),
    amountToBeUpdate: string().required("Please enter amount"),
    transactionType: string().required("Please enter transactionType"),
    remark: string().required("Please enter remark"),
  });

  // Handle Submit
  const handleSubmit = (
    values: RetailerRefundFormValues,
    { setSubmitting, resetForm }: FormikHelpers<RetailerRefundFormValues>
  ) => { 
  
     const formatedvalues ={
      ...values ,
      userId :retailerId
     }

    addRefundEntry(formatedvalues).then((res: any) => {
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
            <RetalierRefundBalanceForm
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

export default AddRetailerRefundBalanceWrapper;
