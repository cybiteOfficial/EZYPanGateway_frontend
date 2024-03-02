import React, { ReactNode } from "react";
import { FormikProps } from "formik";
import ATMBreadCrumbs, {
  BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import { RewardPointInitialValues } from "./AddRewardPointValueWrapper";
import { RxDashboard } from "react-icons/rx";
import { IoPersonCircleOutline } from "react-icons/io5";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import RewardPointValueListingWrapper from "../list/RewardPointValueListingWrapper";
import AuthHOC from "src/userAccess/AuthHOC";
import { AccessAction } from "src/utils/Enums/AccessAction";
import NotAuthorizedPage from "src/components/UI/NotAuthorized/NotAuthorizedPage";

type Props = {
  formikProps: FormikProps<RewardPointInitialValues>;
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
    label: "Reward Point Value",
    icon: RxDashboard,
  },
];

const AddRewardPointValue = ({ formikProps }: Props) => {
  const { values, setFieldValue, isSubmitting } = formikProps;

  return (
    <div className="h-full py-5 px-4 flex flex-col gap-3 ">
      <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
      <div className="shadow-sm flex flex-col overflow-auto  border rounded p-3 bg-white relative">
        <div className="grow  ">
          {/* Banner Information */}
          <div className="border-slate-200 pb-3 ">
            <FormSectionHeading>REWARD POINT INFORMATION</FormSectionHeading>

            <div className="px-3 py-5 flex  items-end gap-5 ">
              {/* Reward Point Value */}
              <ATMTextField
                type="number"
                name="perRupeeRewardValue"
                value={values.perRupeeRewardValue.toString()}
                onChange={(e) => {
                  setFieldValue("perRupeeRewardValue", e.target.value);
                }}
                label="Reward Point Value"
                placeholder="Reward Point Value"
              />

              <AuthHOC
                moduleName="REWARD_POINTS"
                action={AccessAction.EDIT}
                alt={<NotAuthorizedPage />}
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
          <RewardPointValueListingWrapper />
        </div>
      </div>
    </div>
  );
};

export default AddRewardPointValue;
