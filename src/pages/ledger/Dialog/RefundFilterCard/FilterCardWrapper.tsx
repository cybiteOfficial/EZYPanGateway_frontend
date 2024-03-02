import React from "react";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  setDateFilter} from "src/redux/slices/RefundBalanceSlice";
import { AppDispatch, RootState } from "src/redux/store";
import {object, string } from "yup";
import FilterCard from "./FilterCard";

type Props = {
  close: () => void;
};

export type FormInitialValues = {
  month: string | null;
  year: string | null;
};

const FilterCardWrapper = ({ close }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const loanEnquiryState: any = useSelector(
    (state: RootState) => state.refundBalance
  );
  const { dateFilter } = loanEnquiryState;

  // Initial Values
  const initialValues: FormInitialValues = {
    month: dateFilter.month || '',
    year: dateFilter.year || '',
  }; 

  const validationSchema: any = object({
    month:string() ,
    year:string() 
  });


  // Submit Handler
  const handleSubmit = async (
    values: FormInitialValues,
    { setSubmitting }: FormikHelpers<FormInitialValues>
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
  const handleReset = async (formikProps: FormikProps<FormInitialValues>) => {
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
          <FilterCard
            formikProps={formikProps}
            onReset={() => handleReset(formikProps)}
          />
        </Form>
      )}
    </Formik>
  );
};

export default FilterCardWrapper;
