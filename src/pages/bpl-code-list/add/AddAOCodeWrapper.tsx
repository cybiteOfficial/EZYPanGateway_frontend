import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import { Formik, Form, FormikHelpers } from "formik";
import { number, object, string } from "yup";
import AddBPLCode from "./AddAOCode";
import { useAddAOCodeMutation } from "src/services/AOCodeService";
import { showToast } from "src/utils/toaster/showToast";
import { useNavigate } from "react-router-dom";

export type BPLCodeInitialValues = {
  city: string;
  areaCode: string;
  aoType: string;
  rangeCode: number;
  aoNo: number;
};

const AddBPLCodeWrapper = () => {
  const navigate = useNavigate();
  const [addAOCode] = useAddAOCodeMutation();

  // Form Initial Values
  const initialValues: BPLCodeInitialValues = {
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
    values: BPLCodeInitialValues,
    { setSubmitting }: FormikHelpers<BPLCodeInitialValues>
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
            navigate("/ao-code-list");
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
        <SideNavLayout>
          <Form className="h-full">
            <AddBPLCode formikProps={formikProps} />
          </Form>
        </SideNavLayout>
      )}
    </Formik>
  );
};

export default AddBPLCodeWrapper;
