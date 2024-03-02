import React, { ReactNode } from "react";
import { FormikProps } from "formik";
import { GrGallery } from "react-icons/gr";
import ATMBreadCrumbs, {
  BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import { PopUpBannerInitialValues } from "./AddPopUpBannerWrapper";
import { IoImageOutline } from "react-icons/io5";
import ATMFilePickerWrapper from "src/components/UI/atoms/formFields/ATMFileUploader/ATMFileUploaderWrapper";
import AuthHOC from "src/userAccess/AuthHOC";
import NotAuthorizedPage from "src/components/UI/NotAuthorized/NotAuthorizedPage";
import { AccessAction } from "src/utils/Enums/AccessAction";
import ATMSwitchButton from "src/components/UI/atoms/formFields/ATMSwitchButton/ATMSwitchButton";

type Props = {
  formikProps: FormikProps<PopUpBannerInitialValues>;
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
    icon: GrGallery,
  },
  {
    label: "Pop-Up Banner",
    icon: IoImageOutline,
  },
];

const AddPopUpBanner = ({ formikProps }: Props) => {
  const { values, setFieldValue, isSubmitting } = formikProps;

  return (
    <AuthHOC
      moduleName="POPUP_BANNERS"
      alt={<NotAuthorizedPage />}
      action={AccessAction.LIST}
    >
      <div className="h-full py-5 px-4 flex flex-col gap-3">
        {/* Breadcrumbs */}
        <ATMBreadCrumbs breadcrumbs={breadcrumbs} />

        <div className="shadow-sm flex flex-col overflow-auto  border rounded p-3 bg-white relative">
          <div className="grow overflow-auto">
            {/* Image Information */}
            <div className="pb-3">
              <FormSectionHeading>POP-UP BANNER INFORMATION</FormSectionHeading>
              <div className="px-3 py-5 grid grid-cols-3 gap-5">
                {/* Image */}
                <ATMFilePickerWrapper
                  name="image"
                  selectedFile={values.image}
                  onSelect={(newValue) => setFieldValue("image", newValue)}
                  label="Banner Image"
                  placeholder="Select Image"
                />

                <ATMSwitchButton 
                name="isActive"
                value ={values.isActive}
                onChange={(newValue)=>setFieldValue("isActive",newValue)}
                label="Activate/Deactivate"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <div>
              <AuthHOC moduleName="POPUP_BANNERS" action={AccessAction.EDIT}>
                <ATMLoadingButton
                  type="submit"
                  isLoading={isSubmitting}
                  loadingText={"Updating..."}
                >
                  Update
                </ATMLoadingButton>
              </AuthHOC>
            </div>
           
          </div>
        </div>
      </div>
    </AuthHOC>
  );
};

export default AddPopUpBanner;
