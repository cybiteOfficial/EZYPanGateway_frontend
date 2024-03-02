import React, { ReactNode } from "react";
import { FormikProps } from "formik";
import ATMBreadCrumbs, {
  BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import { IoImageOutline } from "react-icons/io5";
import ATMHTMLEditor from "src/components/UI/atoms/formFields/ATMHTMLEditor/ATMHTMLEditor";
import { FAQInitialValues } from "./EditFAQWrapper";

type Props = {
  formikProps: FormikProps<FAQInitialValues>;
  isUpdating: boolean;
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
    label: "FAQ",
    path: "/FAQ",
  },
  {
    label: "Edit FAQ ",
    icon: IoImageOutline,
  },
];

const EditFAQ = ({ formikProps, isUpdating }: Props) => {
  const { values, setFieldValue } = formikProps;

  return (
    <div className="h-full py-5 px-4 flex flex-col gap-3">
      {/* Breadcrumbs */}
      <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
      <div className="shadow-sm flex flex-col overflow-auto  border rounded p-3 bg-white relative">
        <div className="grow overflow-auto">
          {/* FAQ Information */}
          <div className=" pb-3">
            <FormSectionHeading>FAQ INFORMATION</FormSectionHeading>
            <div className="px-3 py-5  gap-5">
              {/* Question */}
              <ATMTextField
                name="question"
                value={values.question}
                onChange={(e) => {
                  setFieldValue("question", e.target.value);
                }}
                label="Question"
                placeholder="Question"
              />
            </div>
            <div className="px-3 py-2 grid grid-cols-1 gap-5">
              <label className=" px-1 font-medium text-primary-main text-sm">
                Answer
              </label>
              <ATMHTMLEditor
                name="answer"
                value={values.answer}
                onChange={(newValue) => {
                  setFieldValue("answer", newValue);
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <div>
            <ATMLoadingButton type="submit" isLoading={isUpdating}>
              Update
            </ATMLoadingButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditFAQ;
