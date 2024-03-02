import React, { useState, useEffect } from "react";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import { Formik, Form, FormikHelpers } from "formik";
import { object, string } from "yup";
import EditOtherService from "./EditOtherService";
import { showToast } from "src/utils/toaster/showToast";
import { useNavigate, useParams } from "react-router-dom";
import { OtherServicesListResponse } from "src/models/OtherServices.model";
import ATMPageLoader from "src/components/UI/atoms/ATMPageLoader/ATMPageLoader";
import {
  useGetSingleOtherServicesQuery,
  useUpdateOtherServicesMutation,
} from "src/services/OtherServicesService";
import { SelectOption } from "src/models/FormField/FormField.model";
import { useGetStaticPagesListWithoutPaginationQuery } from "src/services/StaticPagesService";

export type OtherServiceInitialValues = {
  serviceName: string;
  serviceDescription: string;
  staticPageId: string;
};

export type DropdownOptions = {
  staticPageOptions: SelectOption[];
};

const EditOtherServiceWrapper = () => {
  const { otherServiceId = "" } = useParams();
  const [staticPageOptions, setStaticPageOptions] = useState<
    SelectOption[] | []
  >([]);
  const {
    data: staticData,
    isLoading: staticDataIsLoading,
    isFetching: staticDataIsFetching,
  } = useGetStaticPagesListWithoutPaginationQuery("");

  const navigate = useNavigate();
  const [updateMenuLink] = useUpdateOtherServicesMutation();
  const { data, isLoading, isFetching } =
    useGetSingleOtherServicesQuery(otherServiceId);
  const [otherServiceWrapper, setOtherServiceWrapper] =
    useState<OtherServicesListResponse | null>(null);

  const initialValues: OtherServiceInitialValues = {
    serviceName: otherServiceWrapper?.serviceName || "",
    serviceDescription: otherServiceWrapper?.serviceDescription || "",
    staticPageId: otherServiceWrapper?.staticPageId || "",
  };

  // Setting Static PAge Data
  useEffect(() => {
    if (!staticDataIsFetching || !staticDataIsLoading) {
      setStaticPageOptions(
        staticData?.data?.map((e: { name: string; _id: string }) => {
          return {
            label: e.name,
            value: e._id,
          };
        })
      );
    }
  }, [staticData, staticDataIsLoading, staticDataIsFetching]);

  useEffect(() => {
    if (!isFetching && !isLoading) {
      setOtherServiceWrapper(data?.data);
    }
  }, [isLoading, isFetching, data]);

  // Form Validation Schema
  const validationSchema = object({
    serviceName: string().required("Service Name is Required"),
    serviceDescription: string().required("Service Description is Required"),
    staticPageId: string().required("Static Page is Required"),
  });

  // Form submit handler
  const handleSubmit = (
    values: OtherServiceInitialValues,
    { setSubmitting }: FormikHelpers<OtherServiceInitialValues>
  ) => {
    updateMenuLink({
      id: otherServiceId,
      body: values,
    }).then((res: any) => {
      if (res.error) {
        showToast("error", res?.error?.data?.message);
        setSubmitting(false);
      } else {
        showToast("success", res?.data?.message);
        navigate("/other-services");
        setSubmitting(false);
      }
    });
  };
  if (isFetching || isLoading) {
    return <ATMPageLoader />;
  }

  // Dropdown Option
  const dropdownOptions: DropdownOptions = {
    staticPageOptions,
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
          <Form className="h-full" noValidate>
            <EditOtherService
              formikProps={formikProps}
              dropdownOptions={dropdownOptions}
            />
          </Form>
        </SideNavLayout>
      )}
    </Formik>
  );
};

export default EditOtherServiceWrapper;
