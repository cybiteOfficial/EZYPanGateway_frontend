import React, { ReactNode } from "react";
import { FormikProps } from "formik";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import { AddITRServiceCategoriesInitialValues } from "./AddITRServiceCategoriesWrapper";
import ATMSwitchButton from "src/components/UI/atoms/formFields/ATMSwitchButton/ATMSwitchButton";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";

type Props = {
    formikProps: FormikProps<AddITRServiceCategoriesInitialValues>;
};

// Form Section Heading
const FormSectionHeading = ({ children }: { children: ReactNode }) => {
    return (
        <div className="border-l-[3px] border-primary-main px-3 py-2 text-slate-700 font-medium text-[15px] sticky top-0 bg-white z-50">
            {children}
        </div>
    );
};

const AddITRServiceCategories = ({ formikProps }: Props) => {
    const { values, setFieldValue, isSubmitting } = formikProps;

    return (
        <div className="h-full py-5 px-4 flex flex-col gap-3 ">
            <div className="shadow-sm flex flex-col overflow-auto  border rounded p-3 bg-white relative">
                <div className="grow overflow-auto">
                    {/* CATEGORY Information */}
                    <div className="border-slate-200 pb-3">
                        <FormSectionHeading>CATEGORY INFORMATION</FormSectionHeading>

                        <div className="px-3 py-5 grid grid-cols-3 gap-5">
                            {/* Category Name */}
                            <ATMTextField
                                name="categoryName"
                                value={values.categoryName}
                                onChange={(e) => {
                                    setFieldValue("categoryName", e.target.value);
                                }}
                                label="Category Name"
                                placeholder="Category Name"
                            />
                            {/* Price */}
                            <ATMTextField
                                name="price"
                                value={values.price}
                                onChange={(e) => {
                                    setFieldValue("price", e.target.value);
                                }}
                                label="Price"
                                placeholder="Enter Price"
                            />
                            {/* Priority Key */}
                            <ATMTextField
                                name="priorityKey"
                                value={values.priorityKey}
                                onChange={(e) => {
                                    setFieldValue("priorityKey", e.target.value);
                                }}
                                label="Priority Key"
                                placeholder="Priority Key"
                            />
                            {/* Profile Completion Required */}

                            <ATMSwitchButton
                                name="profileCompletionRequired"
                                value={values.profileCompletionRequired}
                                onChange={(newValue) =>
                                    setFieldValue("profileCompletionRequired", newValue)
                                }
                                label="Profile Completion Required"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <div>
                        <ATMLoadingButton type="submit" isLoading={isSubmitting}>
                            Add Category
                        </ATMLoadingButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddITRServiceCategories;
