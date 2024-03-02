import React, { useEffect, useState } from "react";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  setDateFilter,
  setFilterBy,
} from "src/redux/slices/TabFailedPaymentITRSlice";
import { AppDispatch, RootState } from "src/redux/store";
import ITRFailedApplicationFilterCard from "./ITRFailedApplicationFilterCard";
import { date, object } from "yup";
import { useGetAllITRCategoriesListQuery } from "src/services/CategoryDialogServices";

type Props = {
  close: () => void;
};

export type FormInitialValues = {
  paymentCategory: string;
  startDate: string | null;
  endDate: string | null;
  appliedByNumber: string;
  distributorCode: string;
};

const ITRFailedApplicationFilterCardWrapper = ({ close }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const itrApplicationState = useSelector(
    (state: RootState) => state.TabFailedPaymentITR
  );
  const { filterBy, dateFilter } = itrApplicationState;

  const [categoryData, setCategoryData] = useState([]);
  const { data, isFetching, isLoading } = useGetAllITRCategoriesListQuery("");

  // Setting Category Options
  useEffect(() => {
    if (!isFetching && !isLoading) {
      setCategoryData(data?.data || []);
    }
  }, [isFetching, isLoading, data]);

  // Initial Values
  const initialValues: FormInitialValues = {
    paymentCategory:
      filterBy?.find((filter: any) => filter.fieldName === "paymentCategory")
        ?.value?.[0] || "",
    startDate: dateFilter.start_date || null,
    endDate: dateFilter.end_date || null,
    appliedByNumber: filterBy?.find((filter: any) => filter.fieldName === "appliedByNumber")
    ?.value?.[0] || "",
    distributorCode: filterBy?.find((filter: any) => filter.fieldName === "distributorCode")
    ?.value?.[0] || "",
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
            case "paymentCategory":
              return {
                ...filter,
                value: values.paymentCategory ? [values.paymentCategory] : [],
              };
              case "distributorCode":
                return {
                  ...filter,
                  value: values.distributorCode ? [values.distributorCode] : [],
                };
                case "appliedByNumber":
                  return {
                    ...filter,
                    value: values.appliedByNumber ? [values.appliedByNumber] : [],
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
        done_date_from: "",
        done_date_to: "",
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
            case "paymentCategory":
              return {
                ...filter,
                value: [],
              };
              case "distributorCode":
                return {
                  ...filter,
                  value: [],
                };
                case "appliedByNumber":
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
          <ITRFailedApplicationFilterCard
            formikProps={formikProps}
            onReset={() => handleReset(formikProps)}
            categoryData={categoryData}
          />
        </Form>
      )}
    </Formik>
  );
};

export default ITRFailedApplicationFilterCardWrapper;
