import React,{useState , useEffect} from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { object, string } from "yup";
import EditDistrict from "./EditDistrict";
import { showToast } from "src/utils/toaster/showToast";
import { CircularProgress, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useUpdateDistrictMutation , useGetAllStateListQuery,useGetSingleViewDistrictQuery } from "src/services/GumastaConfigService";

export type EditDistrictValueTypes = {
  state: string;
  district:string
};
type Props = {
  onClose: () => void;
  districtId:string
};

const EditDistrictWrapper = ({ onClose , districtId }: Props) => {
  const [updateDistrict] = useUpdateDistrictMutation();
  const {data:stateListData} =   useGetAllStateListQuery('') 
  const {data , isFetching , isLoading} = useGetSingleViewDistrictQuery(districtId) 
  const [districtName , setDistrictName]= useState<any>()

  useEffect(() => {
    if (!isFetching && !isLoading) {
      setDistrictName(data?.data || null);
    }
  }, [isLoading, isFetching, data]);

  // Form Initial Values
  const initialValues: EditDistrictValueTypes = {
    state: districtName?.state || "",
    district:districtName?.district || ""
  };

  // Form Validation Schema
  const validationSchema = object({
    state: string().required("state is required"),
    district: string().required("district is required"),
  });

  // Form Submit Handler
  const handleSubmit = (
    values: EditDistrictValueTypes,
    { setSubmitting }: FormikHelpers<EditDistrictValueTypes>
  ) => {
    updateDistrict({
        id: districtId,
        body: values,
    }).then((res: any) => {
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
    allState : stateListData?.data?.map((el:any)=>{
        return{
            label : el?.state,
            value : el?.state
        }
    })
  }

  return (
    <Dialog open={true} maxWidth="sm" fullWidth>
      <DialogTitle>Edit State</DialogTitle>

      <DialogContent>
        <Formik 
        enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formikProps) => (
            <Form >
               {(isLoading || isFetching) && (
              <div className="absolute w-[100%] h-[100%] flex justify-center items-center z-10 bg-slate-100 opacity-50">
                <CircularProgress />
              </div>
            )}
              <EditDistrict 
              onClose={onClose}
              stateOptions={stateOptions}
              formikProps={formikProps} />
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default EditDistrictWrapper;
