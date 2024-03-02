import React, { ReactNode } from "react";
import { FormikProps } from "formik";
import { FiUser } from "react-icons/fi";
import { IoPersonCircleOutline } from "react-icons/io5";
import ATMBreadCrumbs, {
  BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import { UserFormInitialValues } from "./AddUserWrapper";

type Props = {
  formikProps: FormikProps<UserFormInitialValues>;
};

// Form Section Heading
const FormSectionHeading = ({ children }: { children: ReactNode }) => {
  return (
    <div className="border-l-[3px] border-primary-main px-3 py-2 text-slate-700 font-medium text-[15px]">
      {children}
    </div>
  );
};

const breadcrumbs: BreadcrumbType[] = [
  {
    label: "User access",
    path: "/user-access",
    icon: IoPersonCircleOutline,

  },
  {
    label: "Add new user",
    icon: FiUser,

  },
];

const AddUser = ({ formikProps }: Props) => {
  const { values, setFieldValue, isSubmitting } = formikProps;

  return (
    <div className="h-full py-5 px-4 flex flex-col gap-3">
      <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
      <div className="shadow-sm flex flex-col grow  border rounded p-3 bg-white">
        <div className="grow overflow-auto">
          {/* User Information */}
          <div className="border-b border-slate-400 pb-3 ">
            <FormSectionHeading>USER INFORMATION</FormSectionHeading>

            <div className="px-3 py-5 grid grid-cols-3 gap-5">

              {/* Name */}
              <ATMTextField
                name="name"
                value={values.name}
                onChange={(e) => {
                  setFieldValue("name", e.target.value);
                }}
                label="Enter Name"
                placeholder="Name"
              />

              {/* Email */}
              <ATMTextField
                name="email"
                value={values.email}
                onChange={(e) => {
                  setFieldValue("email", e.target.value);
                }}
                label="Email"
                placeholder="Email"
              />

              {/* Mobile Number */}
              <ATMTextField
                name="mobile"
                value={values.mobile}
                onChange={(e) => {
                  setFieldValue("mobile", e.target.value);
                }}
                label="Mobile Number"
                placeholder="Distributor Mobile Number"
              />
            </div>
          </div>

          {/* User Role */}
          <div className=" border-slate-400 py-3 ">
            <FormSectionHeading>USER ROLE</FormSectionHeading>
          </div>
        </div>

        <div className="flex justify-end">
          <div>
            <ATMLoadingButton type="submit" isLoading={isSubmitting}  > Add User </ATMLoadingButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
