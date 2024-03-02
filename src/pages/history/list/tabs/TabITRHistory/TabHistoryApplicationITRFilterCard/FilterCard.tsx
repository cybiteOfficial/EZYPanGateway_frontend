import React from "react";
import { FormikProps } from "formik";
import ATMDatePicker from "src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker";
import ATMSelect from "src/components/UI/atoms/formFields/ATMSelect/ATMSelect";
import { FormInitialValues } from "./FilterCardWrapper";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import moment from "moment";
import { filterApplicationStatus } from "src/utils/filterApplicationStatus";
import { getTabs } from "src/utils/auth/getTabs";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
  onReset: () => void;
  categoryData: any;
};

const FilterCard = ({ formikProps, onReset, categoryData }: Props) => {
  const { values, setFieldValue, isSubmitting } = formikProps;

  const categoryOptions = categoryData.map((category: any) => ({
    label: category.categoryName,
    value: category.categoryCode,
  }));

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
      <div>
        <ATMSelect
          name="status"
          value={values.status}
          onChange={(e) => {
            setFieldValue("status", e.target.value);
          }}
          label="Status"
          options={getTabs(filterApplicationStatus, "ITR_APPLICATIONS")}
        />
      </div>

      <div>
        <ATMSelect
          name="paymentCategory"
          value={values.paymentCategory}
          onChange={(e) => {
            setFieldValue("paymentCategory", e.target.value);
          }}
          options={categoryOptions}
          label="Category"
        />
      </div>
      <div className="flex gap-2">
        <div>
          <ATMDatePicker
            name="doneDateFrom"
            value={values.doneDateFrom}
            onChange={(newValue) => setFieldValue("doneDateFrom", newValue)}
            label="Done date from"
            maxDate={moment().format("yyyy-MM-DD")}
          />
        </div>

        <div>
          <ATMDatePicker
            name="doneDateTo"
            value={values.doneDateTo}
            onChange={(newValue) => setFieldValue("doneDateTo", newValue)}
            label=" Done date to"
            minDate={values?.doneDateFrom || undefined}
          />
        </div>
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
