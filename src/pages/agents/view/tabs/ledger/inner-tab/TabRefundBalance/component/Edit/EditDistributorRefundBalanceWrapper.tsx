import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import { Form, Formik, FormikHelpers } from "formik";
import { object, string } from "yup";
import DistributorRefundForm from "../Layouts/DistributorRefundForm";
import { showToast } from "src/utils/toaster/showToast";
import {
  useUpdateRefundEntryInLedgerMutation,
  useGetRefundEntryInLedgerQuery,
} from "src/services/RefundBalanceService";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";

export type DistributorRefundFormValues = {
  applicationType: string;
  amountToBeUpdate: string;
  transactionType: string;
  remark: string;
};

type Props = {
  onClose: () => void;
  RefundId: string;
};

const EditDistributorRefundBalanceWrapper = ({ onClose, RefundId }: Props) => {
  const [refundData, setRefundData] = useState<any>({});
  const [updateEntryInRefund] = useUpdateRefundEntryInLedgerMutation();
  const { distributorId } = useParams();
  const { data, isLoading, isFetching } =
    useGetRefundEntryInLedgerQuery(RefundId);

  useEffect(() => {
    if (!isFetching && !isLoading) {
      setRefundData(data?.data);
    }
  }, [isFetching, isLoading, data]);

  // Form Initial Values
  const initialValues: DistributorRefundFormValues = {
    applicationType: refundData?.applicationType,
    amountToBeUpdate:
      refundData?.transactionType === "DEBIT"
        ? refundData?.debitedAmount
        : refundData?.creditedAmount,
    transactionType: refundData?.transactionType,
    remark: refundData?.remark,
  };

  // Validation Schema
  const validationSchema = object().shape({
    applicationType: string().required("Please enter applicationType"),
    amountToBeUpdate: string().required("Please enter amount"),
    transactionType: string().required("Please enter transactionType"),
    remark: string().required("Please enter remark"),
  });

  // Handle Submit
  const handleSubmit = (
    values: DistributorRefundFormValues,
    { setSubmitting, resetForm }: FormikHelpers<DistributorRefundFormValues>
  ) => {
    const formatedvalues = {
      ...values,
      userId: distributorId,
    };
    updateEntryInRefund({
      body: formatedvalues,
      id: RefundId,
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
            <DistributorRefundForm
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

export default EditDistributorRefundBalanceWrapper;
