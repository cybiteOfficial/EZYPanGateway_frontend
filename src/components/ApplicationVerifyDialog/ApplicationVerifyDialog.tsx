import { FormikProps } from "formik";
import React from "react";
import ATMTextField from "../UI/atoms/formFields/ATMTextField/ATMTextField";
import { VerificationInitialValues } from "./ApplicationVerifyDialogWrapper";
import ATMLoadingButton from "../UI/atoms/ATMLoadingButton/ATMLoadingButton";
import ATMFilePickerWrapper from "../UI/atoms/formFields/ATMFileUploader/ATMFileUploaderWrapper";
import { showToast } from "src/utils/toaster/showToast";
import {
  getAcknowledgementNumber,
  isValidFileName,
} from "src/utils/acknowledgementNumber/acknowledgementNumber";

type Props = {
  formikProps: FormikProps<VerificationInitialValues>;
  onClose: () => void;
  type :string
};

const ApplicationVerifyDialog = ({ formikProps, onClose,type }: Props) => {
  const { values, setFieldValue, isSubmitting } = formikProps;
  return (
    <div className=" flex flex-col overflow-auto   rounded  bg-white relative ">
      <div className="grow overflow-auto">
        {/* Acknowledgement */}
        <div className="py-2 w-[90%]">
          <ATMFilePickerWrapper
            name="acknowledgement"
            selectedFile={values?.acknowledgement}
            accept="application/pdf"
            onSelect={(newValue: any) => { 
             if(type === 'PAN'){ 
           
              if (isValidFileName(newValue.name)) { 
                setFieldValue("acknowledgement", newValue);
                setFieldValue(
                  "acknowledgementNumber",
                  getAcknowledgementNumber(newValue.name)
                );
              } else {
                showToast("error", "Invalid File name");
                setFieldValue("acknowledgement", "");
              }
             }else{
              setFieldValue("acknowledgement", newValue);
              setFieldValue(
                "acknowledgementNumber",''
              );
             }
            }}
            label="Acknowledgement"
            hideCloseButton
          />
        </div>
        {/* Remark */}
        <div className="py-3 w-[90%]">
          <ATMTextField
            className=" py-5"
            name="remark"
            value={values.remark}
            onChange={(e) => {
              setFieldValue("remark", e.target.value);
            }}
            label="Remark"
            placeholder="Remark"
          />
        </div>
      </div>

      <div className="flex justify-end pt-3">
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
    </div>
  );
};

export default ApplicationVerifyDialog;
