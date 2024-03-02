import { Form, Formik, FormikHelpers } from "formik";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import { useAddFormMutation } from "src/services/DownloadFormService";
import { object, string } from "yup";
import { showToast } from "src/utils/toaster/showToast";
import { useNavigate } from "react-router-dom";
import AddDownLoadForm from "./AddDownLoadForm";

export type DownloadFormInitialValues = {
  fileUrl: string;
  fileTitle: string;
  description: string;
};

const AddDownLoadFormWrapper = () => {
  const [addForm] = useAddFormMutation();
const navigate = useNavigate()
  const initialValues: DownloadFormInitialValues = {
    fileUrl: "",
    fileTitle: "",
    description: "",
  };
  const validationSchema = object({
    fileUrl: string().required("URL is required"),
    fileTitle: string().required("File Title is required"),
    description: string().required("Description is required"),
  });
  const handleSubmit = (values: DownloadFormInitialValues,{ setSubmitting }: FormikHelpers<DownloadFormInitialValues>) => {
    addForm(values).then((res:any)=>{
      if (res.error) {
        showToast("error", res?.error?.data?.message);
        setSubmitting(false);
      } else {
        showToast("success", res?.data?.message);
        navigate("/download-form");
        setSubmitting(false);
      }
    })
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {(formikProps) => (
        <SideNavLayout>
          <Form className="h-full">
            <AddDownLoadForm formikProps={formikProps} />
          </Form>
        </SideNavLayout>
      )}
    </Formik>
  );
};

export default AddDownLoadFormWrapper;
