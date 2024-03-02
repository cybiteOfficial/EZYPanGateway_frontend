import React from "react";
import RejectionReasonDialog from "./RejectionReasonDialog";
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
  rejectionReason: string;
};

const RejectionReasonDialogWrapper = ({ onClose, distributorId }: Props) => {
  const [changeStatus] = useChangeDistributorStatusMutation();

  // Form Initial Values
  const initialValues: FormInitialValues = {
    rejectionReason: "",
  };

  // Form Validation Schema
  const validationSchema = object({
    rejectionReason: string().required("Please enter rejection reason"),
  });

  //   Form Submit Handler
  const handleSubmit = (
    values: FormInitialValues,
    { setSubmitting }: FormikHelpers<FormInitialValues>
  ) => { 
    const formData = new FormData();
    formData.append("requestedStatus",  "REJECTED");
    formData.append("rejectionReason",values.rejectionReason);
    changeStatus({
      body: formData,
      distributorId,
    }).then((res: any) => {
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
    <Dialog open={true} maxWidth="sm" fullWidth>
      <DialogTitle> Rejection Reason </DialogTitle>

      <DialogContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formikProps) => (
            <Form>
              <RejectionReasonDialog
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

export default RejectionReasonDialogWrapper;
