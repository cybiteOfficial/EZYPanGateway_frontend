import React from "react";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  setDateFilter} from "src/redux/slices/RewardSlice";
import { AppDispatch, RootState } from "src/redux/store";
import {object, string } from "yup";
import FilterCard from "./FilterCard";
import moment from "moment";

type Props = {
  close: () => void;
};

export type FormInitialValues = {
  startDate: string | null;
  endDate: string | null;
};

const FilterCardWrapper = ({ close }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const loanEnquiryState: any = useSelector(
    (state: RootState) => state.reward
  );
  const { dateFilter } = loanEnquiryState;

  // Initial Values
  const initialValues: FormInitialValues = {
    startDate: dateFilter.start_date || null,
    endDate: dateFilter.end_date || null,
  }; 

  const validationSchema: any = object({
    startDate:string() ,
    endDate:string() 
  });


  // Submit Handler
  const handleSubmit = async (
    values: FormInitialValues,
    { setSubmitting }: FormikHelpers<FormInitialValues>
  ) => {
    setSubmitting(false);
    dispatch(
      setDateFilter({
        start_date: values.startDate
        ? moment(values.startDate)?.format("yyyy-MM-DD")
        : "",
      end_date: values.endDate
        ? moment(values.endDate)?.format("yyyy-MM-DD")
        : "",
      })
    );
    close();
  };

  // Reset Handler
  const handleReset = async (formikProps: FormikProps<FormInitialValues>) => {
    await dispatch(
      setDateFilter({
        start_date: "",
        end_date: "",
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
