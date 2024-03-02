import React from "react";
import { Form, Formik, FormikProps } from "formik";
import { setDateFilter } from "src/redux/slices/Report/DistributorReportSlice";
import FilterCard from "./FilterCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/redux/store";
import moment from "moment";

type Props = {
  onClose: () => void;
};

export type FormInitialValues = {
  startDate: string | null;
  endDate: string | null;
};

const FilterCardWrapper = ({ onClose }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { dateFilter } = useSelector(
    (state: RootState) => state.distributorReport
  );

  // Initial Values
  const initialValues: FormInitialValues = {
    startDate: dateFilter.start_date || null,
    endDate: dateFilter.end_date || null,
  };

  // Submit Handler
  const handleSubmit = (values: FormInitialValues) => {
    dispatch(
      setDateFilter({
        start_date: values.startDate
          ? moment(values.startDate).format("yyyy-MM-DD")
          : "",
        end_date: values.endDate
          ? moment(values.endDate).format("yyyy-MM-DD")
          : "",
      })
    );
    onClose();
  };

  // Reset Handler
  const handleReset = (formikProps: FormikProps<FormInitialValues>) => {
    formikProps.resetForm();
    dispatch(
      setDateFilter({
        start_date: "",
        end_date: "",
      })
    );
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
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
