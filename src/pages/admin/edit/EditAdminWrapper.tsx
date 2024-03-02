import React, { useEffect, useState } from "react";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import { Formik, Form, FormikHelpers } from "formik";
import { number, object, string } from "yup";
import { SelectOption } from "src/models/FormField/FormField.model";
import { indianPhoneRegex } from "src/utils/regularExpression";
import EditAdmin from "./EditAdmin";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetAdminByIdQuery,
  useUpdateAdminMutation,
} from "src/services/AdminServices";
import { AdminListResponse } from "src/models/Admin.model";
import ATMPageLoader from "src/components/UI/atoms/ATMPageLoader/ATMPageLoader";
import { showToast } from "src/utils/toaster/showToast";
import { useGetRolesListWithoutPaginationQuery } from "src/services/RolesService";
import { ValidApplicationStatus } from "src/utils/ValidApplicationStatus";

export type AdminInitialValues = {
  userName: string;
  email: string;
  printWaitTime: any;
  mobile: any;
  adminRoleGroupName: string;
  maximumInprogressCount: number;
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

const EditAdminWrapper = () => {
  const { adminId = "" } = useParams();
  const [roleOptions, setRoleOptions] = useState<SelectOption[] | []>([]);
  const {
    data: roleData,
    isLoading: roleDataIsloading,
    isFetching: roleDataIsFetching,
  } = useGetRolesListWithoutPaginationQuery("");
  const navigate = useNavigate();
  const [updateAdmin] = useUpdateAdminMutation();
  const { data, isLoading, isFetching } = useGetAdminByIdQuery(adminId);
  const [adminWrapper, setAdminWrapper] = useState<AdminListResponse | null>(
    null
  );
  useEffect(() => {
    if (!isFetching && !isLoading && data?.data) {
      setAdminWrapper(data.data);
    }
  }, [isLoading, isFetching, data]);

  // Setting Role Data
  useEffect(() => {
    if (!roleDataIsloading || !roleDataIsFetching) {
      setRoleOptions(
        roleData?.data?.map((role: { roleName: string }) => {
          return {
            label: role.roleName,
            value: role.roleName,
          };
        })
      );
    }
  }, [roleData, roleDataIsFetching, roleDataIsloading]);

  // Form Initial Values
  const initialValues: AdminInitialValues = {
    userName: adminWrapper?.userName || "",
    email: adminWrapper?.email || "",
    mobile: adminWrapper?.mobile || "",
    adminRoleGroupName: adminWrapper?.adminRoleGroupName || "",
    printWaitTime: adminWrapper?.printWaitTime || "",
    maximumInprogressCount: adminWrapper?.maximumInprogressCount || 0,
    applicationStatusAccess: adminWrapper?.applicationStatusAccess || [],
  };
  // Form Validation Schema
  const validationSchema = object({
    userName: string().required("Full Name is required"),
    maximumInprogressCount: number()
      .min(1, "Maximum Inprogress Count should be greater than 0")
      .required("InProgress Count is REQUIRED"),
    printWaitTime: number()
      .min(1, "Print Wait Time should be greater than 0")
      .required("Print Wait Time is required"),
    email: string()
      .email("Email must be valid")
      .trim()
      .required("Email is required"),
    mobile: string()
      .trim()
      .matches(indianPhoneRegex, "Invalid Mobile Number")
      .nullable()
      .required("Mobile is required"),
    adminRoleGroupName: string().required("Please select atleast one Role"),
  });

  // Form Submit Handler
  const handleSubmit = (
    values: AdminInitialValues,
    { setSubmitting }: FormikHelpers<AdminInitialValues>
  ) => {
    updateAdmin({
      id: adminId,
      body: values,
    }).then((res: any) => { 
      if (res.error) {
        showToast("error", res?.error?.data?.message);
        setSubmitting(false);
      } else {
        showToast("success", res?.data?.message);
        navigate("/admins");
        setSubmitting(false);
      }
    });
  };
  if (isFetching || isLoading) {
    return <ATMPageLoader />;
  }

  // Dropdown Option
  const dropdownOptions: DropdownOptions = {
    roleOptions,
  };
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <SideNavLayout>
          <Form className="h-full">
            <EditAdmin
              formikProps={formikProps}
              dropdownOptions={dropdownOptions}
            />
          </Form>
        </SideNavLayout>
      )}
    </Formik>
  );
};

export default EditAdminWrapper;
