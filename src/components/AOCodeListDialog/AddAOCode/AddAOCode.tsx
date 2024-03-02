import { FormikProps } from "formik";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import { AOCodeInitialValues } from "./AddAOCodeWrapper";
type Props = {
  formikProps: FormikProps<AOCodeInitialValues>;
  onClose: () => void;
};

// Form Section Heading

const AddAOCode = ({ formikProps, onClose }: Props) => {
  const { values, setFieldValue, isSubmitting } = formikProps;

  return (
    <div className="h-full flex flex-col gap-3">
      <div className="grid grid-cols-6 gap-2">
        {/* City */}
        <div className="col-span-2">
          <ATMTextField
            name="city"
            value={values.city}
            onChange={(e) => {
              setFieldValue("city", e.target.value);
            }}
            label="City"
            placeholder="City"
          />
        </div>
        {/* Area Code */}
        <ATMTextField
          name="areaCode"
          value={values.areaCode}
          onChange={(e) => {
            setFieldValue("areaCode", e.target.value);
          }}
          label="Area Code"
          placeholder="Area Code"
        />

        {/* Ao Type */}
        <ATMTextField
          name="aoType"
          value={`${values.aoType || ""}`}
          onChange={(e) => {
            setFieldValue("aoType", e.target.value);
          }}
          label="AO Type"
          placeholder="AO Type"
        />
        {/* Range Code */}
        <ATMTextField
          name="rangeCode"
          value={`${values.rangeCode || ""}`}
          onChange={(e) => {
            setFieldValue("rangeCode", e.target.value);
          }}
          label="Range Code"
          placeholder="Range Code"
        />
        {/* AO No. */}
        <ATMTextField
          name="aoNo"
          value={`${values.aoNo || ""}`}
          onChange={(e) => {
            setFieldValue("aoNo", e.target.value);
          }}
          label="AO No"
          placeholder="AO No"
        />
        {/* </div> */}
      </div>
      <div className="flex justify-end  mb-2 gap-2">
        <ATMLoadingButton
          className="border-secondary-main text-secondary-main bg-white"
          onClick={onClose}
        >
          Cancel
        </ATMLoadingButton>
        <div>
          <ATMLoadingButton type="submit" isLoading={isSubmitting}>
            Add
          </ATMLoadingButton>
        </div>
      </div>
    </div>
  );
};

export default AddAOCode;
