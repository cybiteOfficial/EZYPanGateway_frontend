import React, { ReactNode } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FormikProps } from "formik";

import ATMBreadCrumbs, {
  BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import ATMHTMLEditor from "src/components/UI/atoms/formFields/ATMHTMLEditor/ATMHTMLEditor";

import { TermsAndConditionInitialValues } from "./TermsAndConditionsListingWrapper";
import AuthHOC from "src/userAccess/AuthHOC";
import NotAuthorizedPage from "src/components/UI/NotAuthorized/NotAuthorizedPage";
import { AccessAction } from "src/utils/Enums/AccessAction";

type Props = {
  formikProps: FormikProps<TermsAndConditionInitialValues>;
};

// Form Section Heading
const FormSectionHeading = ({ children }: { children: ReactNode }) => {
  return (
    <div className="border-l-[3px] border-primary-main px-3 py-2 text-slate-700 font-medium text-[15px] sticky top-0 bg-white z-50">
      {children}
    </div>
  );
};
const TermsAndConditionsListing = ({ formikProps }: Props) => {
  const { values, setFieldValue, isSubmitting } = formikProps;

  // const [isTermsConditionDialogOpen,setIsTermsConditionDialogOpen] = useState(false)
  const breadCrumbs: BreadcrumbType[] = [
    {
      label: "DashBoard",
      path: "/",
      icon: IoPersonCircleOutline,
    },
    {
      label: "Terms & Conditions",
      icon: IoPersonCircleOutline,
    },
  ];
  // const termsAndConditionState: any = useSelector((state: RootState) => state.termsAndConditionApplication);
  // const { isTableLoading } = termsAndConditionState;
  return (
    <AuthHOC
      alt={<NotAuthorizedPage />}
      moduleName="TERMS_AND_CONDITIONS"
      action={AccessAction.LIST}
    >
      <div className="h-full py-5 px-4 flex flex-col gap-3">
        {/* Breadcrumbs */}
        <ATMBreadCrumbs breadcrumbs={breadCrumbs} />
        <div className="shadow-sm flex flex-col overflow-auto  border rounded p-3 bg-white relative">
          <div className="grow overflow-auto">
            {/* FAQ Information */}
            <div className=" pb-3">
              <FormSectionHeading>Terms & Condition</FormSectionHeading>

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
              moduleName="TERMS_AND_CONDITIONS"
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
    </AuthHOC>
  );
};

export default TermsAndConditionsListing;
