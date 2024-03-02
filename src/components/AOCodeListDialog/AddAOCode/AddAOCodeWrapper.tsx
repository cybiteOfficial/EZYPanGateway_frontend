import { Form, Formik, FormikHelpers } from "formik";
import React from "react";
// import { useNavigate } from 'react-router-dom';
import { useAddAOCodeMutation } from "src/services/AOCodeService";
import { showToast } from "src/utils/toaster/showToast";
import { number, object, string } from "yup";
import AddAOCode from "./AddAOCode";
type Props = {
  onClose: () => void;
};
export type AOCodeInitialValues = {
  city: string;
  areaCode: string;
  aoType: string;
  rangeCode: number;
  aoNo: number;
};
const AddAOCodeWrapper = ({ onClose }: Props) => {
  const [addAOCode] = useAddAOCodeMutation();

  // Form Initial Values
  const initialValues: AOCodeInitialValues = {
    city: "",
    areaCode: "",
    aoType: "",
    rangeCode: NaN,
    aoNo: NaN,
  };

  // Form Validation Schema
  const validationSchema = object({
    city: string().required("City is required"),
    areaCode: string().required("Area Code is required"),
    aoType: string().required("AO Type is required"),
    rangeCode: number()
      .typeError("Range Code must be a number")
      .min(0, "Range Code must be a positive value")
      .required("Range Code is required"),
    aoNo: number()
      .typeError("AO No must be a number")
      .min(0, "Range Code must be a positive value")
      .required("AO No is required"),
  });

  // Form Submit Handler
  const handleSubmit = (
    values: AOCodeInitialValues,
    { setSubmitting }: FormikHelpers<AOCodeInitialValues>
  ) => {
    addAOCode(values)
      .then((res: any) => {
        if (res?.error) {
          setSubmitting(false);
          showToast("error", res?.error?.data?.message);
        } else {
          if (res?.data?.status) {
            showToast("success", res?.data?.message);
            setSubmitting(false);
          } else {
            setSubmitting(false);
            showToast("error", res?.data?.message);
          }
        }
      })
      .catch(() => {});
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <Form className="">
          <AddAOCode onClose={onClose} formikProps={formikProps} />
        </Form>
      )}
    </Formik>
  );
};

export default AddAOCodeWrapper;
