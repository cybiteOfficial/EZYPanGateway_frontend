import React from "react";
import { useParams } from "react-router-dom";
import ATMPageLoader from "src/components/UI/atoms/ATMPageLoader/ATMPageLoader";
import { RetailerListResponse } from "src/models/Retailer.model";
import { useGetSingleRetailerQuery } from "src/services/RetailerServices";
import { useUpdateDistributorProfileMutation } from "src/services/DistributorServices";
import TabRetailerProfile from "./TabRetailerProfile";
import { object, string } from "yup";
import { showToast } from "src/utils/toaster/showToast";
import { Formik, Form } from "formik";

export type RetailerProfileUpdatePropType = {
  name: string;
  mobileNumber: string;
  email: string;
  dob: string;
  fatherName: string;
  address: string;
  area: string;
  cityVillageName: string;
  district: string;
  state: string;
  adhaarCardImage: string;
  panCardImage: string;
  cancelChequeImage: string;
  pincode: any;
  firmName: string;
};

const TabRetailerProfileWrapper = () => {
  const { retailerId } = useParams();
  const [retailerData, setRetailerData] =
    React.useState<RetailerListResponse | null>(null);

  // Fetching Data
  const { data, isFetching, isLoading } = useGetSingleRetailerQuery(
    retailerId || ""
  );

  const [updateProfile, updateProfileInfo] =
    useUpdateDistributorProfileMutation();

  // Setting Retailer Data
  React.useEffect(() => {
    if (!isFetching && !isLoading) {
      setRetailerData(data?.data || null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching, isLoading, data]);

  if (isFetching || isLoading) {
    return <ATMPageLoader />;
  }

  const validationSchema = object({
    name: string().trim().required("name is required"),
    email: string().email().trim().required("email is required"),
    fatherName: string().trim().required("father name is required"),
    firmName: string().trim().required("firm name is required"),
    address: string().trim().required("address is required"),
  });
  const handleSubmit = (
    values: RetailerProfileUpdatePropType,
    resetForm: any
  ) => {
    const updateData = {
      name: values?.name,
      email: values?.email,
      dob: values?.dob ? values.dob.split("/")?.reverse().join("-") : "",
      fatherName: values?.fatherName,
      firmName: values?.firmName,
      address: values?.address,
    };
    updateProfile({
      distributorId:retailerData?._id,
      body: updateData,
    }).then((res: any) => {
      if (res?.data?.status) {
        values.dob = values.dob.split("/")?.reverse().join("-");
        showToast("success", res?.data?.message);
      } else {
        if (res?.error?.data) {
          showToast("error", res.error.data?.message);
        } else {
          showToast("error", res.data?.message);
        }
      }
    });
  };
 
  const initialValue: RetailerProfileUpdatePropType = {
    name: retailerData?.name || "",
    email: retailerData?.email || "",
    mobileNumber: retailerData?.mobileNumber || "",
    dob: retailerData?.dob
      ? retailerData?.dob.split("-")?.reverse().join("/")
      : "" || "",
    fatherName: retailerData?.fatherName || "",
    firmName: retailerData?.firmName || "",
    pincode: retailerData?.pincode || "",
    address: retailerData?.address || "",
    area: retailerData?.area || "",
    cityVillageName: retailerData?.cityVillageName || "",
    district: retailerData?.district || "",
    state: retailerData?.state || "",
    panCardImage: retailerData?.panCardImage || "",
    adhaarCardImage: retailerData?.adhaarCardImage || "",
    cancelChequeImage: retailerData?.cancelChequeImage || "",
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValue}
      validationSchema={validationSchema}
      onSubmit={(values: any, { resetForm }) => {
        handleSubmit(values, resetForm);
      }}
    >
      {(props: any) => (
        <Form>
          <TabRetailerProfile
            loading={updateProfileInfo?.isLoading}
            props={props}
            retailerData={retailerData}
          />
        </Form>
      )}
    </Formik>
  );
};

export default TabRetailerProfileWrapper;
