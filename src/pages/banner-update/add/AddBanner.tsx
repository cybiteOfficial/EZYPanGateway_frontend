import React, { ReactNode } from "react";
import { FormikProps } from "formik";
import ATMBreadCrumbs, {
  BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import { BannerInitialValues } from "./AddBannerWrapper";
import ATMFilePickerWrapper from "src/components/UI/atoms/formFields/ATMFileUploader/ATMFileUploaderWrapper";
import { RxDashboard } from "react-icons/rx";
import { IoPersonCircleOutline } from "react-icons/io5";

type Props = {
  formikProps: FormikProps<BannerInitialValues>;
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
    label: "Banner List",
    path: "/banner",
    icon: IoPersonCircleOutline,
  },
  {
    label: "Banner Add",
    icon: RxDashboard,
  },
];

const AddBanner = ({ formikProps }: Props) => {
  const { values, setFieldValue, isSubmitting } = formikProps;

  return (
    <div className="h-full py-5 px-4 flex flex-col gap-3 ">
      <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
      <div className="shadow-sm flex flex-col overflow-auto  border rounded p-3 bg-white relative">
        <div className="grow overflow-auto">
          {/* Banner Information */}
          <div className="border-slate-200 pb-3">
            <FormSectionHeading>BANNER INFORMATION</FormSectionHeading>

            <div className="px-3 py-5 grid grid-cols-3 gap-5">
              {/* Image */}
              <ATMFilePickerWrapper
                name="image"
                selectedFile={values.image}
                onSelect={(newValue) => setFieldValue("image", newValue)}
                label="Image"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <div>
            <ATMLoadingButton type="submit" isLoading={isSubmitting}>
              Add Banner
            </ATMLoadingButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBanner;
