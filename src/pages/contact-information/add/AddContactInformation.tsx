import React, { ReactNode } from "react";
import { FormikProps } from "formik";
import ATMBreadCrumbs, {
  BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import { ContactInformationInitialValues } from "./AddContactInformationWrapper";
import { IoPersonCircleOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import ATMTextArea from "src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea";
import AuthHOC from "src/userAccess/AuthHOC";
import { AccessAction } from "src/utils/Enums/AccessAction";
import NotAuthorizedPage from "src/components/UI/NotAuthorized/NotAuthorizedPage";

type Props = {
  formikProps: FormikProps<ContactInformationInitialValues>;
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
    label: "Contact Information",
    icon: RxDashboard,
  },
];

const AddContactInformation = ({ formikProps }: Props) => {
  const { values, setFieldValue, isSubmitting } = formikProps;

  return (
    <AuthHOC
      moduleName="CONTACT_INFOS"
      action={AccessAction.LIST}
      alt={<NotAuthorizedPage/>}
    >
    <div className="h-full py-5 px-4 flex flex-col gap-3 ">
      <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
      <div className="shadow-sm flex flex-col overflow-auto  border rounded p-3 bg-white relative">
        <div className="grow overflow-auto">
          {/* CONTACT Information */}
          <div className=" pb-3">
            <FormSectionHeading>CONTACT INFORMATION</FormSectionHeading>

            <div className="px-3 py-5 grid grid-cols-3 gap-5">
              {/* Marquee Tag */}
              <div className="col-span-full">
                <ATMTextField
                  name="marqueeTag"
                  value={values.marqueeTag}
                  onChange={(e) => {
                    setFieldValue("marqueeTag", e.target.value);
                  }}
                  label="Marquee Tag"
                  placeholder="Marquee Tag"
                />
              </div>

              {/* Customer Care No. 1 */}
              <ATMTextField
                name="customerCareNo1"
                value={values.customerCareNo1}
                onChange={(e) => {
                  setFieldValue("customerCareNo1", e.target.value);
                }}
                label="Customer Care No. 1"
                placeholder="Customer Care No. 1"
              />
              {/* Customer Care No. 2 */}
              <ATMTextField
                name="customerCareNo2"
                value={values.customerCareNo2}
                onChange={(e) => {
                  setFieldValue("customerCareNo2", e.target.value);
                }}
                label="Customer Care No. 2"
                placeholder="Customer Care No. 2"
              />
              {/* Customer Care No. 3 */}
              <ATMTextField
                name="customerCareNo3"
                value={values.customerCareNo3}
                onChange={(e) => {
                  setFieldValue("customerCareNo3", e.target.value);
                }}
                label="Customer Care No. 3"
                placeholder="Customer Care No. 3"
              />

              {/* Customer Care No. 4 */}
              <ATMTextField
                name="customerCareNo4"
                value={values.customerCareNo4}
                onChange={(e) => {
                  setFieldValue("customerCareNo4", e.target.value);
                }}
                label="Customer Care No. 4"
                placeholder="Customer Care No. 4"
              />
              {/* Email */}
              <ATMTextField
                name="email"
                value={`${values.email || ""}`}
                onChange={(e) => {
                  setFieldValue("email", e.target.value);
                }}
                label="Email"
                placeholder="Email"
              />

              {/* Whatsapp No. (Login Page) */}
              <ATMTextField
                name="loginPageWhatsappNumber"
                value={values.loginPageWhatsappNumber}
                onChange={(e) => {
                  setFieldValue("loginPageWhatsappNumber", e.target.value);
                }}
                label="Whatsapp No. (Login Page)"
                placeholder="Whatsapp No. (Login Page)"
              />

              {/* Contact Person */}
              <ATMTextField
                name="contactPerson"
                value={values.contactPerson}
                onChange={(e) => {
                  setFieldValue("contactPerson", e.target.value);
                }}
                label="Contact Person"
                placeholder="Contact Person"
              />

              {/* Registration No. */}
              <ATMTextField
                name="registrationNumber"
                value={values.registrationNumber}
                onChange={(e) => {
                  setFieldValue("registrationNumber", e.target.value);
                }}
                label="Registration No."
                placeholder="Registration No."
              />

              {/* Pan Number */}
              <ATMTextField
                name="panNumber"
                value={values.panNumber}
                onChange={(e) => {
                  setFieldValue("panNumber", e.target.value);
                }}
                label="Pan Number"
                placeholder="Pan Number"
              />

              {/* Contact No. (Login Page) */}
              <ATMTextField
                name="loginPageContactNumber"
                value={values.loginPageContactNumber}
                onChange={(e) => {
                  setFieldValue("loginPageContactNumber", e.target.value);
                }}
                label="Contact No. (Login Page)"
                placeholder="Contact No. (Login Page)"
              />

              {/* Email (Login Page) */}
              <ATMTextField
                name="loginPageEmailId"
                value={values.loginPageEmailId}
                onChange={(e) => {
                  setFieldValue("loginPageEmailId", e.target.value);
                }}
                label="Email (Login Page)"
                placeholder="Email (Login Page)"
              />

              {/* address  */}
              <ATMTextArea
                name="address"
                value={`${values.address || ""}`}
                onChange={(newValue) => {
                  setFieldValue("address", newValue);
                }}
                label="Address"
                placeholder="Address"
              />
              {/* Map Link Time */}
              <ATMTextField
                name="mapLink"
                value={`${values.mapLink || ""}`}
                onChange={(e) => {
                  setFieldValue("mapLink", e.target.value);
                }}
                label="Map Link"
                placeholder="Map Link"
              />
            </div>
          </div>
        </div>
        <AuthHOC  moduleName="CONTACT_INFOS" action={AccessAction.EDIT}>
          <div className="flex justify-end">
            <div>
              <ATMLoadingButton type="submit" isLoading={isSubmitting}>
                Update
              </ATMLoadingButton>
            </div>
          </div>
        </AuthHOC>
      </div>
    </div>
  </AuthHOC>
  );
};

export default AddContactInformation;
