import React, { ReactNode } from "react";
import { FormikProps } from "formik";
import { GrGallery } from "react-icons/gr";
import ATMBreadCrumbs, {
  BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import { MenuLinksInitialValues } from "./EditMenuLinkWrapper";
import { IoImageOutline } from "react-icons/io5";
import AuthHOC from "src/userAccess/AuthHOC";

type Props = {
  formikProps: FormikProps<MenuLinksInitialValues>;
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
    label: "Menu Links",
    path: "/menu-links",
    icon: GrGallery,
  },
  {
    label: "Edit Menu Link",
    icon: IoImageOutline,
  },
];

const EditMenuLink = ({ formikProps }: Props) => {
  const { values, setFieldValue, isSubmitting } = formikProps;

  return (
    <div className="h-full py-5 px-4 flex flex-col gap-3 ">
      <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
      <div className="shadow-sm flex flex-col overflow-auto  border rounded p-3 bg-white relative">
        <div className="grow overflow-auto">
          {/* MENU LINK INFORMATION */}
          <div className=" pb-3">
            <FormSectionHeading>MENU LINK INFORMATION</FormSectionHeading>

            <div className="px-3 py-5 grid grid-cols-3 gap-5">
              {/* Menu Name */}
              <ATMTextField
                name="menuName"
                value={values.menuName}
                onChange={(e) => {
                  setFieldValue("menuName", e.target.value);
                }}
                label="Menu Name"
                placeholder="Menu Name"
              />

              {/* Link */}
              <ATMTextField
                name="link"
                value={values.link}
                onChange={(e) => {
                  setFieldValue("link", e.target.value);
                }}
                label="Link"
                placeholder="Link"
              />

              {/* Order */}
              <ATMTextField
                type="number"
                min={1}
                name="order"
                value={`${values.order || ""}`}
                onChange={(e) => {
                  setFieldValue("order", e.target.value);
                }}
                label="Order"
                placeholder="Order"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <div>
            <AuthHOC
            moduleName="MENU_LINKS"
            action="EDIT"
            >
            <ATMLoadingButton type="submit" isLoading={isSubmitting}>
              Update
            </ATMLoadingButton>

            </AuthHOC>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMenuLink;
