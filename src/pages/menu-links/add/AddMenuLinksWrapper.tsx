import React from "react";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import { Formik, Form, FormikHelpers } from "formik";
import { number, object, string } from "yup";
import AddMenuLinks from "./AddMenuLinks";
import { useAddMenuLinksMutation } from "src/services/MenulinksServices";
import { showToast } from "src/utils/toaster/showToast";
import { useNavigate } from "react-router-dom";

export type MenuLinksInitialValues = {
  menuName: string;
  link: string;
  order: number | null;
};

const AddMenuLinksWrapper = () => {
  const navigate = useNavigate();
  const [addMenuLink] = useAddMenuLinksMutation();

  // Form Initial Values
  const initialValues: MenuLinksInitialValues = {
    menuName: "",
    link: "",
    order: null,
  };

  // Form Validation Schema
  const validationSchema = object({
    menuName: string().required("Menu Name is required"),
    link: string().url('Please enter a valid URL').required("Link is required"),
    order: number()
      .typeError("Order must be number")
      .min(1, "Order must be greater than 0")
      .required("Order is required"),
  });

  // Form Submit Handler
  const handleSubmit = (
    values: MenuLinksInitialValues,
    { setSubmitting }: FormikHelpers<MenuLinksInitialValues>
  ) => {
    addMenuLink(values).then((res: any) => {
      if (res.error) {
        showToast("error", res?.error?.data?.message);
        setSubmitting(false);
      } else {
        showToast("success", res?.data?.message);
        navigate("/menu-links");
        setSubmitting(false);
      }
    });
   
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <SideNavLayout>
          <Form className="h-full" noValidate>
            <AddMenuLinks formikProps={formikProps} />
          </Form>
        </SideNavLayout>
      )}
    </Formik>
  );
};

export default AddMenuLinksWrapper;
