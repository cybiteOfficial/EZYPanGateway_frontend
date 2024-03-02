import React from "react";
import CompleteDialogBox from "./CompleteDialogBox";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Form, Formik, FormikHelpers } from "formik";
import { showToast } from "src/utils/toaster/showToast";
import { useChangeStatusRefundRequestMutation } from "src/services/RefundRequestService";

type Props = {
  onClose: () => void;
  refundRequestId: string;
};

export type FormInitialValues = {
  remark: string;
  transactionNumber:string
};

const CompleteDialogBoxWrapper = ({ onClose, refundRequestId }: Props) => {
  const [changeStatus] = useChangeStatusRefundRequestMutation();

  // Form Initial Values
  const initialValues: FormInitialValues = {
    remark: "",
    transactionNumber:""
  };


  //   Form Submit Handler
  const handleSubmit = (
    values: FormInitialValues,
    { setSubmitting }: FormikHelpers<FormInitialValues>
  ) => {
    changeStatus({
      body: {
        requestedStatus: "COMPLETE",
        remark : values?.remark ,
        transactionNumber:values?.transactionNumber
      },
      refundRequestId,
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
      <DialogTitle> Remark </DialogTitle>

      <DialogContent>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          {(formikProps) => (
            <Form>
              <CompleteDialogBox
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

export default CompleteDialogBoxWrapper;
