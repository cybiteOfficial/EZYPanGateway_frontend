import React from "react";
import { FormikProps } from "formik";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import ATMTextArea from "src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea";
import { FormInitialValues } from "./RejectDialogBoxWrapper";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
  onClose: () => void;  
};

const RejectDialogBox = ({ formikProps, onClose }: Props) => {
  const { values, setFieldValue, isSubmitting } = formikProps;

  return (
    <div className="flex flex-col gap-8">
      <ATMTextArea
        name="remark"
        value={values.remark}
        onChange={(newValue) => setFieldValue("remark", newValue)}
        label="Remark"
        placeholder="Remark"
        minRows={4}
        className="rounded"
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

export default RejectDialogBox;
