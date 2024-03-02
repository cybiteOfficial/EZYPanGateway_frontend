import React from "react";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import { Formik, Form, FormikHelpers } from "formik";
import { mixed, object } from "yup";
import Banner from "./AddBanner";
import { useAddBannerMutation } from "src/services/BannerServices";
import { useNavigate } from "react-router-dom";
import { showToast } from "src/utils/toaster/showToast";

export type BannerInitialValues = {
  image: any;
  fileType: string;
};

const AddBannerWrapper = () => {


  const navigate = useNavigate()
  const [addBanner] = useAddBannerMutation();

  // Form Initial Values
  const initialValues: BannerInitialValues = {
    image: "",
    fileType: "BANNER",
  };

  // Form Validation Schema
  const validationSchema = object({
    image: mixed().required("Image is required"),
  });

  // Form Submit Handler
  const handleSubmit = (
    values: BannerInitialValues,
    { setSubmitting }: FormikHelpers<BannerInitialValues>
  ) => {
    let formData = new FormData();
    formData.append("fileType", values.fileType);
    formData.append("image", values.image as File);
    addBanner(formData)
    .then((res: any) => {
      if (res.error) {
        showToast("error", res?.error?.data?.message);
        setSubmitting(false);
      } else {
        showToast("success", res?.data?.message);
        navigate("/banner");
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
          <Form className="h-full">
            <Banner
              formikProps={formikProps}
            />
          </Form>
        </SideNavLayout>
      )}
    </Formik>
  );
};

export default AddBannerWrapper;
