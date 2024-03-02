import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/redux/store";
import {
  setDateFilter,
  setFilterBy,
} from "src/redux/slices/TabRetailerPanApplicationSlice";
import { useGetAllPanCategoriesListQuery } from "src/services/CategoryDialogServices";
import moment from "moment";
import { date, object } from "yup";
import DigitalPANFilterCard from "./DigitalPANFilterCard";

type Props = {
  close: () => void;
};

export type FormInitialValues = {
  status: string;
 
  startDate: string | null;
  endDate: string | null;
};

const DigitalPANFilterCardWrapper = ({ close }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const panApplicationState: any = useSelector(
    (state: RootState) => state.tabRetailerPanApplication
  );
  const { filterBy, dateFilter } = panApplicationState;

  const [categoryData, setCategoryData] = useState([]);
  const { data, isFetching, isLoading } = useGetAllPanCategoriesListQuery("");

  // Setting Category Options
  useEffect(() => {
    if (!isFetching && !isLoading) {
      setCategoryData(data?.data || []);
    }
  }, [isFetching, isLoading, data]);

   // Initial Values
   const initialValues: FormInitialValues = {
    status:
      filterBy?.find((filter: any) => filter.fieldName === "status")
        ?.value?.[0] || "",
    startDate: dateFilter.start_date || null,
    endDate: dateFilter.end_date || null,
  };

    // Validation Schema
    const validationSchema = object({
      startDate: date()
        .nullable()
        .max(moment(), "Date should not be after current date"),
      endDate: date()
        .nullable()
        .when("startDate", (startDate, schema) => {
          if (startDate) {
            return schema.min(startDate, "Must be after start date");
          }
        }),
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
    await dispatch(
      setFilterBy(
        filterBy?.map((filter: any) => {
          switch (filter.fieldName) {
            case "status":
              return {
                ...filter,
                value: values.status ? [values.status] : [],
              };
            default:
              return filter;
          }
        })
      )
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
    await dispatch(
      setFilterBy(
        filterBy?.map((filter: any) => {
          switch (filter.fieldName) {
            case "status":
              return {
                ...filter,
                value: [],
              };
            case "applicationType":
              return {
                ...filter,
                value: [],
              };
            case "paymentCategory":
              return {
                ...filter,
                value: [],
              };

            default:
              return filter;
          }
        })
      )
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
          <DigitalPANFilterCard
            formikProps={formikProps}
            onReset={() => handleReset(formikProps)}
            categoryData={categoryData}
          />
        </Form>
      )}
    </Formik>
  );
};

export default DigitalPANFilterCardWrapper;



