import React, { useEffect, useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { object, string } from "yup";
import EditState from "./EditState";
import { showToast } from "src/utils/toaster/showToast";
import { CircularProgress, Dialog, DialogContent, DialogTitle } from "@mui/material";
import {
  useUpdateStateMutation,
  useGetSingleViewStateQuery,
} from "src/services/GumastaConfigService";

export type EditStateValueTypes = {
  state: string;
};
type Props = {
  onClose: () => void;
  stateId: string;
};

const EditStateWrapper = ({ onClose, stateId }: Props) => {
  const [updateState] = useUpdateStateMutation();
  const { data, isFetching, isLoading } = useGetSingleViewStateQuery(stateId);
  const [satateName, setStateName] = useState<any>();

  // Form Initial Values
  const initialValues: EditStateValueTypes = {
    state: satateName?.state,
  };

  useEffect(() => {
    if (!isFetching && !isLoading) {
      setStateName(data?.data || null);
    }
  }, [isLoading, isFetching, data]);

  // Form Validation Schema
  const validationSchema = object({
    state: string().required("state is required"),
  });

  // Form Submit Handler
  const handleSubmit = (
    values: EditStateValueTypes,
    { setSubmitting }: FormikHelpers<EditStateValueTypes>
  ) => {
    updateState({
      id: stateId,
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
            <Form>
                {(isLoading || isFetching) && (
              <div className="absolute w-[100%] h-[100%] flex justify-center items-center z-10 bg-slate-100 opacity-50">
                <CircularProgress />
              </div>
            )}
              <EditState onClose={onClose} formikProps={formikProps} />
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default EditStateWrapper;
