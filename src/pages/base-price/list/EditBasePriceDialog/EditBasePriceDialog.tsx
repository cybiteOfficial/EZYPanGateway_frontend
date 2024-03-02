import React from "react";
import { FormikProps } from "formik";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import { BasePriceInitialValues } from "./EditBasePriceDialogWrapper";

type Props = {
  formikProps: FormikProps<BasePriceInitialValues>;
  onClose: () => void;
};

const EditBasePriceDialog = ({ formikProps, onClose }: Props) => {
  const { values, setFieldValue, isSubmitting } = formikProps;

  return (
    <div className="flex flex-col gap-8">
      {/* Price */}
      <ATMTextField
        type="number"
        name="price"
        value={values.price?.toString()}
        onChange={(e) => {
          setFieldValue("price", e.target.value);
        }}
        label="Price"
        placeholder="Price"
      />
      {/* Convenience  Charges */}
      <ATMTextField
        type="number"
        name="convenienceprice"
        value={values.convenienceprice?.toString()}
        onChange={(e) => {
          setFieldValue("convenienceprice", e.target.value);
        }}
        label="Convenience  Charges"
        placeholder="Convenience  Charges"
      />

      {/* Guest Base Price  */}
      <ATMTextField
        type="number"
        name="guestBaseprice"
        value={values.guestBaseprice?.toString()}
        onChange={(e) => {
          setFieldValue("guestBaseprice", e.target.value);
        }}
        label="Guest Base Price"
        placeholder="Guest Base Price"
      />

      {/*Guest Convenience  Charges */}
      <ATMTextField
        type="number"
        name="guestConvenienceprice"
        value={values.guestConvenienceprice?.toString()}
        onChange={(e) => {
          setFieldValue("guestConvenienceprice", e.target.value);
        }}
        label="Guest Convenience  Charges"
        placeholder="Guest Convenience  Charges"
      />

      <div className="flex justify-end gap-3">
        <ATMLoadingButton
          className="border-primary-main text-primary-main bg-white"
          onClick={onClose}
        >
          Cancel
        </ATMLoadingButton>

        <ATMLoadingButton
          type="submit"
          isLoading={isSubmitting}
          className="bg-primary-main"
        >
          Submit
        </ATMLoadingButton>
      </div>
    </div>
  );
};

export default EditBasePriceDialog;
