import React, { ReactNode } from "react";
import { FormikProps } from "formik";
import { GrGallery } from "react-icons/gr";
import ATMBreadCrumbs, {
  BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import { DropdownOptions, OtherServiceInitialValues } from "./EditOtherServiceWrapper";
import { IoImageOutline } from "react-icons/io5";
import ATMSelect from "src/components/UI/atoms/formFields/ATMSelect/ATMSelect";

type Props = {
  formikProps: FormikProps<OtherServiceInitialValues>;
  dropdownOptions: DropdownOptions;
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
    label: "Other Services",
    path: "/other-services",
    icon: GrGallery,
  },
  {
    label: "Edit Other Service",
    icon: IoImageOutline,
  },
];

const EditMenuLink = ({ formikProps, dropdownOptions }: Props) => {
  const { values, setFieldValue, isSubmitting } = formikProps;

  return (
    <div className="h-full py-5 px-4 flex flex-col gap-3 ">
      <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
      <div className="shadow-sm flex flex-col overflow-auto  border rounded p-3 bg-white relative">
        <div className="grow overflow-auto">
          {/* OTHER SERVICE INFORMATION */}
          <div className=" pb-3">
            <FormSectionHeading>OTHER SERVICE INFORMATION</FormSectionHeading>

            <div className="px-3 py-5 grid grid-cols-3 gap-5">
              {/* Service Name */}
              <ATMTextField
                name="serviceName"
                value={values.serviceName}
                onChange={(e) => {
                  setFieldValue("serviceName", e.target.value);
                }}
                label="Service Name"
                placeholder="Service Name"
              />

              {/* Service Description */}
              <ATMTextField
                name="serviceDescription"
                value={values.serviceDescription}
                onChange={(e) => {
                  setFieldValue("serviceDescription", e.target.value);
                }}
                label="Service Description"
                placeholder="Service Description"
              />
              {/* Static Page */}
              <ATMSelect
                name="staticPageId"
                value={values.staticPageId}
                onChange={(e) => {
                  setFieldValue("staticPageId", e.target.value);
                }}
                label="Static Page"
                options={dropdownOptions.staticPageOptions}
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

export default EditMenuLink;
