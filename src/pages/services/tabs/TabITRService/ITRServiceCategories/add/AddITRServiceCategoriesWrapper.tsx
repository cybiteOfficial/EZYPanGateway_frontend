import React from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { object, string } from "yup";
import AddITRServiceCategories from "./AddITRServiceCategories";

export type AddITRServiceCategoriesInitialValues = {
    categoryName: string;
    price: string;
    priorityKey: string;
    profileCompletionRequired: boolean;
};

const AddITRServiceCategoriesWrapper = () => {
    // Form Initial Values
    const initialValues: AddITRServiceCategoriesInitialValues = {
        categoryName: "",
        price: "",
        priorityKey: "",
        profileCompletionRequired: true,
    };

    // Form Validation Schema
    const validationSchema = object({
        categoryName: string().required("Title is required"),
        price: string().required("Price is required"),
        priorityKey :string().required("Priority Key is required"),
    });

    // Form Submit Handler
    const handleSubmit = (
        values: AddITRServiceCategoriesInitialValues,
        { setSubmitting }: FormikHelpers<AddITRServiceCategoriesInitialValues>
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
                
                    <Form className="h-full">
                        <AddITRServiceCategories
                            formikProps={formikProps}
                        />
                    </Form>
            )}
        </Formik>
    );
};

export default AddITRServiceCategoriesWrapper;
