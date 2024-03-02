import React, { useEffect, useState } from "react";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  setDateFilter,
  setFilterBy,
} from "src/redux/slices/TabHistoryPanApplicationSlice";
import { AppDispatch, RootState } from "src/redux/store";
import { useGetAllPanCategoriesListQuery } from "src/services/CategoryDialogServices";
import { date, object } from "yup";
import FilterCard from "./FilterCard";

type Props = {
  close: () => void;
};

export type FormInitialValues = {
  status: string;
  applicationType: string;
  paymentCategory: string;
  startDate: string | null;
  endDate: string | null;
  doneDateFrom: string | null;
  doneDateTo: string | null;
  appliedByNumber: string;
  distributorCode: string;
};

const FilterCardWrapper = ({ close }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const panApplicationState: any = useSelector(
    (state: RootState) => state.tabHistoryPanApplication
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
    applicationType:
      filterBy?.find((filter: any) => filter.fieldName === "applicationType")
        ?.value?.[0] || "",
    paymentCategory:
      filterBy?.find((filter: any) => filter.fieldName === "paymentCategory")
        ?.value?.[0] || "",
    startDate: dateFilter.start_date || null,
    endDate: dateFilter.end_date || null,
    doneDateFrom: dateFilter.done_date_from || null,
    doneDateTo: dateFilter.done_date_to || null,
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
    doneDateFrom: date()
      .nullable()
      .max(moment(), "Date should not be after current date"),
    doneDateTo: date()
      .nullable()
      .when("doneDateFrom", (doneDateFrom, schema) => {
        if (doneDateFrom) {
          return schema.min(doneDateFrom, "Must be after start date");
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
        done_date_from: values.doneDateFrom
          ? moment(values.doneDateFrom)?.format("yyyy-MM-DD")
          : "",
        done_date_to: values.doneDateTo
          ? moment(values.doneDateTo)?.format("yyyy-MM-DD")
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
            case "applicationType":
              return {
                ...filter,
                value: values.applicationType ? [values.applicationType] : [],
              };
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
          <FilterCard
            formikProps={formikProps}
            onReset={() => handleReset(formikProps)}
            categoryData={categoryData}
          />
        </Form>
      )}
    </Formik>
  );
};

export default FilterCardWrapper;
