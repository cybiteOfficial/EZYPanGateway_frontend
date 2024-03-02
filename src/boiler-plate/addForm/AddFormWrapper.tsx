import React from "react";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import { Formik, Form, FormikHelpers } from "formik";
import { mixed, object, string } from "yup";
import { SelectOption } from "src/models/FormField/FormField.model";
import AddForm from "./AddForm";

export type AddFormInitialValues = {
  title: string;
  description: string;
  category: string;
  image: any;
};

export type DropdownOptions = {
  galleryCategoryOptions: SelectOption[];
};

const galleryCategoryOptions = [
  {
    label: "Gallery Category 1",
    value: "cat1",
  },
  {
    label: "Gallery Category 2",
    value: "cat2",
  },
];

const AddFormWrapper = () => {
  // Form Initial Values
  const initialValues: AddFormInitialValues = {
    title: "",
    description: "",
    category: "",
    image: "https://picsum.photos/200/300",
  };

  // Form Validation Schema
  const validationSchema = object({
    title: string().required("Title is required"),
    description: string().required("Description is required"),
    category: string().required("Please select category"),
    image: mixed().required("Image is required"),
  });

  // Form Submit Handler
  const handleSubmit = (
    values: AddFormInitialValues,
    { setSubmitting }: FormikHelpers<AddFormInitialValues>
  ) => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
    }, 500);
  };

  // Dropdown Option
  const dropdownOptions = {
    galleryCategoryOptions,
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
            <AddForm
              formikProps={formikProps}
              dropdownOptions={dropdownOptions}
            />
          </Form>
        </SideNavLayout>
      )}
    </Formik>
  );
};

export default AddFormWrapper;
