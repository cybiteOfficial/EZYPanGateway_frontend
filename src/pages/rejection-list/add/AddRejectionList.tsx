import React, { ReactNode } from "react";
import { FormikProps } from "formik";
import ATMBreadCrumbs, {
  BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import { RejectionInitialValues } from "./AddRejectionListWrapper";
import { IoPersonCircleOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";

type Props = {
  formikProps: FormikProps<RejectionInitialValues>;
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
    label: "Rejection List",
    path: "/rejection-list",
    icon: IoPersonCircleOutline,
  },
  {
    label: "Add Rejection List",
    icon: RxDashboard,
  },
];

const AddRejectionList = ({ formikProps }: Props) => {
  const { values, setFieldValue, isSubmitting } = formikProps;

  return (
    <div className="h-full py-5 px-4 flex flex-col gap-3 ">
      <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
      <div className="shadow-sm flex flex-col overflow-auto  border rounded p-3 bg-white relative">
        <div className="grow overflow-auto">
          {/* REJECTION MESSAGE Information */}
          <div className=" pb-3">
            <FormSectionHeading>
              REJECTION MESSAGE INFORMATION
            </FormSectionHeading>

            <div className="px-3 py-5 grid grid-cols-3 gap-5">
              {/* Rejection Message */}
              <div style={{ flex: "2 1 0" }}>
                <ATMTextField
                  name="rejectionMsg"
                  value={values.rejectionMsg}
                  onChange={(e) => {
                    setFieldValue("rejectionMsg", e.target.value);
                  }}
                  label="Rejection Message"
                  placeholder="Rejection Message"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <div>
            <ATMLoadingButton type="submit" isLoading={isSubmitting}>
              Submit
            </ATMLoadingButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRejectionList;
