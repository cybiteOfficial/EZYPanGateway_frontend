import React from 'react'
import { FormikProps } from "formik";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import ATMFilePickerWrapper from 'src/components/UI/atoms/formFields/ATMFileUploader/ATMFileUploaderWrapper';
import { FormInitialValues } from './DistributorVerifyDialogWrapper';


type Props = {
  formikProps: FormikProps<FormInitialValues>;
  onClose: () => void;
};

const DistributorVerifyDialog = ({ formikProps, onClose }: Props) => {
  
  const { values, setFieldValue, isSubmitting } = formikProps;

  return (
    <div className="flex flex-col gap-8">
    <ATMFilePickerWrapper
      name="declaration_form"
     selectedFile={values.declaration_form}
      onSelect={(newValue:any) => setFieldValue("declaration_form", newValue)}
      accept="application/pdf"
      label="Declaration Form"
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
        Verify
      </ATMLoadingButton>
    </div>
  </div>
  )
}

export default DistributorVerifyDialog