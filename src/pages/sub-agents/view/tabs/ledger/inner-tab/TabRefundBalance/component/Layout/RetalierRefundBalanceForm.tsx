import { FormikProps } from "formik";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import ATMTextArea from "src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import { RetailerRefundFormValues } from "../Edit/EditRetalierRefundBalanceWrapper";
import { handleValidNumber } from "src/utils/regularExpression";
import ATMSelect from "src/components/UI/atoms/formFields/ATMSelect/ATMSelect";
import { IoClose } from "react-icons/io5";

type Props = {
  formikProps: FormikProps<RetailerRefundFormValues>;
  onClose: () => void;
  formType: "Add" | "Edit";
};

const applicationTypeOptions = [
  {
    label: "PAN",
    value: "PAN",
  },
  {
    label: "ITR",
    value: "ITR",
  },
  {
    label: "GUMASTA",
    value: "GUMASTA",
  },
  {
    label: "DSC",
    value: "DSC",
  },
  {
    label: "MSME",
    value: "MSME",
  },
];

const transactionTypeOptions = [
  {
    label: "CREDIT",
    value: "CREDIT",
  },
  {
    label: "DEBIT",
    value: "DEBIT",
  },
];

const RetalierRefundBalanceForm = ({ formikProps, onClose, formType }: Props) => {
  const { values, setFieldValue, isSubmitting, handleBlur } = formikProps;
  return (
    <div className="flex p-4 flex-col gap-6 relative">
      <div className="flex justify-between items-center">
        <div className="text-xl font-medium">
          {formType === "Add" ? "Add Refund" : "Update Refund"}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-full flex justify-center items-center bg-slate-200 hover:bg-red-400 hover:text-white transition-all"
        >
          <IoClose />
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {/* Amount */}
        <div>
          <ATMTextField
            name="amountToBeUpdate"
            value={values?.amountToBeUpdate}
            onChange={(e) =>
              handleValidNumber(e) &&
              setFieldValue("amountToBeUpdate", e.target.value)
            }
            label="Amount"
            placeholder="Enter Amount"
            onBlur={handleBlur}
          />
        </div>
        {/* Appplication Type */}
        <div>
          <ATMSelect
            name="applicationType"
            value={values?.applicationType || ""}
            onChange={(e) => {
              setFieldValue("applicationType", e.target.value);
            }}
            label="Appplication Type"
            options={applicationTypeOptions}
          />
        </div>
        {/* Appplication Type */}
        <div>
          <ATMSelect
            name="transactionType"
            value={values?.transactionType || ""}
            onChange={(e) => {
              setFieldValue("transactionType", e.target.value);
            }}
            label="Transcation Type"
            options={transactionTypeOptions}
          />
        </div>

        {/* Remark */}
        <div className="">
          <ATMTextArea
            minRows={3}
            name="remark"
            value={values?.remark}
            onChange={(newValue) => setFieldValue("remark", newValue)}
            label="Remark"
            placeholder="Enter Remark"
          />
        </div>
      </div>
      <div>
        <ATMLoadingButton isLoading={isSubmitting} type="submit">
          Save
        </ATMLoadingButton>
      </div>
    </div>
  );
};

export default RetalierRefundBalanceForm;
