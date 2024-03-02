import React, { ReactNode } from "react";
import { FormikProps } from "formik";
import ATMBreadCrumbs, {
  BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import {
  DropdownOptions,
  EditSubscriptionInitialValues,
} from "./EditSubscriptionWrapper";
import { IoPersonCircleOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";

type Props = {
  formikProps: FormikProps<EditSubscriptionInitialValues>;
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
    label: "Subscription List",
    path: "/subscription",
    icon: IoPersonCircleOutline,
  },
  {
    label: "Edit Subscription List",
    icon: RxDashboard,
  },
];

const EditSubscription = ({ formikProps, dropdownOptions }: Props) => {
  const { values, setFieldValue, isSubmitting } = formikProps;

  return (
    <div className="h-full py-5 px-4 flex flex-col gap-3 ">
      <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
      <div className="shadow-sm flex flex-col overflow-auto  border rounded p-3 bg-white relative">
        <div className="grow overflow-auto">
          {/* SUBSCRIPTION MESSAGE Information */}
          <div className=" pb-3">
            <FormSectionHeading>
              SUBSCRIPTION MESSAGE INFORMATION
            </FormSectionHeading>

            <div className="px-3 py-5 grid grid-cols-3 gap-5">

              {/* Plan */}

              <ATMTextField
                name="planName"
                value={values.planName}
                className=" bg-stone-200 rounded"
                disabled = {true}
                onChange={(e) => {
                  setFieldValue("planName", e.target.value);
                }}
                label="Plan Name"
                placeholder="Plan Name"
              />
              
              {/* Duration */}
              <ATMTextField
                name="durationIndays"
                type="number"
                value={values.durationIndays?.toString()}
                onChange={(e) => {
                  setFieldValue("durationIndays", e.target.value);
                }}
                label="Duration in Days"
                placeholder="Duration in Days"
              />
              <ATMTextField
                name="durationInWords"
                value={values.durationInWords}
                onChange={(e) => {
                  setFieldValue("durationInWords", e.target.value);
                }}
                label="Duration in Words"
                placeholder="Duration in Words"
              />
              {/* Amount */}

              <ATMTextField
                name="amount"
                value={values.amount}
                onChange={(e) => {
                  setFieldValue("amount", e.target.value);
                }}
                label="Amount"
                placeholder="Amount"
              />
              
              {/* description */}

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
            <ATMLoadingButton type="submit" isLoading={isSubmitting}>
              Update
            </ATMLoadingButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSubscription;
