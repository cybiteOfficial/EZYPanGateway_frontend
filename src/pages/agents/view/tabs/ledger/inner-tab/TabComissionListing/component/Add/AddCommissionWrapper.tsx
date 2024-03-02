import React from "react";
import Dialog from "@mui/material/Dialog";
import { Form, Formik, FormikHelpers } from "formik";
import { object, string } from "yup";
import { showToast } from "src/utils/toaster/showToast";
import { useParams } from "react-router-dom";
import CommissionForm from "../Layout/CommissionForm";
import { useAddCommissionEntryInLedgerMutation } from "src/services/CommissionService";
 
export type CommissionFormValues = {
  applicationType: string;
  amount: string;
  transactionType: string;
  remark: string;
};

type Props = {
  onClose: () => void;
};

const AddCommissionWrapper = ({ onClose }: Props) => {
  const [addCommissionEntry] = useAddCommissionEntryInLedgerMutation(); 
  const {distributorId} = useParams()

  // Form Initial Values
  const initialValues: CommissionFormValues = {
    applicationType: "",
    amount: "",
    transactionType: "",
    remark:''
  };

  // Validation Schema
  const validationSchema = object().shape({
    applicationType: string().required("Please enter applicationType"),
    amount: string().required("Please enter amount"),
    transactionType: string().required("Please enter transactionType"),
    remark: string().required("Please enter remark"),
  });

  // Handle Submit
  const handleSubmit = (
    values: CommissionFormValues,
    { setSubmitting, resetForm }: FormikHelpers<CommissionFormValues>
  ) => { 
  
     const formatedvalues ={
      ...values ,
      userId :distributorId
     }

    addCommissionEntry(formatedvalues).then((res: any) => {
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
            <CommissionForm
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

export default AddCommissionWrapper;
