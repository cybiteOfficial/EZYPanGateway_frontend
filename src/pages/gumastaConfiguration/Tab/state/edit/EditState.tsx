import React from "react";
import { FormikProps } from "formik";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import { EditStateValueTypes } from "./EditStateWrapper";

type Props = {
  formikProps: FormikProps<EditStateValueTypes>;
  onClose: () => void;
};

const EditState = ({ formikProps, onClose }: Props) => {
  const { values, setFieldValue, isSubmitting } = formikProps;

  return (
    <div className="h-full ">
      <div className="shadow-sm flex flex-col overflow-auto  border rounded p-1 bg-white relative">
        <div className="grow overflow-auto">
          {/* State Name Information */}
          <div className="px-3 py-5 grid grid-cols-1 gap-5">
            {/* State Name */}
            <div style={{ flex: "2 1 0" }}>
              <ATMTextField
                name="state"
                value={values?.state}
                onChange={(e) => {
                  setFieldValue("state", e.target.value?.trim());
                }}
                label="State Name"
                placeholder="State Name"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <div>
            <ATMLoadingButton onClick={onClose}>Cancel</ATMLoadingButton>
          </div>
          <div>
            <ATMLoadingButton  className="bg-primary-main" type="submit" isLoading={isSubmitting}>
              Edit
            </ATMLoadingButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditState;
