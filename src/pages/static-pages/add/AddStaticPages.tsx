import React from 'react'
import { FormikProps } from "formik";
import  { ReactNode } from "react";
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { RxDashboard } from 'react-icons/rx';
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField';
import ATMBreadCrumbs, { BreadcrumbType } from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs';
// import ATMFileURLDropZoneWrapper from 'src/components/UI/atoms/formFields/ATMFileURlDropZone/ATMFileURLDropZoneWrapper';
import { StaticPagesInitialValues } from './AddStaticPagesWrapper';
import ATMHTMLEditor from 'src/components/UI/atoms/formFields/ATMHTMLEditor/ATMHTMLEditor';


type Props = {
    formikProps: FormikProps<StaticPagesInitialValues>
}
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
      label: "Static Pages",
      path: "/static-page",
      icon: IoPersonCircleOutline,
    },
    {
      label: "Static Pages",
      icon: RxDashboard,
    },
  ];
const AddStaticPages = ({formikProps}:Props) => {
    const {values,setFieldValue,isSubmitting} =formikProps;
  return (
    <div className="h-full py-5 px-4 flex flex-col gap-3 ">
    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
    <div className="shadow-sm flex flex-col overflow-auto  border rounded p-3 bg-white relative">
      <div className="grow overflow-auto">
        {/*Add Static Pages*/}
        <div className=" pb-3">
          <FormSectionHeading>Add  Static Pages</FormSectionHeading>
          <div className="px-3 py-5 grid grid-cols-3 gap-5">                

            {/*Name*/}
            <ATMTextField
              name="name"
              value={`${values.name || ""}`}
              onChange={(e) => {
                setFieldValue("name", e.target.value);
              }}
              label="Name"
              placeholder="Name"
            />
           
              {/* Url */}
              <ATMTextField
              name="url"
              value={`${values.url || ""}`}
              onChange={(e) => {
                setFieldValue("url",e.currentTarget.value.replace(/[\W_]+/g, "-") );
                
              }}

              label="Url"
              placeholder="Url"
            />
          </div>
          <div className="px-3 py-2 grid grid-cols-1 gap-5">
                <label className=" px-1 font-medium text-primary-main text-sm">
                  PAGE CONTENT
                </label>
                <ATMHTMLEditor
                  name="pageContent"
                  value={values.pageContent}
                  onChange={(newValue) => {
                    setFieldValue("pageContent", newValue);
                  }}
                />
            </div>
        </div>
      </div>

      <div className="flex justify-end">
        <div>
          <ATMLoadingButton type="submit" 
          isLoading={isSubmitting}
          loadingText={"Updating..."}
          >
            Add Static Pages
          </ATMLoadingButton>
        </div>
      </div>
    </div>
  </div>
  )
}

export default AddStaticPages
