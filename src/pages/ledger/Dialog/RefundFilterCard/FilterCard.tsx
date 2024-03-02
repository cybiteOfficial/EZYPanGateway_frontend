import React from "react";
import { FormikProps } from "formik";
import { FormInitialValues } from "./FilterCardWrapper";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import ATMSelect from "src/components/UI/atoms/formFields/ATMSelect/ATMSelect";

const monthList = [
  {
    label: "January",
    value: "01",
  },
  {
    label: "February",
    value: "02",
  },
  {
    label: "March",
    value: "03",
  },
  {
    label: "April",
    value: "04",
  },
  {
    label: "May",
    value: "05",
  },
  {
    label: "June",
    value: "06",
  },
  {
    label: "July",
    value: "07",
  },
  {
    label: "August",
    value: "08",
  },
  {
    label: "September",
    value: "09",
  },
  {
    label: "October",
    value: "10",
  },
  {
    label: "November",
    value: "11",
  },
  {
    label: "December",
    value: "12",
  },
];

type Props = {
  formikProps: FormikProps<FormInitialValues>;
  onReset: () => void;
};

const FilterCard = ({ formikProps, onReset }: Props) => {
  const { values, setFieldValue, isSubmitting } = formikProps;

  const yearList = () => {
    let yearArray = [];
    let year = new Date().getFullYear();
    for (let i = 2019; i <= year; i++) {
      yearArray.unshift({ label: i, value: i });
    }
    return yearArray;
  };
  const arrOfYear = yearList();

  return (
    <div className="flex flex-col gap-3 w-[380px]">
      <div className="flex justify-between">
        <div className="text-primary-main font-medium text-[18px] ">
          Filters
        </div>
        <button
          type="button"
          className="text-sm text-secondary-main font-medium"
          onClick={onReset} // Call onReset when reset button is clicked
        >
          Reset Filters
        </button>
      </div>

      <div className="gap-2">
        <ATMSelect
          label="Month"
          options={monthList}
          name="month"
          value={values.month}
          onChange={(event) => {
            setFieldValue("month", event.target.value);
          }}
        />
        <ATMSelect
          label="Year"
          options={arrOfYear}
          name="year"
          value={values.year}
          onChange={(event) => {
            setFieldValue("year", event.target.value);
          }}
        />
      </div>

      <div className="mt-6">
        <ATMLoadingButton
          type="submit"
          isLoading={isSubmitting}
          className="bg-primary-main "
        >
          Apply
        </ATMLoadingButton>
      </div>
    </div>
  );
};

export default FilterCard;
