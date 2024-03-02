import React, { ReactNode } from "react";
import { FormikProps } from "formik";
import ATMBreadCrumbs, {
    BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import ATMPassword from "src/components/UI/atoms/formFields/ATMPassword/ATMPassword";
import { ChangePasswordInitialValues } from "./EditChangePasswordWrapper";
import { IoPersonCircleOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";

type Props = {
    formikProps: FormikProps<ChangePasswordInitialValues>;
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
        label: "Change Password",
        icon: RxDashboard,
    },
];

const EditChangePassword = ({ formikProps }: Props) => {
    const { values, setFieldValue, isSubmitting } = formikProps;

    return (
        <div className="h-full py-5 px-4 flex flex-col gap-3 ">
            <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
            <div className="shadow-sm flex flex-col overflow-auto  border rounded p-3 bg-white relative">
                <div className="grow overflow-auto">
                    {/* CHANGE PASSWORD */}
                    <div className="pb-3">
                    <FormSectionHeading>CHANGE PASSWORD</FormSectionHeading>

                        <div className="px-3 py-5 grid grid-cols-3 gap-5">
                            {/* Current Password */}
                            <ATMPassword
                                name="currentPassword"
                                value={values.currentPassword}
                                onChange={(e) => {
                                    setFieldValue("currentPassword", e.target.value);
                                }}
                                label="Current Password"
                                placeholder="Current Password"
                            />

                            {/* New Password */}
                            <ATMPassword
                                name="newPassword"
                                value={values.newPassword}
                                onChange={(e) => {
                                    setFieldValue("newPassword", e.target.value);
                                }}
                                label="New Password"
                                placeholder="New Password"
                            />
                            {/* Confirm New Password */}
                            <ATMPassword
                                name="confirmPassword"
                                value={values.confirmPassword}
                                onChange={(e) => {
                                    setFieldValue("confirmPassword", e.target.value);
                                }}
                                label="Confirm New Password"
                                placeholder="Confirm New Password"
                            />


                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <div>
                        <ATMLoadingButton type="submit" isLoading={isSubmitting}>
                            Change Password
                        </ATMLoadingButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditChangePassword;
