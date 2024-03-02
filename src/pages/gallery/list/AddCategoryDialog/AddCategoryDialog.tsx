import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import { Formik, Form, FormikHelpers } from "formik";
import { object, string } from "yup";
import { useAddGalleryCategoryMutation } from "src/services/GalleryCategoryService";
import { showToast } from "src/utils/toaster/showToast";

type Props = {
  onClose: () => void;
};

type FormInitialValues = {
  title: string;
};

const AddCategoryDialog = ({ onClose }: Props) => {
  const [addGalleryCategory] = useAddGalleryCategoryMutation();

  // Form Initial Value
  const initialValues: FormInitialValues = {
    title: "",
  };

  //   Form Validation Schema
  const validationSchema = object({
    title: string().required("Please enter a category name"),
  });

  //   Handle Form Submit
  const handleSubmit = (
    values: FormInitialValues,
    { setSubmitting }: FormikHelpers<FormInitialValues>
  ) => {
    addGalleryCategory(values).then((res: any) => {
      if (res.error) {
        showToast("error", res?.error?.data?.message);
        setSubmitting(false);
      } else {
        if (res?.data?.status) {
          showToast("success", res?.data?.message);
          onClose();
          setSubmitting(false);
        } else {
          showToast("error", res?.data?.message);
          setSubmitting(false);
        }
      }
    });
  };

  return (
    <>
      <Dialog open={true} maxWidth="xs" fullWidth>
        <DialogTitle>
          {" "}
          <div className="text-[20px] text-secondary-main font-medium">
            {" "}
            Add New {" "}
          </div>{" "}
        </DialogTitle>

        <DialogContent>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue, isSubmitting }) => (
              <Form>
                <ATMTextField
                  name="title"
                  value={values.title}
                  onChange={(e) => {
                    setFieldValue("title", e.target.value);
                  }}
                  label="Category Name"
                  placeholder="Category Name"
                />

                <div className="flex justify-end mt-8 gap-3">
                  <ATMLoadingButton
                    className="bg-white text-secondary-main border-secondary-main"
                    onClick={onClose}
                  >
                    Cancel
                  </ATMLoadingButton>

                  <ATMLoadingButton type="submit" isLoading={isSubmitting}>
                    Add
                  </ATMLoadingButton>
                </div>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddCategoryDialog;
