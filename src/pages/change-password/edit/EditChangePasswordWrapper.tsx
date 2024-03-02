import React from "react";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import { Formik, Form, FormikHelpers } from "formik";
import { object, ref, string } from "yup";
import EditChangePassword from "./EditChangePassword";
import { useChangePasswordMutation } from "src/services/ChangePasswordService";
import { showToast } from "src/utils/toaster/showToast";

export type ChangePasswordInitialValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const EditChangePasswordWrapper = () => {
  const [changePassword] = useChangePasswordMutation();
  // Form Initial Values
  const initialValues: ChangePasswordInitialValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  // Form Validation Schema
  const validationSchema = object({
    newPassword: string()
      .min(6, "Please enter at least 6 characters")
      .required("New Password is required"),
    currentPassword: string().required("Current Password is required"),
    confirmPassword: string()
      .trim()
      .required("Please confirm your New Password")
      .when("new_password", {
        is: (val: any) => (val && val.length > 0 ? true : false),
        then: string()
          .oneOf(
            [ref("new_password")],
            "New Password and Confirm Password need to be same"
          )
          .required("Please confirm your New Password"),
      }),
  });

  // Form Submit Handler
  const handleSubmit = (
    values: ChangePasswordInitialValues,
    { setSubmitting, resetForm }: FormikHelpers<ChangePasswordInitialValues>
  ) => {
    changePassword(values)
      .then((res: any) => {
        if (res.error) {
          showToast("error", res?.error?.data?.message);
          setSubmitting(false);
        } 
        else {
            if(res?.data?.status){
                showToast("success", res?.data?.message);
                setSubmitting(false);
                resetForm()
            }
            else {
                showToast("error", res?.data?.message);
                setSubmitting(false);
            }          
        }
      })
      .catch(() => {});
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
            <EditChangePassword formikProps={formikProps} />
          </Form>
        </SideNavLayout>
      )}
    </Formik>
  );
};

export default EditChangePasswordWrapper;
