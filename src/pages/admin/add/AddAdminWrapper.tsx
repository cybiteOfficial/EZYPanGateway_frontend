import React, { useEffect, useState } from "react";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import { Formik, Form, FormikHelpers } from "formik";
import { number, object, ref, string } from "yup";
import { SelectOption } from "src/models/FormField/FormField.model";
import AddAdmin from "./AddAdmin";
import { indianPhoneRegex } from "src/utils/regularExpression";
import { useAddAdminMutation } from "src/services/AdminServices";
import { showToast } from "src/utils/toaster/showToast";
import { useNavigate } from "react-router-dom";
import { useGetRolesListWithoutPaginationQuery } from "src/services/RolesService";
import { ValidApplicationStatus } from "src/utils/ValidApplicationStatus";

export type AdminInitialValues = {
  userName: string;
  email: string;
  mobile: string;
  password: string;
  confirm_password: string;
  adminRoleGroupName: string;
  printWaitTime: any;
  maximumInprogressCount:number
  applicationStatusAccess:
    | {
        applicationType:
          | "PAN"
          | "ITR"
          | "GUMASTA"
          | "DSC"
          | "MSME"
          | "DIGITAL_PAN";
        status: ValidApplicationStatus;
      }[]
    | [];
};

export type DropdownOptions = {
  roleOptions: SelectOption[];
};

const AddAdminWrapper = () => {
  const [roleOptions, setRoleOptions] = useState<SelectOption[] | []>([]);
  const [addAdmin] = useAddAdminMutation();
  const navigate = useNavigate();
  const { data, isLoading, isFetching } =
    useGetRolesListWithoutPaginationQuery("");

  // Form Initial Values
  const initialValues: AdminInitialValues = {
    userName: "",
    email: "",
    mobile: "",
    printWaitTime: "" || 0,
    password: "",
    confirm_password: "",
    adminRoleGroupName: "",
    applicationStatusAccess: [],
    maximumInprogressCount :""||0,
  };

  // Setting Role Data
  useEffect(() => {
    if (!isFetching || !isLoading) {
      setRoleOptions(
        data?.data?.map((role: { roleName: string }) => {
          return {
            label: role.roleName,
            value: role.roleName,
          };
        })
      );
    }
  }, [data, isLoading, isFetching]);

  // Form Validation Schema
  const validationSchema = object({
    userName: string().required("Full Name is required"),
    maximumInprogressCount:number().min(1,"Maximum Inprogress Count should be greater than 0").required("InProgress Count is REQUIRED"),
    printWaitTime:number().min(1,"Print Wait Time should be greater than 0").required("Print Wait Time is required"),
    email: string()
      .email("Email must be valid")
      .trim()
      .required("Email is required"),
    mobile: string()
      .trim()
      .matches(indianPhoneRegex, "Invalid Mobile Number")
      .nullable()
      .required("Mobile is required"),
    password: string()
      .min(6, "Please enter at least 6 characters")
      .required("Password is required"),
    confirm_password: string()
      .trim()
      .required("Please confirm your Password")
      .when("password", {
        is: (val: any) => (val && val.length > 0 ? true : false),
        then: string()
          .oneOf(
            [ref("password")],
            " Password and Confirm Password need to be same"
          )
          .required("Please confirm your Password"),
      }),
      adminRoleGroupName: string().required("Please select atleast one Role"),
  });

  // Form Submit Handler
  const handleSubmit = (
    values: AdminInitialValues,
    { setSubmitting }: FormikHelpers<AdminInitialValues>
  ) => {
    addAdmin(values).then((res: any) => {
      if (res.error) {
        showToast("error", res?.error?.data?.message);
        setSubmitting(false);
      } else {
        if (res?.data?.status) {
          showToast("success", res?.data?.message);
          navigate("/admins");
          setSubmitting(false);
        } else {
          showToast("error", res?.data?.message);
          setSubmitting(false);
        }
      }
    });
  };
  // Dropdown Option
  const dropdownOptions: DropdownOptions = {
    roleOptions,
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
            <AddAdmin
              formikProps={formikProps}
              dropdownOptions={dropdownOptions}
              isLoading={isLoading || isFetching}
            />
          </Form>
        </SideNavLayout>
      )}
    </Formik>
  );
};

export default AddAdminWrapper;