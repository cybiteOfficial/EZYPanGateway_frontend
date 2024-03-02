import React, { ReactNode } from "react";
import { FormikProps } from "formik";
import ATMBreadCrumbs, {
  BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import { DropdownOptions, AdminInitialValues } from "./AddAdminWrapper";
import { IoPersonCircleOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import ATMSelect from "src/components/UI/atoms/formFields/ATMSelect/ATMSelect";
import ATMPassword from "src/components/UI/atoms/formFields/ATMPassword/ATMPassword";
import { BiCheck } from "react-icons/bi";
import { ValidApplicationStatus } from "src/utils/ValidApplicationStatus";
type Props = {
  formikProps: FormikProps<AdminInitialValues>;
  dropdownOptions: DropdownOptions;
  isLoading: boolean;
};

// Form Section Heading
const FormSectionHeading = ({ children }: { children: ReactNode }) => {
  return (
    <div className="border-l-[3px] border-primary-main px-3 py-2 text-slate-700 font-medium text-[15px] sticky top-0 bg-white z-50">
      {children}
    </div>
  );
};

// Breadcrumbs
const breadcrumbs: BreadcrumbType[] = [
  {
    label: "Manage Admin",
    path: "/admins",
    icon: IoPersonCircleOutline,
  },
  {
    label: "Create Admin",
    icon: RxDashboard,
  },
];

// Application Status
const applicationStatus: { label: string; value: ValidApplicationStatus }[] = [
  { label: "Pending", value: "PENDING" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Reject", value: "REJECT" },
  { label: "Login Done", value: "VERIFY" },
  { label: "Generate", value: "GENERATE" },
  { label: "Done", value: "DONE" },
  { label: "Cancelled", value: "CANCELLED" },
];

// Applications
const applications = [
  { label: "PAN", value: "PAN" },
  { label: "ITR", value: "ITR" },
  { label: "Gumasta", value: "GUMASTA" },
  { label: "DSC", value: "DSC" },
  { label: "MSME", value: "MSME" },
];

// Checkbox Clsses
const checkboxClasses =
  "flex justify-center items-center h-4 w-4 rounded border border-slate-400 shadow font-bold transition-all";

const AddAdmin = ({ formikProps, dropdownOptions, isLoading }: Props) => {
  const { values, setFieldValue, isSubmitting } = formikProps;

  // Handle Checkbox
  const handleCheckbox = (
    application: string,
    status: ValidApplicationStatus
  ) => {
    const isSelected =
      values.applicationStatusAccess?.findIndex(
        (access) =>
          access.applicationType === application && access.status === status
      ) > -1;
    setFieldValue(
      "applicationStatusAccess",
      isSelected
        ? values.applicationStatusAccess?.filter(
            (access) =>
              !(
                access.applicationType === application &&
                access.status === status
              )
          )
        : [
            ...values.applicationStatusAccess,
            { applicationType: application, status },
          ]
    );
  };

  // Handle Select All
  const handleSelecteAll = (application: string) => {
    const isAllSelected =
      values.applicationStatusAccess?.filter(
        (access) => access.applicationType === application
      ).length === 7;

    if (isAllSelected) {
      let filtered = values.applicationStatusAccess?.filter(
        (access) => access.applicationType !== application
      );

      setFieldValue("applicationStatusAccess", filtered);
    } else {
      let accessList: any[] = [];
      applicationStatus?.forEach((status, index) => {
        if (
          values?.applicationStatusAccess?.findIndex(
            (access) =>
              access.applicationType === application &&
              access.status === status.value
          ) === -1
        ) {
          accessList.push({
            applicationType: application,
            status: status.value,
          });
        }
      });

      setFieldValue("applicationStatusAccess", [
        ...values?.applicationStatusAccess,
        ...accessList,
      ]);
    }
  };

  return (
    <div className="h-full py-5 px-4 flex flex-col gap-3 ">
      <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
      <div className="shadow-sm flex flex-col overflow-auto  border rounded p-3 bg-white relative">
        <div className="grow overflow-auto">
          {/* ADMIN Information */}
          <div className="pb-3">
            <FormSectionHeading>ADMIN INFORMATION</FormSectionHeading>

            <div className="px-3 py-5 grid grid-cols-3 gap-5">
              {/* Full Name */}
              <ATMTextField
                name="userName"
                value={values.userName}
                onChange={(e) => {
                  setFieldValue("userName", e.target.value);
                }}
                label="Full Name"
                placeholder="Full Name"
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

              {/* Mobile */}
              <ATMTextField
                name="mobile"
                value={values.mobile}
                onChange={(e) => {
                  setFieldValue("mobile", e.target.value);
                }}
                label="Mobile"
                placeholder="Mobile"
              />

              {/* Password */}
              <ATMPassword
                name="password"
                value={values.password}
                onChange={(e) => {
                  setFieldValue("password", e.target.value);
                }}
                label="Password"
                placeholder="Password"
              />

              {/* Confirm Password */}
              <ATMPassword
                name="confirm_password"
                value={values.confirm_password}
                onChange={(e) => {
                  setFieldValue("confirm_password", e.target.value);
                }}
                label="Confirm Password"
                placeholder="Confirm Password"
              />

              {/* Role */}
              <ATMSelect
                name="adminRoleGroupName"
                value={values.adminRoleGroupName}
                onChange={(e) => {
                  setFieldValue("adminRoleGroupName", e.target.value);
                }}
                label="Role"
                options={dropdownOptions.roleOptions}
                isLoading={isLoading}
              />

              {/* printWaitTime */}
              <ATMTextField
                name="printWaitTime"
                value={values.printWaitTime}
                onChange={(e) => {
                  setFieldValue("printWaitTime", e.target.value);
                }}
                label="Print Wait Time"
                placeholder="Print Wait Time"
              />

              {/* 
              {/* maximumInprogressCount  */}
              <ATMTextField
                name="maximumInprogressCount"
                value={values.maximumInprogressCount.toString()}
                onChange={(e) => {
                  setFieldValue("maximumInprogressCount", e.target.value);
                }}
                label="Maximum In progress Count"
                placeholder="Maximum In progress Count"
              />
            </div>

            {/* Application Status Access */}
            <div className="px-2">
              <div className="text-primary-main font-medium ">
                Application Status Access
              </div>

              <div className="mt-3 shadow  border rounded ">
                {/* Headers */}
                <div className="grid grid-cols-9 border-b p-2 bg-slate-100">
                  <div className="text-sm text-primary-main font-medium">
                    Applications
                  </div>
                  <div className="text-center text-sm  font-medium">
                    Select all
                  </div>
                  {applicationStatus?.map((status, statusIndex) => (
                    <div
                      key={statusIndex}
                      className="text-center text-sm  font-medium"
                    >
                      {status.label}
                    </div>
                  ))}
                </div>

                {/* Rows */}
                {applications?.map((application, applicationIndex) => {
                  const isAllSelected =
                    values.applicationStatusAccess?.filter(
                      (access) => access.applicationType === application.value
                    ).length === 7;
                  return (
                    <div
                      key={applicationIndex}
                      className="grid grid-cols-9 border-b py-2 px-2"
                    >
                      <div className="text-sm text-primary-main font-medium">
                        {application.label}
                      </div>

                      <div className="flex justify-center">
                        <button
                          type="button"
                          onClick={() => handleSelecteAll(application.value)}
                          className={`${checkboxClasses} ${
                            isAllSelected
                              ? "bg-blue-500 text-white"
                              : "bg-white"
                          }`}
                        >
                          {isAllSelected && <BiCheck />}
                        </button>
                      </div>
                      {applicationStatus?.map((status) => {
                        const isSelected =
                          values.applicationStatusAccess?.findIndex(
                            (access) =>
                              access.applicationType === application.value &&
                              access.status === status.value
                          ) > -1;
                        return (
                          <div
                            key={status.value}
                            className="flex justify-center"
                          >
                            <button
                              type="button"
                              onClick={() =>
                                handleCheckbox(application.value, status.value)
                              }
                              className={`${checkboxClasses} ${
                                isSelected
                                  ? "bg-blue-500 text-white"
                                  : "bg-white"
                              }`}
                            >
                              {isSelected && <BiCheck />}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <div>
            <ATMLoadingButton type="submit" isLoading={isSubmitting}>
              Add Admin
            </ATMLoadingButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAdmin;
