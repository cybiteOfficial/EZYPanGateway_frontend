import { FormikProps } from "formik";
import React, { ReactNode } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import ATMBreadCrumbs, {
  BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import { DownloadFormInitialValues } from "../add/AddDownLoadFormWrapper";
import ATMFileURLDropZoneWrapper from "src/components/UI/atoms/formFields/ATMFileURlDropZone/ATMFileURLDropZoneWrapper";

type Props = {
  formikProps: FormikProps<DownloadFormInitialValues>;
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
    label: "Download Forms",
    path: "/download-form",
    icon: IoPersonCircleOutline,
  },
  {
    label: "Form Update",
    icon: RxDashboard,
  },
];
const EditDownLoadForm = ({formikProps}:Props) => {
  const {values,setFieldValue,isSubmitting} =formikProps
  return (
    <div className="h-full py-5 px-4 flex flex-col gap-3 ">
      <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
      <div className="shadow-sm flex flex-col overflow-auto  border rounded p-3 bg-white relative">
        <div className="grow overflow-auto">
          {/* Banner Information */}
          <div className="border-slate-200 pb-3">
            <FormSectionHeading>DOWNLOAD FORM INFORMATION</FormSectionHeading>

            <div className="px-3 py-5 grid grid-cols-3 gap-5">
               {/* FileUrl */}
            <ATMFileURLDropZoneWrapper
            label="File Url"
            selectedFile={values.fileUrl}
            onSelect={(newValue)=>setFieldValue("fileUrl",newValue)}
            onRemove={()=>setFieldValue("fileUrl","")}
            />
              <ATMTextField
                name="fileTitle"
                value={values.fileTitle}
                onChange={(e) => {
                  setFieldValue("fileTitle", e.target.value);
                }}
                label="File Title"
                placeholder="File Title"
              />
                   <ATMTextField
                name="description"
                value={values.description}
                onChange={(e) => {
                  setFieldValue("description", e.target.value);
                }}
                label="Description"
                placeholder="Description"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <div>
            <ATMLoadingButton type="submit" isLoading={isSubmitting}>Update</ATMLoadingButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDownLoadForm;
