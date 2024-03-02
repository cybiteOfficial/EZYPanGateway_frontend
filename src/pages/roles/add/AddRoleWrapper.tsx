import React, { useEffect, useState } from "react";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import { Formik, Form, FormikHelpers } from "formik";
// import { array, object, string } from "yup";
import AddRole from "./AddRole";
import { useGetAllAccessModuleListQuery } from "src/services/AccessModuleService";
import { AccessModuleListResponse } from "src/models/AccessModule.model";
import { useAddRolesMutation } from "src/services/RolesService";
import { showToast } from "src/utils/toaster/showToast";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";

export type AddRoleInitialValues = {
  roleName: string;
  modules: {
    moduleGroup: string;
    actions: string[];
    fields: {
      fieldName: string;
      displayName: string;
    }[];
  }[];
};

const AddRoleWrapper = () => {
  const navigate = useNavigate();
  const [AccesModuleData, setAccessModuleData] = useState<
    AccessModuleListResponse[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [addRoles] = useAddRolesMutation();

  const {
    data: AccessModule,
    isLoading: isLoadingAccessModule,
    isFetching: isFetchingAccessModule,
  } = useGetAllAccessModuleListQuery("");

  useEffect(() => {
    if (!isFetchingAccessModule && !isLoadingAccessModule) {
      setAccessModuleData(AccessModule?.data || []);
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [AccessModule, isLoadingAccessModule, isFetchingAccessModule]);

  // Form Initial Values
  const initialValues: AddRoleInitialValues = {
    roleName: "",
    modules: [],
  };
  const validationSchema =object({
    roleName: string().required("Role Name is required"),
    
  })

  // Form Submit Handler
  const handleSubmit = async (
    values: AddRoleInitialValues,
    { setSubmitting }: FormikHelpers<AddRoleInitialValues>
  ) => {
    addRoles(values).then((res: any) => {
      if (res.error) {
        showToast("error", res?.error?.data?.message);
        setSubmitting(false);
      } else {
        showToast("success", res?.data?.message);
        navigate("/roles");
        setSubmitting(false);
      }
    });
  };
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
      {(formikProps) => (
        <SideNavLayout>
          <Form className="h-full">
            <AddRole
              formikProps={formikProps}
              modulesOptions={AccesModuleData}
              isLoading= {isLoading}
            />
          </Form>
        </SideNavLayout>
      )}
    </Formik>
  );
};

export default AddRoleWrapper;
