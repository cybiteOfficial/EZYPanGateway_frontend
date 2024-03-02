import React , { ReactNode } from 'react'
import ATMBreadCrumbs, { BreadcrumbType } from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs';
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton';
import { AoCodeInitialValues } from './EditAoCodeWrapper';
import { FormikProps } from "formik";
import { IoPersonCircleOutline } from 'react-icons/io5';
import { RxDashboard } from 'react-icons/rx';
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField';

const FormSectionHeading = ({ children }: { children: ReactNode }) => {
    return (
      <div className="border-l-[3px] border-primary-main px-3 py-2 text-slate-700 font-medium text-[15px] sticky top-0 bg-white z-50">
        {children}
      </div>
    );
  };
  type Props = {
    formikProps: FormikProps<AoCodeInitialValues>;
  };
  const breadcrumbs: BreadcrumbType[] = [
    {
      label: "AO Code List",
      path: "/ao-code-list",
      icon: IoPersonCircleOutline,
    },
    {
      label: "Edit AO Code",
      icon: RxDashboard,
    },
  ];
const EditAoCode = ({ formikProps }: Props) => {
  const { values, setFieldValue, isSubmitting } = formikProps;

  return (
    <div className="h-full py-5 px-4 flex flex-col gap-3 ">
    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
    <div className="shadow-sm flex flex-col overflow-auto  border rounded p-3 bg-white relative">
      <div className="grow overflow-auto">
        {/* Banner Information */}
        <div className="border-slate-200 pb-3">
          <FormSectionHeading>AO Code Information</FormSectionHeading>
          <div className="px-3 py-5 grid grid-cols-3 gap-5">
              {/* City */}
              <ATMTextField
                name="city"
                value={values.city}
                onChange={(e) => {
                  setFieldValue("city", e.target.value);
                }}
                label="City"
                placeholder="City"
              />
              {/* Area Code */}
              <ATMTextField
                name="areaCode"
                value={values.areaCode}
                onChange={(e) => {
                  setFieldValue("areaCode", e.target.value);
                }}
                label="Area Code"
                placeholder="Area Code"
              />

              {/* Ao Type */}
              <ATMTextField
                name="aoType"
                value={`${values.aoType || ""}`}
                onChange={(e) => {
                  setFieldValue("aoType", e.target.value);
                }}
                label="AO Type"
                placeholder="AO Type"
              />
              {/* Range Code */}
              <ATMTextField
                name="rangeCode"
                value={`${values.rangeCode || ""}`}
                onChange={(e) => {
                  setFieldValue("rangeCode", e.target.value);
                }}
                label="Range Code"
                placeholder="Range Code"
              />
              {/* AO No. */}
              <ATMTextField
                name="aoNo"
                value={`${values.aoNo || ""}`}
                onChange={(e) => {
                  setFieldValue("aoNo", e.target.value);
                }}
                label="AO No"
                placeholder="AO No"
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


export default EditAoCode
