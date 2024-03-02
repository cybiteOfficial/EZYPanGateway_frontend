import React, { useEffect, useState } from "react";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import { Formik, Form, FormikHelpers } from "formik";
import { mixed, object, string } from "yup";
import AddGallery from "./AddGallery";
import { SelectOption } from "src/models/FormField/FormField.model";
import {
  useAddGalleryImageMutation,
} from "src/services/GalleryService";
import { showToast } from "src/utils/toaster/showToast";
import {
  useGetAllGalleryCategoryQuery,
} from "src/services/GalleryCategoryService";
import { GalleryCategoryListResponse } from "src/models/GalleryCategory.model";
import { useNavigate } from "react-router-dom";

export type GalleryInitialValues = {
  title: string;
  description: string;
  category: string;
  image: any;
};

export type DropdownOptions = {
  galleryCategoryOptions: SelectOption[];
};

const AddGalleryWrapper = () => {
  const navigate = useNavigate();
  // const [addImage, setaddImage] = useState<GalleryListResponse | null>(null)
  const { data, isFetching, isLoading } = useGetAllGalleryCategoryQuery("");
  const [galleryCategoryData, setgalleryCategoryData] = useState<
    GalleryCategoryListResponse[]
  >([]);

  const [addGalleryImage] = useAddGalleryImageMutation();
  // Form Initial Values
  const initialValues: GalleryInitialValues = {
    title: "",
    description: "",
    category: "",
    image: "",
  };
  useEffect(() => {
    if (!isFetching || !isLoading) {
      setgalleryCategoryData(data?.data || []);
    }
  }, [data, isFetching, isLoading]);

  // Form Validation Schema
  const validationSchema = object({
    title: string().required("Title is required"),
    description: string().required("Description is required"),
    category: string().required("Please select category"),
    image: mixed().required("Image is required"),
  });

  // Form Submit Handler
  const handleSubmit = (
    values: GalleryInitialValues,
    { setSubmitting }: FormikHelpers<GalleryInitialValues>
  ) => {
    let formData = new FormData();
    formData.append("fileType", "add-image");
    formData.append("image", values.image);
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("category", values.category);
    setSubmitting(true);

    addGalleryImage(formData).then((res: any) => {
      if (res.error) {
        showToast("error", res?.error?.data?.message);
        setSubmitting(false);
      } else {
        showToast("success", res?.data?.message);
        navigate("/gallery");
        setSubmitting(false);
      }
    });
   
  };

  // Dropdown Option
  const dropdownOptions = {
    galleryCategoryOptions: galleryCategoryData?.map((category) => {
      return {
        label: category.title,
        value: category._id,
      };
    }),
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
            <AddGallery
              formikProps={formikProps}
              dropdownOptions={dropdownOptions}
            />
          </Form>
        </SideNavLayout>
      )}
    </Formik>
  );
};

export default AddGalleryWrapper;
