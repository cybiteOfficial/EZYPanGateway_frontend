import React, { useEffect, useState } from "react";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import { Formik, Form, FormikHelpers } from "formik";
import { object, string } from "yup";
import AddOtherService from "./AddOtherServices";
import { showToast } from "src/utils/toaster/showToast";
import { useNavigate } from "react-router-dom";
import { useAddOtherServicesMutation } from "src/services/OtherServicesService";
import { SelectOption } from "src/models/FormField/FormField.model";
import { useGetStaticPagesListWithoutPaginationQuery } from "src/services/StaticPagesService";

export type OtherServicesInitialValues = {
  serviceName: string;
  serviceDescription: string;
  staticPageId: string;
};

export type DropdownOptions = {
  staticPageOptions: SelectOption[];
};

const AddOtherServicesWrapper = () => {
  const navigate = useNavigate();
  const [AddOtherServices] = useAddOtherServicesMutation();
  const [staticPageOptions, setStaticPageOptions] = useState<
    SelectOption[] | []
  >([]);
  const { data, isLoading, isFetching } =
    useGetStaticPagesListWithoutPaginationQuery("");

  // Form Initial Values
  const initialValues: OtherServicesInitialValues = {
    serviceName: "",
    serviceDescription: "",
    staticPageId: "",
  };

  // Setting Static PAge Data
  useEffect(() => {
    if (!isFetching || !isLoading) {
      setStaticPageOptions(
        data?.data?.map((e: { name: string, _id : string }) => {
          return {
            label: e.name,
            value: e._id,
          };
        })
      );
    }
  }, [data, isLoading, isFetching]);

  // Form Validation Schema
  const validationSchema = object({
    serviceName: string().required("Service Name is required"),
    serviceDescription: string().required("Service Description is required"),
    staticPageId: string().required("Static Page  is required"),
  });

  // Form Submit Handler
  const handleSubmit = (
    values: OtherServicesInitialValues,
    { setSubmitting }: FormikHelpers<OtherServicesInitialValues>
  ) => {
    AddOtherServices(values).then((res: any) => {
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

  // Dropdown Option
  const dropdownOptions: DropdownOptions = {
    staticPageOptions,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <SideNavLayout>
          <Form className="h-full" noValidate>
            <AddOtherService
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

export default AddOtherServicesWrapper;
