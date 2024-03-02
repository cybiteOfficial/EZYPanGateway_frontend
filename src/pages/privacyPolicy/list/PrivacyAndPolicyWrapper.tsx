import React from "react";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";

import { PrivacyAndPolicyListResponse } from "src/models/PrivacyAndPolicy.model";


import { Form, Formik } from "formik";
import { mixed, object} from "yup";
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
import PrivacyAndPolicyListing from "./PrivacyAndPolicyListing";
import { useGetPrivacyAndPolicyQuery, useUpdatePrivacyAndPolicyMutation } from "src/services/PrivacyAndPolicyService";
import ATMPageLoader from "src/components/UI/atoms/ATMPageLoader/ATMPageLoader";

export type PrivacyAndPolicyInitialValues = {
description :   EditorStateType;
};
 // Form Validation Schema
 const validationSchema = object({
    description: mixed().required("Question is required"),
});

const PrivacyAndPolicyWrapper = () => {
  const navigate = useNavigate();

  const [privacyAndPolicy, setPrivacyAndPolicy] = React.useState<PrivacyAndPolicyListResponse | null>(null);

  const {data, isLoading, isFetching}= useGetPrivacyAndPolicyQuery("")
 const [updatePrivacyAndPolicy]= useUpdatePrivacyAndPolicyMutation()
  
  
  React.useEffect(() => {
    if (!isFetching && !isLoading) {
      setPrivacyAndPolicy(data?.data || null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching, isLoading, data]);
   
  // Form Initial Values
  const initialValues: PrivacyAndPolicyInitialValues = {
    description:EditorState.createWithContent(
      ContentState.createFromBlockArray(
        convertFromHTML(privacyAndPolicy?.description || "" ).contentBlocks,
        convertFromHTML(privacyAndPolicy?.description || "").entityMap
      )
    )
  };

// Form Submit Handler
const handleSubmit = (values: PrivacyAndPolicyInitialValues) => {
const formattedValues = {
  ...values,
  description: draftToHtml(
    convertToRaw(values.description.getCurrentContent())
  ),
};
updatePrivacyAndPolicy ({body :formattedValues,id :privacyAndPolicy?._id || ""}).then((res:any)=>{
  if(res?.error){
    showToast("error" , res?.error?.data?.message)
  }
  else {
    if(res?.data?.status){
      showToast("success",res?.data?.message);
      navigate ("/privacy-policy")
    }
    else{
      showToast("error",res?.data?.message)
    }
  }
})
}
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
      <PrivacyAndPolicyListing  formikProps={formikProps}/>
          </Form>
        </SideNavLayout>
      )}
    </Formik>

    </>   
  );
};
export default PrivacyAndPolicyWrapper;
