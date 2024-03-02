import { FormikProps } from "formik";
import React from "react";
import ATMTextField from "../UI/atoms/formFields/ATMTextField/ATMTextField";
import { RejectionInitialValues } from "./ApplicationRejectionDialogWrapper";
import ATMLoadingButton from "../UI/atoms/ATMLoadingButton/ATMLoadingButton";
import ATMSelect from "../UI/atoms/formFields/ATMSelect/ATMSelect";

type Props = {
  formikProps: FormikProps<RejectionInitialValues>;
  onClose: () => void;
  rejectionListAll: any;
};

const ApplicationRejectionDialog = ({
  formikProps,
  onClose,
  rejectionListAll,
}: Props) => {
  const { values, setFieldValue, isSubmitting } = formikProps;

  return (
    <div className="flex flex-col gap-8">
      <div className="shadow-sm flex flex-col overflow-auto  border rounded p-3 bg-white relative">
        <div className="grow overflow-auto">
          {/* Rejection Message */}
          <div className="py-2">
            <ATMSelect
              name="rejectionReason"
              value={values.rejectionReason}
              onChange={(newValue) => {
                setFieldValue("rejectionReason", newValue);
              }}
              label="Rejection Message"
              options={rejectionListAll}
              isSearch
            />
          </div>
          {/* Remark */}
          <div className="py-3 ">
            <ATMTextField
              className="w-full py-5"
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
              Reject
            </ATMLoadingButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationRejectionDialog;
