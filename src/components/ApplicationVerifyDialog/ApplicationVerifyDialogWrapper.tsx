import { Form, Formik, FormikHelpers } from "formik";
import React from "react";
import { mixed, object } from "yup";
import ApplicationVerifyDialog from "./ApplicationVerifyDialog";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

type Props = {
  onClose: () => void;
  onSubmit: (formData: any) => any;
  type:string;
};

export type VerificationInitialValues = {
  acknowledgement: any;
  remark: string;
  fileType: string;
  acknowledgementNumber: string;
};

const ApplicationVerifyDialogWrapper = ({ onClose, onSubmit ,type }: Props) => {
  // Form Validation Schema
  const validationSchema = object({
    acknowledgement: mixed().required("Acknowledgement is required"),
  });

  // Form Initial Values
  const initialValues: VerificationInitialValues = {
    acknowledgement: "",
    remark: "",
    fileType: "ACKNOWLEDGEPDF",
    acknowledgementNumber: "",
  };

  // Form Submit Handler
  const handleSubmit = (
    values: VerificationInitialValues,
    { setSubmitting }: FormikHelpers<VerificationInitialValues>
  ) => {
    const formData = new FormData();

    formData.append("requestedStatus", "VERIFY");
    formData.append("fileType", values.fileType);
    formData.append("remark", values.remark);
    formData.append("acknowledgementNumber", values.acknowledgementNumber);
    formData.append("file", values.acknowledgement);
    onSubmit(formData).then((res: any) => {
      if (res?.error) {
        setSubmitting(false);
      } else {
        setSubmitting(false);
        onClose();
      }
    });
  };

  return (
    <Dialog open={true} maxWidth="sm" fullWidth>
      <DialogTitle>
        <div className="flex justify-start text-primary-main font-bold">
          Verfiy Application
        </div>
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {(formikProps) => (
            <Form className="h-full">
              <ApplicationVerifyDialog
                formikProps={formikProps}
                onClose={onClose}
                type={type}
              />
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationVerifyDialogWrapper;
