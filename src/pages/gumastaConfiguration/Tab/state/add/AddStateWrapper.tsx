import React from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { object, string } from "yup";
import AddState from "./AddState";
import { showToast } from "src/utils/toaster/showToast";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useAddStateMutation } from "src/services/GumastaConfigService";

export type addStateValueTypes = {
  state: string;
};
type Props = {
  onClose: () => void;
};

const AddStateWrapper = ({ onClose }: Props) => {
  const [addState] = useAddStateMutation();

  // Form Initial Values
  const initialValues: addStateValueTypes = {
    state: "",
  };

  // Form Validation Schema
  const validationSchema = object({
    state: string().required("state is required"),
  });

  // Form Submit Handler
  const handleSubmit = (
    values: addStateValueTypes,
    { setSubmitting }: FormikHelpers<addStateValueTypes>
  ) => {
    addState(values).then((res: any) => {
      if (res.error) {
        showToast("error", res?.error?.data?.message);
        setSubmitting(false);
      } else {
        showToast("success", res?.data?.message);
        onClose();
        setSubmitting(false);
      }
    });
  };

  return (
    <Dialog open={true} maxWidth="sm" fullWidth>
      <DialogTitle>Add State</DialogTitle>

      <DialogContent>
        <Formik 
        enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formikProps) => (
            <Form className="h-full">
              <AddState onClose={onClose} formikProps={formikProps} />
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default AddStateWrapper;
