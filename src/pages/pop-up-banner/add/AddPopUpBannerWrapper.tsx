import React, { useState } from "react";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import { Formik, Form, FormikHelpers } from "formik";
import { mixed, object } from "yup";
import AddPopUpBanner from "./AddPopUpBanner";
import {
  useGetAllPopUpBannerQuery,
  useUpdatePopUpBannerMutation,
} from "src/services/PopUpBannerService";
import { PopUpBannerListResponse } from "src/models/PopUpBanner.model";
import { showToast } from "src/utils/toaster/showToast";
import ATMPageLoader from "src/components/UI/atoms/ATMPageLoader/ATMPageLoader";

export type PopUpBannerInitialValues = {
  image: any;
  isActive:boolean
};

const AddPopUpBannerWrapper = () => {
  const [popUpBanner, setPopUpBanner] =
    useState<PopUpBannerListResponse | null>(null);
  const { data, isLoading, isFetching } = useGetAllPopUpBannerQuery("");
  

  const [updatePopUpBanner] = useUpdatePopUpBannerMutation();
  // Setting Items
  React.useEffect(() => {
    if (!isFetching && !isLoading) {
      setPopUpBanner(data?.data?.length ? data.data[0] : null);
    }
  }, [isLoading, isFetching, data]);

  // Form Initial Values
  const initialValues: PopUpBannerInitialValues = {
    image: popUpBanner?.image || "",
    isActive:popUpBanner?.isActive || false,
  };

  // Form Validation Schema
  const validationSchema = object({
    image: mixed().required("Image is required"),
  });

  // Form Submit Handler
  const handleSubmit = (
    values: PopUpBannerInitialValues,
    { setSubmitting }: FormikHelpers<PopUpBannerInitialValues>
  ) => {
    let formData = new FormData();
    formData.append("fileType", "popup-banner");
    formData.append("isActive",values.isActive.toString())
    formData.append("image", values.image);

    updatePopUpBanner({ body: formData, id: popUpBanner?._id || "" }).then(
      (res: any) => {
        if (res.error) {
          showToast("error", res?.error?.data?.message);
          setSubmitting(false);
        } else {
          if (res.data?.status) {
            showToast("success", res?.data?.message);
            setSubmitting(false);
          } else {
            showToast("error", res?.data?.message);
            setSubmitting(false);
          }
        }
      }
    );
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
            <AddPopUpBanner formikProps={formikProps} />
          </Form>
        </SideNavLayout>
      )}
    </Formik>
  );
};

export default AddPopUpBannerWrapper;
