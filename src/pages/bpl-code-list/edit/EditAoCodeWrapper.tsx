import React, { useState, useEffect } from "react";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import { Formik, Form, FormikHelpers } from "formik";
import { number, object, string } from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { showToast } from "src/utils/toaster/showToast";
import EditAoCode from "./EditAoCode";
import {
  useGetAoCodeByIdQuery,
  useUpdateAOCodeMutation,
} from "src/services/AOCodeService";
import { AOCodeListResponse } from "src/models/AOCodeList.model";
import ATMPageLoader from "src/components/UI/atoms/ATMPageLoader/ATMPageLoader";

export type AoCodeInitialValues = {
  city: string;
  areaCode: string;
  aoType: string;
  rangeCode: number;
  aoNo: number;
};

const EditAoCodeWrapper = () => {
  const { id = "" } = useParams();

  const navigate = useNavigate();
  const [updateAOCode] = useUpdateAOCodeMutation();
  const { data, isLoading, isFetching } = useGetAoCodeByIdQuery(id);
  const [aoCode, setAoCode] = useState<AOCodeListResponse | null>(null);
  
  const initialValues: AoCodeInitialValues = {
    city: aoCode?.city || "",
    areaCode: aoCode?.areaCode || "",
    aoType: aoCode?.aoType || "",
    rangeCode: aoCode?.rangeCode || NaN,
    aoNo: aoCode?.aoNo || NaN,
  };
  // Form Initial Values
  useEffect(() => {
    if (!isFetching && !isLoading) {
      setAoCode(data?.data);
    }
  }, [isLoading, isFetching, data]);

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
    values: AoCodeInitialValues,
    { setSubmitting }: FormikHelpers<AoCodeInitialValues>
  ) => {
    updateAOCode({
      id: id,
      body: values,
    })
      .then((res: any) => {
        if (res.error) {
          showToast("error", res.error.data.message);
          setSubmitting(false);
        } else {
          setSubmitting(false);
          showToast("success", res.data.message);
          navigate("/ao-code-list");
        }
      })
      .catch(() => {});
     
  };
  if (isFetching || isLoading) {
    return <ATMPageLoader />;
  }

  if (isFetching || isLoading) {
    return <ATMPageLoader />;
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <SideNavLayout>
          <Form className="h-full">
            <EditAoCode formikProps={formikProps} />
          </Form>
        </SideNavLayout>
      )}
    </Formik>
  );
};

export default EditAoCodeWrapper;
