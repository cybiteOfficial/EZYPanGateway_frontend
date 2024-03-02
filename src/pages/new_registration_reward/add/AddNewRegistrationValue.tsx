import React, { ReactNode } from "react";
import { FormikProps } from "formik";
import ATMBreadCrumbs, {
  BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import { NewRegistrationRewardInitialValues } from "./AddNewRegistrationValueWrapper";
import { RxDashboard } from "react-icons/rx";
import { IoPersonCircleOutline } from "react-icons/io5";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import NewRegistratiRewardListingWrapper from "../list/NewRegistratiRewardListingWrapper";
import AuthHOC from "src/userAccess/AuthHOC";
import { AccessAction } from "src/utils/Enums/AccessAction";

type Props = {
  formikProps: FormikProps<NewRegistrationRewardInitialValues>;
};

// Form Section Heading
const FormSectionHeading = ({ children }: { children: ReactNode }) => {
  return (
    <div className="border-l-[3px] border-primary-main px-3 py-2 text-slate-700 font-medium text-[15px] sticky top-0 bg-white z-50">
      {children}
    </div>
  );
};

const breadcrumbs: BreadcrumbType[] = [
  {
    label: "Dashboard",
    path: "/",
    icon: IoPersonCircleOutline,
  },
  {
    label: "New  Registration Reward ",
    icon: RxDashboard,
  },
];

const AddNewRegistrationValue = ({ formikProps }: Props) => {
  const { values, setFieldValue, isSubmitting } = formikProps;

  return (
    <div className="h-full py-5 px-4 flex flex-col gap-3 ">
      <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
      <div className="shadow-sm flex flex-col overflow-auto  border rounded p-3 bg-white relative">
        <div className="grow  ">
          {/* Banner Information */}
          <div className="border-slate-200 pb-3 ">
            <FormSectionHeading>NEW REGISTRATION REWARD INFORMATION</FormSectionHeading>

            <div className="px-3 py-5 flex  items-end gap-5 ">
              {/* New Registration Reward */}
              <ATMTextField
              type="number"
                name="retailerRegisterRewardPoint"
                value={values.retailerRegisterRewardPoint.toString()}
                onChange={(e) => {
                  setFieldValue("retailerRegisterRewardPoint", e.target.value);
                }}
                label="New Registration Reward"
                placeholder="New Registration Reward"
              />
              <AuthHOC moduleName="RETAILER_REGISTER_REWARDS" action={AccessAction.EDIT}>
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
          <NewRegistratiRewardListingWrapper />
        </div>
      </div>
    </div>
  );
};

export default AddNewRegistrationValue;
