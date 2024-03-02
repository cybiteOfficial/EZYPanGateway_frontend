import React from "react";
import { FormikProps } from "formik";
import ATMDatePicker from "src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker";
import ATMSelect from "src/components/UI/atoms/formFields/ATMSelect/ATMSelect";
import { FormInitialValues } from "./DigitalPANFilterCardWrapper";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import moment from "moment";
import { filterApplicationStatus } from "src/utils/filterApplicationStatus";
import { getTabs } from "src/utils/auth/getTabs";
import { requiredStatusForDigitalPan } from "src/utils/digitalPanRequiredStatus";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
  onReset: () => void;
  categoryData: any;
};

const DigitalPANFilterCard = ({
  formikProps,
  onReset,
  categoryData,
}: Props) => {
  const { values, setFieldValue, isSubmitting } = formikProps;

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
      <div>
        <ATMSelect
          name="status"
          value={values.status}
          onChange={(e) => {
            setFieldValue("status", e.target.value);
          }}
          label="Status"
          options={getTabs(
            filterApplicationStatus.filter((fiterStatus) =>             
                requiredStatusForDigitalPan.includes(fiterStatus.value)             
            ),
            "PAN_APPLICATIONS"
          )}
        />
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

export default DigitalPANFilterCard;
