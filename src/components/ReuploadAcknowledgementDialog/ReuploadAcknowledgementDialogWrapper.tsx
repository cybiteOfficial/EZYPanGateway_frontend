import { Form, Formik, FormikHelpers } from "formik";
import React from "react";
import { mixed, object } from "yup";
import ReuploadAcknowledgementDialog from "./ReuploadAcknowledgementDialog";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

type Props = {
  onClose: () => void;
  onSubmit: (formData: any,onComplete : ()=>void) => any;
  serviceName:string
  
};

export type VerificationInitialValues = {
  acknowledgement: any;
  remark: string;
  fileType: string;
  acknowledgementNumber:string
};

const ReuploadAcknowledgementDialogWrapper = ({ onClose, onSubmit ,serviceName}: Props) => {
  // Form Validation Schema
  const validationSchema = object({
    acknowledgement: mixed().required("Acknowledgement is required"),
  });

  // Form Initial Values
  const initialValues: VerificationInitialValues = {
    acknowledgement: "",
    remark: "",
    fileType: "ACKNOWLEDGEPDF",
    acknowledgementNumber:''
  };

  // Form Submit Handler
  const handleSubmit = (
    values: VerificationInitialValues,
    { setSubmitting }: FormikHelpers<VerificationInitialValues>
  ) => {
    const formData = new FormData();

    formData.append("serviceName", serviceName);
    formData.append("fileType", values.fileType);
    formData.append("acknowledgementNumber", values?.acknowledgementNumber        );
    formData.append("file", values.acknowledgement);
    onSubmit(formData,()=>setSubmitting(false));
  };

  return (
    <Dialog open={true} maxWidth="sm" fullWidth>
      <DialogTitle>
        <div className="flex justify-start text-primary-main font-bold">
          Reupload Acknowlwdgement
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
              <ReuploadAcknowledgementDialog
              type={serviceName}
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

export default ReuploadAcknowledgementDialogWrapper;
