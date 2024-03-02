import React from "react";
import { FormikProps } from "formik";
import ATMDatePicker from "src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker";
import ATMSelect from "src/components/UI/atoms/formFields/ATMSelect/ATMSelect";
import { FormInitialValues } from "./FilterCardWrapper";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
};

const statusOptions = [
  {
    label: "Pending",
    value: "PENDING",
  },
  {
    label: "Verified",
    value: "VERIFIED",
  },
];

const applicationTypeOptions = [
  {
    label: "New",
    value: "NEW",
  },
  {
    label: "Existing",
    value: "EXISTING",
  },
];

const categoryOptions = [
  {
    label: "cat-1",
    value: "Category 1",
  },
  {
    label: "cat-2",
    value: "Category 2",
  },
];

const FilterCard = ({ formikProps }: Props) => {
  const { values, setFieldValue, isSubmitting } = formikProps;

  return (
    <div className="flex flex-col gap-3 w-[340px] py-2 ">
      <div>
        <ATMSelect
          name="status"
          value={values.status}
          onChange={(e) => {
            setFieldValue("status", e.target.value);
          }}
          label="Status"
          options={statusOptions}
        />
      </div>

      <div>
        <ATMSelect
          name="applicationType"
          value={values.applicationType}
          onChange={(e) => {
            setFieldValue("applicationType", e.target.value);
          }}
          options={applicationTypeOptions}
          label="Application Type"
        />
      </div>

      <div>
        <ATMSelect
          name="category"
          value={values.category}
          onChange={(e) => {
            setFieldValue("category", e.target.value);
          }}
          options={categoryOptions}
          label="Category"
        />
      </div>

      <div className="flex gap-2">
        <div>
          <ATMDatePicker
            name="startDate"
            value={values.startDate}
            onChange={(newValue) => setFieldValue("startDate", newValue)}
            label="Start Date"
          />
        </div>

        <div>
          <ATMDatePicker
            name="endDate"
            value={values.endDate}
            onChange={(newValue) => setFieldValue("endDate", newValue)}
            label="End Date"
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
