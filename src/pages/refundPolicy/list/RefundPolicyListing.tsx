import React, { ReactNode } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
// import { useSelector } from "react-redux";
import { FormikProps } from "formik";

import ATMBreadCrumbs, {
  BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import ATMHTMLEditor from "src/components/UI/atoms/formFields/ATMHTMLEditor/ATMHTMLEditor";

import { RefundPolicyInitialValues } from "./RefundPolicyWrapper";
import AuthHOC from "src/userAccess/AuthHOC";
import { AccessAction } from "src/utils/Enums/AccessAction";

type Props = {
  formikProps: FormikProps<RefundPolicyInitialValues>;
};

// Form Section Heading
const FormSectionHeading = ({ children }: { children: ReactNode }) => {
  return (
    <div className="border-l-[3px] border-primary-main px-3 py-2 text-slate-700 font-medium text-[15px] sticky top-0 bg-white z-50">
      {children}
    </div>
  );
};
const RefundPolicyListing = ({ formikProps }: Props) => {
  const { values, setFieldValue, isSubmitting } = formikProps;

  const breadCrumbs: BreadcrumbType[] = [
    {
      label: "Dashboard",
      path: "/",
      icon: IoPersonCircleOutline,
    },
    {
      label: "Refund Policy",
      icon: IoPersonCircleOutline,
    },
  ];
  return (
  
      <div className="h-full py-5 px-4 flex flex-col gap-3">
        {/* Breadcrumbs */}
        <ATMBreadCrumbs breadcrumbs={breadCrumbs} />
        <div className="shadow-sm flex flex-col overflow-auto  border rounded p-3 bg-white relative">
          <div className="grow overflow-auto">
            {/* FAQ Information */}
            <div className=" pb-3">
              <FormSectionHeading>Refund Policy</FormSectionHeading>

              <div className="px-3 py-2 grid grid-cols-1 gap-5">
                <label className=" px-1 font-medium text-primary-main text-sm">
                  DESCRIPTION
                </label>
                <ATMHTMLEditor
                  name="description"
                  value={values.description}
                  onChange={(newValue) => {
                    setFieldValue("description", newValue);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
          <AuthHOC
          moduleName="REFUND_AND_CANCELLATIONS"
          action={AccessAction.EDIT}
          >
             <div>
              <ATMLoadingButton
                type="submit"
                isLoading={isSubmitting}
                loadingText={"Updating..."}
              >
                Update
              </ATMLoadingButton>
            </div>
            </AuthHOC>
           
          </div>
        </div>
      </div>
  );
};

export default RefundPolicyListing;
