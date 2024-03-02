import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import React from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { object, string } from "yup";
import AddContactInformation from "./AddContactInformation";
import {
  useGetContactInformationListQuery,
  useUpdateContactInformationMutation,
} from "src/services/ContactInformationService";
import { useState } from "react";
import { HeaderContactInformationListResponse } from "src/models/HeaderContactInformation.model";
import { showToast } from "src/utils/toaster/showToast";
import ATMPageLoader from "src/components/UI/atoms/ATMPageLoader/ATMPageLoader";
import { indianPhoneRegex } from "src/utils/regularExpression";

export type ContactInformationInitialValues = {
  marqueeTag: string;
  customerCareNo1: string;
  customerCareNo2: string;
  customerCareNo3: string;
  customerCareNo4: string;
  email: string;
  address: string;
  mapLink: string;
  contactPerson: string;
  registrationNumber: string;
  panNumber: string;
  loginPageContactNumber: string;
  loginPageEmailId: string;
  loginPageWhatsappNumber: string;
};

const AddContactInformationWrapper = () => {
  const [contactInfomationData, setContactInfomation] =
    useState<HeaderContactInformationListResponse | null>(null);
  const { data, isFetching, isLoading } = useGetContactInformationListQuery("");
  const [UpdateContactInformation] = useUpdateContactInformationMutation();

  // Setting Items
  React.useEffect(() => {
    if (!isFetching && !isLoading) {
      setContactInfomation(data?.data?.length ? data.data[0] : null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isFetching, data]);
  // Form Initial Values
  const initialValues: ContactInformationInitialValues = {
    marqueeTag: contactInfomationData?.marqueeTag || "",
    customerCareNo1: contactInfomationData?.customerCareNo1 || "",
    customerCareNo2: contactInfomationData?.customerCareNo2 || "",
    customerCareNo3: contactInfomationData?.customerCareNo3 || "",
    customerCareNo4: contactInfomationData?.customerCareNo4 || "",
    email: contactInfomationData?.email || "",
    address: contactInfomationData?.address || "",
    mapLink: contactInfomationData?.mapLink || "",
    contactPerson: contactInfomationData?.contactPerson || "",
    registrationNumber: contactInfomationData?.registrationNumber || "",
    panNumber: contactInfomationData?.panNumber || "",
    loginPageContactNumber: contactInfomationData?.loginPageContactNumber || "",
    loginPageEmailId: contactInfomationData?.loginPageEmailId || "",
    loginPageWhatsappNumber:
      contactInfomationData?.loginPageWhatsappNumber || "",
  };

  // Form Validation Schema
  const validationSchema = object({
    marqueeTag: string().required("Marquee Tag is required"),
    email: string()
      .email("Email must be valid")
      .trim()
      .required("Email is required"),
    customerCareNo1: string()
      .trim()
      .matches(indianPhoneRegex, "Phone Number is Invalid")
      .nullable()
      .required("Phone Number  is required"),
    customerCareNo2: string()
      .trim()
      .matches(indianPhoneRegex, "Phone Number is Invalid")
      .nullable()
      .required("Phone Number  is required"),
    customerCareNo3: string()
      .trim()
      .matches(indianPhoneRegex, "Phone Number is Invalid")
      .nullable()
      .required("Phone Number  is required"),
    customerCareNo4: string()
      .trim()
      .matches(indianPhoneRegex, "Phone Number is Invalid")
      .nullable()
      .required("Phone Number  is required"),
    address: string().required("Address is required"),
    mapLink: string()
      .url("Please enter a valid url")
      .required("Map Link is required"),
  });

  // Form Submit Handler
  const handleSubmit = (
    values: ContactInformationInitialValues,
    { setSubmitting }: FormikHelpers<ContactInformationInitialValues>
  ) => {
    setSubmitting(true);
    UpdateContactInformation({
      body: values,
      id: contactInfomationData?._id || "",
    })
      .then((res: any) => {
        if (res?.error) {
          setSubmitting(false);
          showToast("error", res?.error?.data?.message);
        } else {
          setSubmitting(false);
          showToast("success", res?.data?.message);
        }
      })
      .catch(() => {});
  };
  if (isFetching || isLoading) {
    return <ATMPageLoader />;
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <SideNavLayout>
          <Form className="h-full">
            <AddContactInformation formikProps={formikProps} />
          </Form>
        </SideNavLayout>
      )}
    </Formik>
  );
};

export default AddContactInformationWrapper;
