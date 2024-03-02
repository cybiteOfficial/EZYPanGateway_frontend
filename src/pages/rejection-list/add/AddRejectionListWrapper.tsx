import React from "react";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import { Formik, Form, FormikHelpers } from "formik";
import { object, string } from "yup";
import AddRejectionList from "./AddRejectionList";
import { useNavigate } from "react-router-dom";
import { useAddRejectionListMutation } from "src/services/RejectionListService";
import { showToast } from "src/utils/toaster/showToast";

export type RejectionInitialValues = {
  rejectionMsg: string;
};

const AddRejectionListWrapper = () => {

  const navigate = useNavigate()
  const [addRejectionList] = useAddRejectionListMutation();

  // Form Initial Values
  const initialValues: RejectionInitialValues = {
    rejectionMsg:"",
  };

  // Form Validation Schema
  const validationSchema = object({
    rejectionMsg: string().required("Rejection Message is required"),
  });

  // Form Submit Handler
  const handleSubmit = (
    values: RejectionInitialValues,
    { setSubmitting }: FormikHelpers<RejectionInitialValues>
  ) => {
    addRejectionList(values)
    .then((res: any) => {
      if (res.error) {
        showToast("error", res?.error?.data?.message)
        setSubmitting(false)
      }
      else {
        showToast("success", res?.data?.message)
        navigate("/rejection-list")
        setSubmitting(false)
      }
    })
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <SideNavLayout>
          <Form className="h-full">
            <AddRejectionList
              formikProps={formikProps}
            />
          </Form>
        </SideNavLayout>
      )}
    </Formik>
  );
};

export default AddRejectionListWrapper;
