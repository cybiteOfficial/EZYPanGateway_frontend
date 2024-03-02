import React from "react";
import { FormikProps } from "formik";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import { addDistrictValueTypes } from "./AddDistrictWrapper";
import ATMSelect from "src/components/UI/atoms/formFields/ATMSelect/ATMSelect";

type Props = {
  formikProps: FormikProps<addDistrictValueTypes>;
  onClose: () => void;
  stateOptions:any
};


const AddDistrict = ({ formikProps, onClose ,stateOptions }: Props) => {
  const { values, setFieldValue, isSubmitting } = formikProps;

  return (
    <div className="h-full ">
      <div className="shadow-sm flex flex-col overflow-auto  border rounded p-1 bg-white relative">
        <div className="grow overflow-auto">
          {/* State Name Information */}
          <div className="px-3 py-5 grid grid-cols-1 gap-5">
            {/* State Name */}
            <div>
              <ATMSelect
                name="state"
                value={values.state}
                onChange={(e) => {
                  setFieldValue("state", e.target.value?.trim());
                }}
                label="State Name"
                options={stateOptions?.allState}
              />
            </div>
            <div>
              <ATMTextField
                name="district"
                value={values?.district}
                onChange={(e) => {
                  setFieldValue("district", e.target.value?.trim());
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
            <ATMLoadingButton
              className="bg-primary-main"
              type="submit"
              isLoading={isSubmitting}
            >
              Add
            </ATMLoadingButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDistrict;
