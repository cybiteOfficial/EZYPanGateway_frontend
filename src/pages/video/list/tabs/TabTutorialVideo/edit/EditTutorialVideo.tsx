import React, { ReactNode } from "react";
import { FormikProps } from "formik";
import ATMBreadCrumbs, {
  BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import { EditTutorialVideoInitialValues } from "./EditTutorialVideoWrapper";
import { IoImageOutline, IoPerson } from "react-icons/io5";
import ATMSwitchButton from "src/components/UI/atoms/formFields/ATMSwitchButton/ATMSwitchButton";

type Props = {
  formikProps: FormikProps<EditTutorialVideoInitialValues>;
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
    label: "Tutorial Videos",
    path: "/videos/tutorial-videos",
    icon: IoPerson,
  },
  {
    label: "Edit Tutorial Video",
    icon: IoImageOutline,
  },
];

const EditTutorialVideo = ({ formikProps }: Props) => {
  const { values, setFieldValue, isSubmitting } = formikProps;

  return (
    <div className="h-full py-5 px-4 flex flex-col gap-3 ">
      <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
      <div className="shadow-sm flex flex-col overflow-auto  border rounded p-3 bg-white relative">
        <div className="grow overflow-auto">
          {/* VIDEO Information */}
          <div className=" border-slate-200 pb-3">
            <FormSectionHeading>TUTORIAL VIDEO INFORMATION</FormSectionHeading>

            <div className="px-3 py-5 grid grid-cols-3 gap-6">
              {/* Video Link */}
              <ATMTextField
                name="videoLink"
                value={values.videoLink}
                onChange={(e) => {
                  setFieldValue("videoLink", e.target.value);
                }}
                label="Video Link"
                placeholder="Video Link"
              />
                {/* Video Title */}
                <ATMTextField
                name="videoHeading"
                value={values.videoHeading}
                onChange={(e) => {
                  setFieldValue("videoHeading", e.target.value);
                }}
                label=" Video Title"
                placeholder=" Video Title"
              />
              {/* Order */}
              <ATMTextField
                name="order"
                min={1}
                type="number"
                value={values.order?.toString()}
                onChange={(e) => {
                  setFieldValue("order", e.target.value);
                }}
                label="Order"
                placeholder="Order"
              />
               {/* active */}

              <ATMSwitchButton
                name="showOnMobile"
                value={values.showOnMobile}
                onChange={(newValue) =>
                  setFieldValue("showOnMobile", newValue)
                }
                label="Active"
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

export default EditTutorialVideo;
