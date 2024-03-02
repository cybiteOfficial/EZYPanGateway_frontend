import React from "react";
import DistributorVerifyDialog from "./DistributorVerifyDialog";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Form, Formik, FormikHelpers } from "formik";
import { object, string } from "yup";
import { showToast } from "src/utils/toaster/showToast";
import { useChangeDistributorStatusMutation } from "src/services/DistributorServices";

type Props = {
  onClose: () => void;
  distributorId: string;
};

export type FormInitialValues = {
  declaration_form: string;
};

const DistributorVerifyDialogWrapper = ({ onClose, distributorId }: Props) => {
  const [changeStatus] = useChangeDistributorStatusMutation();

  // Form Initial Values
  const initialValues: FormInitialValues = {
    declaration_form: "",
  };

  // Form Validation Schema
  const validationSchema = object({
    declaration_form: string()
  });

  //   Form Submit Handler
  const handleSubmit = (
    values: FormInitialValues,
    { setSubmitting }: FormikHelpers<FormInitialValues>
  ) => {   
    const formData = new FormData();
    formData.append("fileType",  "DECLARATION_FORM");
    formData.append("requestedStatus",  "VERIFIED");
    formData.append("file", values.declaration_form);

    changeStatus({
      body: formData,
      distributorId,
    }).then((res: any) => {
      if (res?.data?.status) {
        showToast("success", res?.data?.message);
        onClose();
        setSubmitting(true);
      }
      else {
        if (res.error) {
          showToast("error", res?.error?.data?.message);
          setSubmitting(false);
        }  else {
          showToast("error", res?.data?.message);
          setSubmitting(false);
        }
      }
    });
  };
 


  return (
    <Dialog open={true} maxWidth="sm" fullWidth>
      <DialogTitle>Verify Distributor</DialogTitle>

      <DialogContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formikProps) => (
            <Form>
              <DistributorVerifyDialog
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

export default DistributorVerifyDialogWrapper;
