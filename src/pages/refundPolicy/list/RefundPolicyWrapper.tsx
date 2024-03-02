import React from "react";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";

import { PrivacyAndPolicyListResponse } from "src/models/PrivacyAndPolicy.model";

import { Form, Formik, FormikHelpers } from "formik";
import { mixed, object } from "yup";
import {
  ContentState,
  convertFromHTML,
  convertToRaw,
  EditorState,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import { EditorState as EditorStateType } from "react-draft-wysiwyg";
import { showToast } from "src/utils/toaster/showToast";
import { useNavigate } from "react-router-dom";

import RefundPolicyListing from "./RefundPolicyListing";
import {
  useGetRefundPolicyQuery,
  useUpdateRefundPolicyMutation,
} from "src/services/RefundPolicyService";
import ATMPageLoader from "src/components/UI/atoms/ATMPageLoader/ATMPageLoader";

export type RefundPolicyInitialValues = {
  description: EditorStateType;
};
// Form Validation Schema
const validationSchema = object({
  description: mixed().required("Question is required"),
});

const RefundPolicyWrapper = () => {
  const navigate = useNavigate();
  const [refundPolicy, setRefundPolicy] =
    React.useState<PrivacyAndPolicyListResponse | null>(null);

  const { data, isLoading, isFetching } = useGetRefundPolicyQuery("");
  const [updateRefundPolicy] = useUpdateRefundPolicyMutation();

  React.useEffect(() => {
    if (!isFetching && !isLoading) {
      setRefundPolicy(data?.data || null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching, isLoading, data]);

  // Form Initial Values
  const initialValues: RefundPolicyInitialValues = {
    description: EditorState.createWithContent(
      ContentState.createFromBlockArray(
        convertFromHTML(refundPolicy?.description || "").contentBlocks,
        convertFromHTML(refundPolicy?.description || "").entityMap
      )
    ),
  };
  // Form Submit Handler
  const handleSubmit = (
    values: RefundPolicyInitialValues,
    { setSubmitting }: FormikHelpers<RefundPolicyInitialValues>
  ) => {
    const formattedValues = {
      ...values,
      description: draftToHtml(
        convertToRaw(values.description.getCurrentContent())
      ),
    };
    updateRefundPolicy({
      body: formattedValues,
      id: refundPolicy?._id || "",
    }).then((res: any) => {
      if (res?.error) {
        showToast("error", res?.error?.data?.message);
        setSubmitting(false);
      } else {
        if (res?.data?.status) {
          showToast("success", res?.data?.message);
          navigate("/refund-policy");
          setSubmitting(false);
        } else {
          showToast("error", res?.data?.message);
          setSubmitting(false);
        }
      }
    });
  };
  if (isFetching || isLoading) {
    return <ATMPageLoader />;
  }

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formikProps) => (
          <SideNavLayout>
            <Form className="h-full">
              <RefundPolicyListing formikProps={formikProps} />
            </Form>
          </SideNavLayout>
        )}
      </Formik>
    </>
  );
};
export default RefundPolicyWrapper;
