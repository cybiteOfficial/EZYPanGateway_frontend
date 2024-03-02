import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import { BiCheck } from "react-icons/bi";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import { useUpdateUserServicesMutation } from "src/services/UserServices";
import AuthHOC from "src/userAccess/AuthHOC";
import { AccessAction } from "src/utils/Enums/AccessAction";
import { showToast } from "src/utils/toaster/showToast";

type Props = {
  distributorId: string;
  onClose: () => void;
  services?: string[] | null;
};

type FormInitialValues = {
  services: string[] | null;
};
const serviceOptions = [
  {
    _id: "PAN",
    name: "PAN",
  },
  {
    _id: "ITR",
    name: "ITR",
  },
  {
    _id: "GUMASTA",
    name: "Gumasta",
  },
  {
    _id: "DSC",
    name: "DSC",
  },
  {
    _id: "MSME",
    name: "MSME",
  },
  {
    _id: "DIGITAL_PAN",
    name: "Digital PAN",
  },
];

const ServiceDialogWrapper = ({
  onClose,
  distributorId,
  services = [] as string[] | null,
}: Props) => {
  //   Initial Values
  const initialValues: FormInitialValues = {
    services: services,
  };
  const [updateUserServices] = useUpdateUserServicesMutation();

  //   Handle Submit
  const handleSubmit = (
    values: FormInitialValues,

    { setSubmitting }: FormikHelpers<FormInitialValues>
  ) => {
    updateUserServices({ body: values, id: distributorId })
      .then((res: any) => {
        if (res.error) {
          showToast("error", res.data.error.message);
          setSubmitting(false);
        } else {
          showToast("success", res.data.message);
          setSubmitting(false);
          onClose();
        }
      })
      .catch(() => {});
  };

  return (
    <Dialog open={true} maxWidth="xs" fullWidth onClose={onClose}>
      <div className="px-4">
        <div
          className={`text-md  py-2 border-b-[3px] border-primary-main text-primary-main text-center`}
        >
          Services
        </div>
      </div>
      <DialogContent>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({
            values,
            setFieldValue,
            isSubmitting,
          }: FormikProps<FormInitialValues>) => (
            <Form>
              <div className="flex flex-col gap-4">
                {serviceOptions?.map((item, itemIndex) => {
                  return (
                    <button
                      type="button"
                      key={itemIndex}
                      onClick={() => {
                        setFieldValue(
                          "services",
                          (values?.services || [])?.includes(item._id)
                            ? values?.services?.filter(
                                (selected) => selected !== item._id
                              )
                            : [...(values?.services ?? []), item._id]
                        );
                      }}
                      className="flex items-center gap-2"
                    >
                      <div
                        className={`border  rounded w-4 h-4 flex justify-center items-center text-white transition-all duration-500 ${
                          values?.services?.includes(item._id)
                            ? "bg-secondary-main border-slate-300"
                            : "border-slate-500"
                        }`}
                      >
                        <BiCheck className="font-medium" />
                      </div>

                      <div> {item.name} </div>
                    </button>
                  );
                })}

                <div className="flex justify-end gap-3">
                  <ATMLoadingButton
                    className="border-primary-main text-primary-main bg-white"
                    onClick={onClose}
                  >
                    Cancel
                  </ATMLoadingButton>

                  <AuthHOC
                    moduleName="USERS"
                    action={AccessAction.EDIT_SERVICE_FOR_USER}
                  >
                    <ATMLoadingButton
                      type="submit"
                      isLoading={isSubmitting}
                      className="bg-primary-main"
                    >
                      Update Service
                    </ATMLoadingButton>
                  </AuthHOC>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDialogWrapper;
