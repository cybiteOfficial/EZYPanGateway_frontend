import React, { ReactNode } from "react";
import { FormikProps } from "formik";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import { PANServiceRewardInitialValues } from "./EditPANServiceRewardListingWrapper";
import PANServiceRewardListingWrapper from "../list/PANServiceRewardListingWrapper";
import AuthHOC from "src/userAccess/AuthHOC";
import { AccessAction } from "src/utils/Enums/AccessAction";
type Props = {
  formikProps: FormikProps<PANServiceRewardInitialValues>;
};

// Form Section Heading
const FormSectionHeading = ({ children }: { children: ReactNode }) => {
  return (
    <div className="border-l-[3px] border-primary-main px-3 py-2 text-slate-700 font-medium text-[15px] sticky top-0 bg-white z-50">
      {children}
    </div>
  );
};

const EditPANServiceReward = ({ formikProps }: Props) => {
  const { values, setFieldValue, isSubmitting } = formikProps;

  return (
    <div className="h-full py-5 px-4 flex flex-col gap-3 ">
      <div className="shadow-sm flex flex-col overflow-auto  border rounded p-3 bg-white relative">
        <div className="grow  ">
          {/* Banner Information */}
          <div className="border-slate-200 pb-3 ">
            <FormSectionHeading>REWARD</FormSectionHeading>

            <div className="px-3 py-5 flex  items-end gap-5 ">
              {/* distributor */}
              <ATMTextField
                type="number"
                name="rewardForDistributor"
                value={values.rewardForDistributor.toString()}
                onChange={(e) => {
                  setFieldValue("rewardForDistributor", e.target.value);
                }}
                label="For Distributor"
                placeholder="Distributor Amount"
              />
              {/* Retailer */}
              <ATMTextField
                type="number"
                name="rewardForRetailer"
                value={values.rewardForRetailer.toString()}
                onChange={(e) => {
                  setFieldValue("rewardForRetailer", e.target.value);
                }}
                label="For Retailer"
                placeholder="Retailer Amount"
              />
              {/* Guest */}
              <ATMTextField
                type="number"
                name="rewardForGuest"
                value={values.rewardForGuest.toString()}
                onChange={(e) => {
                  setFieldValue("rewardForGuest", e.target.value);
                }}
                label="For Guest"
                placeholder="Guest Amount"
              />
              <AuthHOC moduleName="REWARDS" action={AccessAction.EDIT}>
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
          <PANServiceRewardListingWrapper />
        </div>
      </div>
    </div>
  );
};

export default EditPANServiceReward;
