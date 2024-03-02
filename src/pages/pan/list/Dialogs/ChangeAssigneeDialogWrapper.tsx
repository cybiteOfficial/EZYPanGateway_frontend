import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import ATMSelect from "src/components/UI/atoms/formFields/ATMSelect/ATMSelect";
import { showToast } from "src/utils/toaster/showToast";
import { useGetAdminListQuery } from "src/services/AdminServices";
import { useEffect, useState } from "react";
import { AdminListResponse } from "src/models/Admin.model";
import { object, string } from "yup";
import { useChangePANApplicationAssigneeMutation } from "src/services/PANService";

type Props = {
  onClose: () => void;
  assignee: string;
  applicationId: string;
};

type FormInitialValues = {
  assignToSjbtUser: string;
};

const paramList = [
  "_id",
  "userName",
  "email",
  "mobile",
  "role",
  "printWaitTime",
  "createdAt",
  "updatedAt",
];

const ChangeAssigneeDialogWrapper = ({ onClose, assignee, applicationId }: Props) => {
  // States
  const [assigneeList, setAssigneeList] = useState([]);
  const [ChangeAssignee ] = useChangePANApplicationAssigneeMutation();

  const { data, isFetching, isLoading } = useGetAdminListQuery({
    limit: 10,
    searchValue: "",
    params: paramList,
    page: 1,
    filterBy: [
      {
        fieldName: "",
        value: [],
      },
    ],
    dateFilter: {
      start_date: "",
      end_date: "",
      dateFilterKey: "",
    },
    orderBy: "createdAt",
    orderByValue: -1,
    isPaginationRequired: false,
  });

  useEffect(() => {
    if (!isFetching && !isLoading) {
      setAssigneeList(
        data?.data?.map((admin: AdminListResponse) => ({
          label: admin.userName,
          value: admin._id,
        })) || []
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isFetching, data]);

  //   Initial Values
  const initialValues: FormInitialValues = {
    assignToSjbtUser: assignee || "",
  };

  const validationSchema = object({
    assignToSjbtUser: string().required("Please select a assignee"),
  });

  

  //   Handle Submit
  const handleSubmit = (
    values: FormInitialValues,
    { setSubmitting }: FormikHelpers<FormInitialValues>
  ) => {
    ChangeAssignee({
      id: applicationId,
      body: values,
    }).then((res: any) => {
      if (res.error) {
        showToast("error", res?.error?.data?.message);
        setSubmitting(false);
      } else {
        if (res?.data?.status) {
          showToast("success", res?.data?.message);
          setSubmitting(false);
          onClose();
        } else {
          showToast("error", res?.data?.message);
          setSubmitting(false);
        }
      }
    });
  };

  return (
    <Dialog open={true} maxWidth="xs" fullWidth>
      <div className="px-4">
        <div className={`text-md  py-2 font-medium text-primary-main `}>
          Change Assignee
        </div>
      </div>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            setFieldValue,
            isSubmitting,
          }: FormikProps<FormInitialValues>) => (
            <Form>
              <div className="flex flex-col gap-4">
              <ATMSelect
                  name="assignToSjbtUser"
                  value={values.assignToSjbtUser}
                  onChange={(newValue) => {
                    setFieldValue("assignToSjbtUser", newValue);
                  }}
                  options={assigneeList}
                  label="Assignee"
                  isLoading={isFetching || isLoading}
                  isSearch
                />
                
                <div className="flex justify-end gap-3">
                  <ATMLoadingButton
                    className="border-primary-main text-primary-main bg-white"
                    onClick={onClose}
                  >
                    Cancel
                  </ATMLoadingButton>

                  <ATMLoadingButton
                    type="submit"
                    isLoading={isSubmitting}
                    className="bg-primary-main"
                  >
                    Submit
                  </ATMLoadingButton>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeAssigneeDialogWrapper;
