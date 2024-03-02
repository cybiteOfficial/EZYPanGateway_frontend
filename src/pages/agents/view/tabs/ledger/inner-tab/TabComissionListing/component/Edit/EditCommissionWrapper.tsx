import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import { Form, Formik, FormikHelpers } from "formik";
import { object, string } from "yup";
import { showToast } from "src/utils/toaster/showToast";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import CommissionForm from "../Layout/CommissionForm";
import { useGetCommissionEntryInLedgerQuery, useUpdateCommissionEntryInLedgerMutation } from "src/services/CommissionService";

export type RetailerRefundFormValues = {
  applicationType: string;
  amount: string;
  transactionType: string;
  remark: string;
};

type Props = {
  onClose: () => void;
  commissionId: string;
};

const EditCommissionWrapper = ({ onClose, commissionId }: Props) => {
  const [refundData, setRefundData] = useState<any>({});
  const [updateEntryInCommission] = useUpdateCommissionEntryInLedgerMutation();
  const { distributorId } = useParams();
  const { data, isLoading, isFetching } =
    useGetCommissionEntryInLedgerQuery(commissionId);

  useEffect(() => {
    if (!isFetching && !isLoading) {
      setRefundData(data?.data);
    }
  }, [isFetching, isLoading, data]);

  // Form Initial Values
  const initialValues: RetailerRefundFormValues = {
    applicationType: refundData?.applicationType,
    amount: refundData?.amount,
    transactionType: refundData?.commissionTransactionType,
    remark: refundData?.logs,
  };

  // Validation Schema
  const validationSchema = object().shape({
    applicationType: string().required("Please enter applicationType"),
    amount: string().required("Please enter amount"),
    transactionType: string().required("Please enter transactionType"),
    remark: string().required("Please enter remark"),
  });

  // Handle Submit
  const handleSubmit = (
    values: RetailerRefundFormValues,
    { setSubmitting, resetForm }: FormikHelpers<RetailerRefundFormValues>
  ) => {
    const formatedvalues = {
      ...values,
      userId: distributorId,
    };
    updateEntryInCommission({
      body: formatedvalues,
      id: commissionId,
    }).then((res: any) => {
      if (res?.error) {
        showToast("error", res?.error?.data?.message);
      } else {
        if (res?.data?.status) {
          showToast("success", res?.data?.message);
          resetForm();
          onClose();
        } else {
          showToast("error", res?.data?.message);
        }
      }
      setSubmitting(false);
    });
  };

  return (
    <Dialog open maxWidth="xs" fullWidth>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formikProps) => (
          <Form>
            {(isLoading || isFetching) && (
              <div className="absolute w-[100%] h-[100%] flex justify-center items-center z-10 bg-slate-100 opacity-50">
                <CircularProgress />
              </div>
            )}
            <CommissionForm
              formikProps={formikProps}
              onClose={onClose}
              formType="Edit"
            />
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default EditCommissionWrapper;
