import React, { useState, useEffect } from "react";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import { Formik, Form, FormikHelpers } from "formik";
import { number, object, string } from "yup";
import EditMenuLink from "./EditMenuLink";
import {
  useGetMenuLinksByIdQuery,
  useUpdateMenuLinksMutation,
} from "src/services/MenulinksServices";
import { showToast } from "src/utils/toaster/showToast";
import { useNavigate, useParams } from "react-router-dom";
import {  MenuLinksListResponse } from "src/models/MenuLinks.model";
import ATMPageLoader from "src/components/UI/atoms/ATMPageLoader/ATMPageLoader";

export type MenuLinksInitialValues = {
  menuName: string;
  link: string;
  order: number;
};

const EditMenuLinkWrapper = () => {
  const { id = "" } = useParams();

  const navigate = useNavigate();
  const [updateMenuLink] = useUpdateMenuLinksMutation();
  const { data, isLoading, isFetching } = useGetMenuLinksByIdQuery(id);
  const [menuLinkWrapper, setMenuLinkWrapper] =
  useState<MenuLinksListResponse | null>(null);

  const initialValues : MenuLinksInitialValues = {
    menuName: menuLinkWrapper?.menuName || "",
    link: menuLinkWrapper?.link || "",
    order: menuLinkWrapper?.order || 1,
  };

  useEffect(() => {
    if (!isFetching && !isLoading) {
      setMenuLinkWrapper(data?.data);
    }
  }, [isLoading, isFetching, data]);

  // Form Validation Schema
  const validationSchema = object({
    menuName: string().required("Menu Name is required"),
    link: string().url("Please enter a valid URL").required("Link is required"),
    order: number()
      .typeError("Order must be number")
      .min(1, "Order must be greater than 0")
      .required("Order is required"),
  });

  // Form submit handler
  const handleSubmit = (
    values: MenuLinksInitialValues,
    { setSubmitting }: FormikHelpers<MenuLinksInitialValues>
  ) => {
    updateMenuLink({
      id: id,
      body: values,
    })
    .then((res: any) => {
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
          <Form className="h-full" noValidate>
            <EditMenuLink formikProps={formikProps} />
          </Form>
        </SideNavLayout>
      )}
    </Formik>
  );
};

export default EditMenuLinkWrapper;
