import { Form, Formik, FormikHelpers } from "formik";
import React from "react";
import FilterCard from "./FilterCard";

type Props = {};

export type FormInitialValues = {
  status: string;
  applicationType: string;
  category: string;
  startDate: string | null;
  endDate: string | null;
};

const FilterCardWrapper = (props: Props) => {
  // Initial Values
  const initialValues: FormInitialValues = {
    status: "",
    applicationType: "",
    category: "",
    startDate: null,
    endDate: null,
  };

  // Submit Handler
  const handleSubmit = (
    values: FormInitialValues,
    { setSubmitting }: FormikHelpers<FormInitialValues>
  ) => {
    setTimeout(() => {
      setSubmitting(false)
    }, 1000);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(formikProps) => (
        <Form>
          <FilterCard formikProps={formikProps} />
        </Form>
      )}
    </Formik>
  );
};

export default FilterCardWrapper;
