import React from "react";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  setDateFilter} from "src/redux/slices/TabDistributorComissionSlice";
import { AppDispatch, RootState } from "src/redux/store";
import {object, string } from "yup";
import CommissionFilterDialog from "./CommissionFilterDialog";

type Props = {
  close: () => void;
};

export type CommissionFilterDialogValues = {
  month: string | null;
  year: string | null;
};

const CommissionFilterDialogWrapper = ({ close }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const distributorCommissionState: any = useSelector(
    (state: RootState) => state.tabDistributorCommission
  );
  const { dateFilter } = distributorCommissionState;

  // Initial Values
  const initialValues: CommissionFilterDialogValues = {
    month: dateFilter.month || ' ',
    year: dateFilter.year || ' ',
  }; 

  const validationSchema: any = object({
    month:string() ,
    year:string() 
  });


  // Submit Handler
  const handleSubmit = async (
    values: CommissionFilterDialogValues,
    { setSubmitting }: FormikHelpers<CommissionFilterDialogValues>
  ) => {
    setSubmitting(false);
    dispatch(
      setDateFilter({
        month: values.month
          ? values.month
          : "",
        year: values.year
          ? values.year
          : "",
      })
    );
    close();
  };

  // Reset Handler
  const handleReset = async (formikProps: FormikProps<CommissionFilterDialogValues>) => {
    await dispatch(
      setDateFilter({
        month: "",
        year: "",
      })
    );
    formikProps.resetForm();
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <Form>
          <CommissionFilterDialog
            formikProps={formikProps}
            onReset={() => handleReset(formikProps)}
          />
        </Form>
      )}
    </Formik>
  );
};

export default CommissionFilterDialogWrapper;
