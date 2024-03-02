import React from "react";
import { FormikProps } from "formik";
import ATMDatePicker from "src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker";
import { FormInitialValues } from "./FilterCardWrapper";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import moment from "moment";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
  onReset: () => void;
};


const FilterCard = ({ formikProps, onReset }: Props) => {
  const { values, setFieldValue, isSubmitting } = formikProps;

  return (
    <div className="flex flex-col gap-3 w-[340px]  ">
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

      <div className="flex gap-2">
        <div>
          <ATMDatePicker
            name="startDate"
            value={values.startDate}
            onChange={(newValue) => setFieldValue("startDate", newValue)}
            label="Start Date"
            maxDate={moment().format("yyyy-MM-DD")}
          />
        </div>

        <div>
          <ATMDatePicker
            name="endDate"
            value={values.endDate}
            onChange={(newValue) => setFieldValue("endDate", newValue)}
            label="End Date"
            minDate={values?.startDate || undefined}
          />
        </div>
      </div>

      <div className="mt-2">
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
