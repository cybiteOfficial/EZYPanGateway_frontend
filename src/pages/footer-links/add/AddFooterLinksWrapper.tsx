import React, { useEffect, useState } from "react";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import { Formik, Form, FormikHelpers } from "formik";
import { object, string, array, number } from "yup";
import AddForm from "./AddFooterLinks";
import * as Yup from "yup";
import {
  useGetAllFooterQuery,
  useUpdateFooterMutation,
} from "src/services/FooterLinkService";
import { showToast } from "src/utils/toaster/showToast";
import { useNavigate } from "react-router-dom";
import ATMPageLoader from "src/components/UI/atoms/ATMPageLoader/ATMPageLoader";

export type FooterLinksInitialValues = {
  footerlinks: {
    categoryName: string;
    order: number | null;
    links: {
      name: string;
      url: string;
    }[];
  }[];
};

const AddFooterLinksWrapper = () => {
  const navigate = useNavigate();
  const [footerLinksData, setFooterLinksData] = useState([]);
  const {
    data: footerLinks,
    isLoading: isLoadingFooterLinks,
    isFetching: isFetchingFooterLinks,
  } = useGetAllFooterQuery("");
  // Form Initial Values

  const [UpdateFooterLink] = useUpdateFooterMutation();

  useEffect(() => {
    if (footerLinks?.data?.length > 0) {
      setFooterLinksData(footerLinks.data[0].footerlinks);
    }
  }, [footerLinks]);

  const initialValues: FooterLinksInitialValues = {
    footerlinks: footerLinksData?.map(
      (link: {
        categoryName: any;
        order: any;
        links: { name: any; url: any }[];
      }) => ({
        categoryName: link.categoryName,
        order: link.order,
        links: link?.links?.map((linkItem: { name: any; url: any }) => ({
          name: linkItem.name,
          url: linkItem.url,
        })),
      })
    ),
  };

  // Form Validation Schema
  const validationSchema = object({
    footerlinks: array().of(
      Yup.object().shape({
        categoryName: string().required("Category Name is required"),
        links: array().of(
          object().shape({
            name: string().required("Name is required"),
            url: string()
              .url("Please enter valid url")
              .required("Link is required"),
          })
        ),
        order: number()
          .typeError("Order must be number")
          .min(1, "Order must be greater than 0")
          .required("Order is required"),
      })
    ),
  });

  // Form Submit Handler
  const handleSubmit = (
    values: FooterLinksInitialValues,
    { setSubmitting }: FormikHelpers<FooterLinksInitialValues>
  ) => {
    const id = footerLinks?.data[0]._id; // get the id from the footerLinks data
    UpdateFooterLink({ id, body: { footerlinks: values.footerlinks } }).then(
      (res: any) => {
        if (res?.error) {
          setSubmitting(false);
          showToast("error", res?.error?.data?.message);
        } else {
          setSubmitting(false);
          showToast("success", res?.data?.message);
          navigate("/footer-links");
        }
      }
    );
  };
  if (isFetchingFooterLinks || isLoadingFooterLinks) {
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
            <AddForm formikProps={formikProps} />
          </Form>
        </SideNavLayout>
      )}
    </Formik>
  );
};

export default AddFooterLinksWrapper;
