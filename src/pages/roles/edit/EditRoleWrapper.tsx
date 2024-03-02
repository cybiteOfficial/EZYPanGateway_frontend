import React, { useEffect, useState } from "react";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import { Formik, Form, FormikHelpers } from "formik";
// import { array, object, string } from "yup";
import EditRole from "./EditRole";
import {
  useGetRolesByIdQuery,
  useUpdateRolesMutation,
} from "src/services/RolesService";
import { useNavigate, useParams } from "react-router-dom";
import { RoleListResponse } from "src/models/Role.model";
import ATMPageLoader from "src/components/UI/atoms/ATMPageLoader/ATMPageLoader";
import { showToast } from "src/utils/toaster/showToast";
import { AccessModuleListResponse } from "src/models/AccessModule.model";
import { useGetAllAccessModuleListQuery } from "src/services/AccessModuleService";
import { object, string } from "yup";

export type EditRoleInitialValues = {
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

const EditRoleWrapper = () => {
  const {roleId = "" } = useParams();
  const navigate = useNavigate();
  const [updateRoles] = useUpdateRolesMutation();
  const [RoleData, setRoleData] = useState<RoleListResponse | null>(null);
  const { data, isLoading, isFetching } = useGetRolesByIdQuery(roleId);
  const initialValues: EditRoleInitialValues = {
    roleName: RoleData?.roleName || "",
    modules: RoleData?.modules || [],
  };

  const [AccesModuleData, setAccessModuleData] = useState<
    AccessModuleListResponse[]
  >([]);
  const [isModuleLoading, setIsModuleLoading] = useState(false);

  const validationSchema =object({
    roleName: string().required("Role Name is required"),
    
  })

  const {
    data: AccessModule,
    isLoading: isLoadingAccessModule,
    isFetching: isFetchingAccessModule,
  } = useGetAllAccessModuleListQuery("");

  useEffect(() => {
    if (!isFetchingAccessModule && !isLoadingAccessModule) {
      setAccessModuleData(AccessModule?.data);
      setIsModuleLoading(false)
    } else {
      setIsModuleLoading(false)
    }
  }, [AccessModule, isLoadingAccessModule, isFetchingAccessModule]);

  useEffect(() => {
    if (!isFetching && !isLoading) {
      setRoleData(data?.data);
    }
  }, [isLoading, isFetching, data]);


  // Form Submit Handler
  const handleSubmit =  (
    values: EditRoleInitialValues,
    { setSubmitting }: FormikHelpers<EditRoleInitialValues>
  ) => { 
    setSubmitting(true)
    updateRoles({
      id: roleId,
      body: values,
    }).then((res: any) => {
      if (res.error) {
        showToast("error", res?.error?.data?.message);
        setSubmitting(false);
      } else
      {
        if(res?.data?.status){
          showToast("success",res?.data?.message)
        navigate("/roles");
        setSubmitting(false);
        }
        else{
          showToast("error",res?.data.message)
        setSubmitting(false);

        }
      }
     
    });
  };
  if (isFetching || isLoading) {
    return <ATMPageLoader />;
  }

  return (
    <Formik enableReinitialize initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
      {(formikProps) => (
        <SideNavLayout>
          <Form className="h-full">
            <EditRole
              formikProps={formikProps}
              modulesOptions={AccesModuleData}
              isLoading={isModuleLoading}
            />
          </Form>
        </SideNavLayout>
      )}
    </Formik>
  );
};

export default EditRoleWrapper;
