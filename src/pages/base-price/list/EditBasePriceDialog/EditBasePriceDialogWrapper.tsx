import React from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { number, object } from "yup";
import { showToast } from "src/utils/toaster/showToast";
import EditBasePriceDialog from "./EditBasePriceDialog";
import { BasePriceListResponse } from "src/models/BasePrice.model";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { MdCancel } from "react-icons/md";
import Dialog from "@mui/material/Dialog";
import { useUpdateBasePriceMutation } from "src/services/BasePriceServices";

export type BasePriceInitialValues = {
  price: number;
  guestBaseprice: number;
  convenienceprice: number;
  guestConvenienceprice: number;
};

type Props = {
  initialData: BasePriceListResponse | null;
  onClose: () => void;
};

const EditBasePriceDialogWrapper = ({ initialData, onClose }: Props) => {
  const [updateBasePrice] = useUpdateBasePriceMutation();

  // Form Initial Values
  const initialValues: BasePriceInitialValues = {
    price: initialData?.price || NaN,
    guestBaseprice: initialData?.guestBaseprice || NaN,
    convenienceprice: initialData?.convenienceprice || NaN,
    guestConvenienceprice: initialData?.guestConvenienceprice || NaN,
  };

  // Form Validation Schema
  const validationSchema = object({
    price: number()
      .min(0, "Price must be positive")
      .typeError("Price Must be a number")
      .required("Price is required"),
    guestBaseprice: number()
      .min(0, "Guest Base Price must be positive")
      .typeError("Guest Base Price Must be a number")
      .required("Guest Base Price is required"),
    convenienceprice: number()
      .min(0, "Must be positive")
      .typeError("Must be a number")
      .required("Required"),
    guestConvenienceprice: number()
      .min(0, "Must be positive")
      .typeError("Must be a number")
      .required("Required"),
  });

  // Form Submit Handler
  const handleSubmit = (
    values: BasePriceInitialValues,
    { setSubmitting }: FormikHelpers<BasePriceInitialValues>
  ) => {
    values = {
      ...values,
      price: parseInt(values.price?.toString()),
      guestBaseprice: parseInt(values.guestBaseprice?.toString()),
      convenienceprice: parseInt(values.convenienceprice?.toString()),
      guestConvenienceprice: parseInt(values.guestConvenienceprice?.toString()),
    };
    updateBasePrice({ body: values, id: initialData?._id }).then((res: any) => {
      if (res.error) {
        showToast("error", res?.error?.data?.message);
        setSubmitting(false);
      } else {
        if (res?.data?.status) {
          showToast("success", res?.data?.message);
          setSubmitting(false);
          onClose();
        } else {
          showToast("error", res?.data?.message);
          setSubmitting(false);
        }
      }
    });
  };

  return (
    <Dialog open={true} maxWidth="sm" fullWidth>
      <DialogTitle>
        <div className="flex justify-between items-center text-primary-main font-bold">
          Update Base Price
          <button type="button" onClick={onClose}>
            <MdCancel className="text-red-500 text-2xl" />
          </button>
        </div>
      </DialogTitle>

      <DialogContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formikProps) => (
            <Form className="h-full">
              <EditBasePriceDialog
                onClose={onClose}
                formikProps={formikProps}
              />
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default EditBasePriceDialogWrapper;
