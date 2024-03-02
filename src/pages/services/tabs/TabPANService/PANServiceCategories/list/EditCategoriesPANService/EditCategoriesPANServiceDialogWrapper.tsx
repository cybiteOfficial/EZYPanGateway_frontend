import EditCategoriesPANServiceDialog from "./EditCategoriesPANServiceDialog";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Form, Formik, FormikHelpers } from "formik";
import { number, object, string } from "yup";
import { showToast } from "src/utils/toaster/showToast";
import { PANCategoriesListResponse } from "src/models/PANCategories.model";
import { useUpdatePanCategoryMutation } from "src/services/CategoryDialogServices";

type Props = {
  onClose: () => void;
  selectedCategory: PANCategoriesListResponse | null;
};

export type FormInitialValues = {
  categoryName: string;
  price: number;
};

const EditCategoriesPANServiceDialogWrapper = ({
  onClose,
  selectedCategory,
}: Props) => {
  const [updatePanCategory] = useUpdatePanCategoryMutation();
  // Form Initial Values
  const initialValues: FormInitialValues = {
    categoryName: selectedCategory?.categoryName || "",
    price: selectedCategory?.price || 0,
  };

  // Form Validation Schema
  const validationSchema = object({
    price: number()
      .min(0, "Price must be positive")
      .typeError("Price Must be a number")
      .required("Price is required"),
    categoryName: string().required("Category Name is required"),
  });

  //   Form Submit Handler
  const handleSubmit = (
    values: FormInitialValues,
    { setSubmitting }: FormikHelpers<FormInitialValues>
  ) => {
    updatePanCategory({ body: values, id: selectedCategory?._id || "" }).then(
      (res: any) => {
        if (res.error) {
          showToast("error", res.error.data.message);
          setSubmitting(false);
        } else {
          showToast("success", res.data.message);
          setSubmitting(false);
          onClose();
        }
      }
    );
  };

  return (
    <Dialog open={true} maxWidth="sm" fullWidth>
      <DialogTitle> Edit PAN Service Category </DialogTitle>

      <DialogContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formikProps) => (
            <Form>
              <EditCategoriesPANServiceDialog
                formikProps={formikProps}
                onClose={onClose}
              />
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategoriesPANServiceDialogWrapper;
