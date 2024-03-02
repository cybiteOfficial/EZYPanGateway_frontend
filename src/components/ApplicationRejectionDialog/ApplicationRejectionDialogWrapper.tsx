import { Form, Formik, FormikHelpers } from "formik";
import React, { useState, useEffect } from "react";
import { RejectionListResponse } from "src/models/RejectionList.model";
import { useGetAllRejectionListQuery } from "src/services/RejectionListService";
import { object, string } from "yup";
import ApplicationRejectionDialog from "./ApplicationRejectionDialog";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

type Props = {
  onClose: () => void;
  onSubmit : (formData : any) => any;
};

export type RejectionInitialValues = {
  rejectionReason: string;
  remark: string;
};

const ApplicationRejectionDialogWrapper = ({
  onClose,
  onSubmit,
}: Props) => {
  const [rejectionListAll, setRejectionListAll] = useState<
    RejectionListResponse[]
  >([]);


  const {
    data: rejectionListData,
    isFetching: isRejectionListFetching,
    isLoading: isRejectionListLoading,
  } = useGetAllRejectionListQuery("");

  useEffect(() => {
    if (!isRejectionListFetching || !isRejectionListLoading) {
      let rejectList = rejectionListData?.data.map((ele: any) => {
        return {
          label: ele.rejectionMsg,
          value: ele.rejectionMsg,
        };
      });
      setRejectionListAll(rejectList || []);
    }
  }, [rejectionListData, isRejectionListFetching, isRejectionListLoading]);

  // Form Validation Schema
  const validationSchema = object({
    rejectionReason: string().required("Rejection Reason is required"),
  });

  // Form Initial Values
  const initialValues: RejectionInitialValues = {
    rejectionReason: "",
    remark: "",
  };

  // Form Submit Handler
  const handleSubmit = (
    values: RejectionInitialValues,
    { setSubmitting }: FormikHelpers<RejectionInitialValues>
  ) => { 
    const formData = new FormData();
    formData.append("rejectionReason", values?.rejectionReason );
    formData.append("requestedStatus", "REJECT");
    formData.append("remark", values.remark);
    onSubmit(formData)
    .then((res: any) => { 
      if (res?.error) {
        setSubmitting(false);
      } else {
        setSubmitting(false);
        onClose()
      }
    });
  };

  return (
    <Dialog open={true} maxWidth="sm" fullWidth>
      <DialogTitle> Rejection Reason </DialogTitle>

      <DialogContent>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {(formikProps) => (
            <Form className="h-full">
              <ApplicationRejectionDialog
                formikProps={formikProps}
                onClose={onClose}
                rejectionListAll={rejectionListAll}
              />
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationRejectionDialogWrapper;
