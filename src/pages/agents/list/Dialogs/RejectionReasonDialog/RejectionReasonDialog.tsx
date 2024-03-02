import React from "react";
import { FormikProps } from "formik";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import ATMTextArea from "src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea";
import { FormInitialValues } from "./RejectionReasonDialogWrapper";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
  onClose: () => void;
};

const RejectionReasonDialog = ({ formikProps, onClose }: Props) => {
  const { values, setFieldValue, isSubmitting } = formikProps;

  return (
    <div className="flex flex-col gap-8">
      <ATMTextArea
        name="rejectionReason"
        value={values.rejectionReason}
        onChange={(newValue) => setFieldValue("rejectionReason", newValue)}
        label="Rejection Reason"
        placeholder="Rejection Reason"
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

export default RejectionReasonDialog;
