import React, { ReactNode } from "react";
import { FormikProps } from "formik";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import { GumastaCommissionInitialValues } from "./AddGumastaCommissionValueWrapper";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import GumastaServiceCommissionListingWrapper from "../list/GumastaServiceCommissionListingWrapper";
import AuthHOC from "src/userAccess/AuthHOC";
import { AccessAction } from "src/utils/Enums/AccessAction";

type Props = {
  formikProps: FormikProps<GumastaCommissionInitialValues>;
};

// Form Section Heading
const FormSectionHeading = ({ children }: { children: ReactNode }) => {
  return (
    <div className="border-l-[3px] border-primary-main px-3 py-2 text-slate-700 font-medium text-[15px] sticky top-0 bg-white z-50">
      {children}
    </div>
  );
};

const AddGumastaCommissionValue = ({ formikProps }: Props) => {
  const { values, setFieldValue, isSubmitting } = formikProps;

  return (
    <div className="h-full py-5 px-4 flex flex-col gap-3 ">
      <div className="shadow-sm flex flex-col overflow-auto  border rounded p-3 bg-white relative">
        <div className="grow  ">
          {/* Banner Information */}
          <div className="border-slate-200 pb-3 ">
            <FormSectionHeading>
              GUMASTA COMMISSION INFORMATION
            </FormSectionHeading>

            <div className="px-3 py-5 flex  items-end gap-5 ">
              {/* Commission */}
              <ATMTextField
                type="number"
                name="commissionForDistributor"
                value={values.commissionForDistributor.toString()}
                onChange={(e) => {
                  setFieldValue("commissionForDistributor", e.target.value);
                }}
                label="Commission"
                placeholder="Commission"
              />
              <AuthHOC
                moduleName="COMMISSIONS"
                action={AccessAction.EDIT}
              >
                <ATMLoadingButton
                  type="submit"
                  isLoading={isSubmitting}
                  className="h-[40px]"
                >
                  Update
                </ATMLoadingButton>
              </AuthHOC>
            </div>
          </div>
        </div>

        <div className="overflow-auto">
          <GumastaServiceCommissionListingWrapper />
        </div>
      </div>
    </div>
  );
};

export default AddGumastaCommissionValue;
