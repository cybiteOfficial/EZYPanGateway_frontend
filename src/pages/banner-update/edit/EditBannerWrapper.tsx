import React, { useState, useEffect } from "react";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import { Formik, Form, FormikHelpers } from "formik";
import { mixed, object } from "yup";
import EditBanner from "./EditBanner";
import {
  useGetBannerByIdQuery,
  useUpdateBannerMutation,
} from "src/services/BannerServices";
import { useNavigate, useParams } from "react-router-dom";
import { showToast } from "src/utils/toaster/showToast";
import { bannerOnelist } from "src/models/BannerUpdate.model";
import ATMPageLoader from "src/components/UI/atoms/ATMPageLoader/ATMPageLoader";


export type BannerInitialValues = {
  image: any;
  fileType: string;
};

const EditBannerWrapper = () => {
  const { id = "" } = useParams();

  const navigate = useNavigate();
  const [updateBanner] = useUpdateBannerMutation();
  const { data, isLoading, isFetching } = useGetBannerByIdQuery(id);
  const initialData: BannerInitialValues = {
    image: "",
    fileType: "BANNER",
  };
  // Form Initial Values
  const [intialValues, setInitialValues] = useState(initialData);
  useEffect(() => {
    if (!isFetching && !isLoading) {
      const dataBandataAppVideone = data?.data;
      let jobDataList: bannerOnelist = {
        image: dataBandataAppVideone?.image,
        fileType: dataBandataAppVideone?.fileType,
      };
      setInitialValues(jobDataList);
    }
  }, [isLoading, isFetching, data]);

  // Form Validation Schema
  const validationSchema = object({
    image: mixed().required("Image is required"),
  });

  // Form Submit Handler
  const handleSubmit = (
    values: BannerInitialValues,
    { setSubmitting }: FormikHelpers<BannerInitialValues>
  ) => {
    const formData = new FormData();
    formData.append("fileType", values.fileType);
    formData.append("image", values.image as File);
    
    updateBanner({
      id: id,
      body: formData,
    })
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
  if (isFetching || isLoading) {
    return <ATMPageLoader />;
  }
  return (
    <Formik
      enableReinitialize
      initialValues={intialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <SideNavLayout>
          <Form className="h-full">
            <EditBanner formikProps={formikProps} />
          </Form>
        </SideNavLayout>
      )}
    </Formik>
  );
};

export default EditBannerWrapper;
