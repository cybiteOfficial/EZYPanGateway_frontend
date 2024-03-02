import React from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { object, string } from "yup";
import AddDistrict from "./AddDistrict";
import { showToast } from "src/utils/toaster/showToast";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useAddDistrictMutation ,   useGetAllStateListQuery } from "src/services/GumastaConfigService";

export type addDistrictValueTypes = {
  state: string;
  district:string
};
type Props = {
  onClose: () => void;
};

const AddDistrictWrapper = ({ onClose }: Props) => {
  const [addState] = useAddDistrictMutation();
 const {data} =   useGetAllStateListQuery('')

  // Form Initial Values
  const initialValues: addDistrictValueTypes = {
    state: "",
    district:""
  };

  // Form Validation Schema
  const validationSchema = object({
    state: string().required("state is required"),
    district: string().required("district is required"),
  });

  // Form Submit Handler
  const handleSubmit = (
    values: addDistrictValueTypes,
    { setSubmitting }: FormikHelpers<addDistrictValueTypes>
  ) => {
    addState(values).then((res: any) => {
      if (res.error) {
        showToast("error", res?.error?.data?.message);
        setSubmitting(false);
      } else {
        showToast("success", res?.data?.message);
        onClose();
        setSubmitting(false);
      }
    });
  };

  const stateOptions={
    allState : data?.data?.map((el:any)=>{
        return{
            label : el?.state,
            value : el?.state
        }
    })
  }

  return (
    <Dialog open={true} maxWidth="sm" fullWidth>
      <DialogTitle>Add State</DialogTitle>

      <DialogContent>
        <Formik 
        enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formikProps) => (
            <Form className="h-full">
              <AddDistrict onClose={onClose}
               formikProps={formikProps} 
               stateOptions={stateOptions}
               />
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default AddDistrictWrapper;
