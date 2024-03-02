import React from "react";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import AddUser from "./AddUser";
import { Formik, Form, FormikHelpers } from "formik";
import { object, string } from "yup";

export type UserFormInitialValues = {
  name: string;
  email: string;
  mobile: string;
};

const AddUserWrapper = () => {
  // Form Initial Values
  const initialValues: UserFormInitialValues = {
    name: "",
    email: "",
    mobile: "",
  };

  // Form Validation Schema
  const validationSchema = object({
    name: string().required("Name is required"),
    email: string().required("Email is required"),
    mobile: string().required("Mobile is required"),
  });

  // Form Submit Handler
  const handleSubmit = (
    values: UserFormInitialValues,
    { setSubmitting }: FormikHelpers<UserFormInitialValues>
  ) => {
    setSubmitting(true);
    setTimeout(() => {
     
      setSubmitting(false);
    }, 500);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <SideNavLayout>
          <Form className="h-full">
            <AddUser formikProps={formikProps} />
          </Form>
        </SideNavLayout>
      )}
    </Formik>
  );
};

export default AddUserWrapper;
