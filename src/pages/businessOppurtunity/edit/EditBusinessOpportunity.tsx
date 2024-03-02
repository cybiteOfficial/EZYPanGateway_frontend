import React, { ReactNode } from "react";
import ATMBreadCrumbs, {
  BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import { AoCodeInitialValues } from "./EditBusinessOpportunityWrapper";
import { FormikProps } from "formik";
import { IoPersonCircleOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";

const FormSectionHeading = ({ children }: { children: ReactNode }) => {
  return (
    <div className="border-l-[3px] border-primary-main px-3 py-2 text-slate-700 font-medium text-[15px] sticky top-0 bg-white z-50">
      {children}
    </div>
  );
};
type Props = {
  formikProps: FormikProps<AoCodeInitialValues>;
};
const breadcrumbs: BreadcrumbType[] = [
  {
    label: "Business Opportunity",
    path: "/business-opportunity",
    icon: IoPersonCircleOutline,
  },
  {
    label: "Edit Business Opportunity",
    icon: RxDashboard,
  },
];
const EditBusinessOpportunity = ({ formikProps }: Props) => {
  const { values, setFieldValue, isSubmitting } = formikProps;

  return (
    <div className="h-full py-5 px-4 flex flex-col gap-3 ">
      <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
      <div className="shadow-sm flex flex-col overflow-auto  border rounded p-3 bg-white relative">
        <div className="grow overflow-auto">
          {/* Banner Information */}
          <div className="border-slate-200 pb-3">
            <FormSectionHeading>
              Business Opportunity Information
            </FormSectionHeading>
            <div className="px-3 py-5 grid grid-cols-3 gap-5">
              {/* Commission */}
              <ATMTextField
                name="commission"
                value={values.commission}
                onChange={(e) => {
                  setFieldValue("commission", e.target.value);
                }}
                label="Commission"
                placeholder="Commission"
              />
              {/*  Reward Point */}
              <ATMTextField
                name="retailerReward"
                value={values.retailerReward}
                onChange={(e) => {
                  setFieldValue("retailerReward", e.target.value);
                }}
                label=" Reward Point"
                placeholder=" Reward Point"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <div>
            <ATMLoadingButton type="submit" isLoading={isSubmitting}>
              Update
            </ATMLoadingButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBusinessOpportunity;
