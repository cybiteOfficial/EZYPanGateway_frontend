import React from "react";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";

import { TermsAndConditionListResponse } from "src/models/TermsAndCondition.model";
import TermsAndConditionsListing from "./TermsAndConditionsListing";
import {
  useGetTermsAndConditionQuery,
  useUpdateTermsAndConditionMutation,
} from "src/services/TermsAndConditionService";

import { Form, Formik } from "formik";
import { mixed, object } from "yup";
import {
  ContentState,
  convertFromHTML,
  convertToRaw,
  EditorState,
} from "draft-js";
import { EditorState as EditorStateType } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { showToast } from "src/utils/toaster/showToast";
import { useNavigate } from "react-router-dom";
import ATMPageLoader from "src/components/UI/atoms/ATMPageLoader/ATMPageLoader";

export type TermsAndConditionInitialValues = {
  description: EditorStateType;
};
// Form Validation Schema
const validationSchema = object({
  description: mixed().required("Question is required"),
});

const TermsAndConditionsListingWrapper = () => {
  const navigate = useNavigate();
  const [termsAndCondition, setTermsAndCondition] =    React.useState<TermsAndConditionListResponse | null>(null);
 
  const { data, isLoading, isFetching } = useGetTermsAndConditionQuery("");
  const [updateTermsAndCondition] = useUpdateTermsAndConditionMutation();
  React.useEffect(() => {
    if (!isFetching && !isLoading) {
      setTermsAndCondition(data?.data || null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching, isLoading, data]);

  // Form Initial Values
  const initialValues: TermsAndConditionInitialValues = {
    description: EditorState.createWithContent(
      ContentState.createFromBlockArray(
        convertFromHTML(termsAndCondition?.description || "").contentBlocks,
        convertFromHTML(termsAndCondition?.description || "").entityMap
      )
    ),
  };
  // Form Submit Handler
  const handleSubmit = (values: TermsAndConditionInitialValues) => {
    const formattedValues = {
      ...values,
      description: draftToHtml(
        convertToRaw(values.description.getCurrentContent())
      ),
    };
    updateTermsAndCondition({
      body: formattedValues,
      id: termsAndCondition?._id || "",
    }).then((res: any) => {
      if (res.error) {
        showToast("error", res?.error?.data?.message);
      } else {
        if (res?.data?.status) {
          showToast("success", res?.data?.message);
          navigate("/terms-condition");
        } else {
          showToast("error", res?.data?.message);
        }
      }
    });
  };
if(isFetching || isLoading){
  return <ATMPageLoader/>
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
              <TermsAndConditionsListing formikProps={formikProps} />
            </Form>
          </SideNavLayout>
        )}
      </Formik>
 
    </>
  );
};
export default TermsAndConditionsListingWrapper;
