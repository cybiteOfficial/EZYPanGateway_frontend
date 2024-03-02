import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ATMPageLoader from "src/components/UI/atoms/ATMPageLoader/ATMPageLoader";
import { DistributorListResponse } from "src/models/Agents.model";
import {
  useGetSingleDistributorQuery,
  useUpdateDistributorProfileMutation,
} from "src/services/DistributorServices";
import TabDistrbutorProfile from "./TabDistrbutorProfile";
import { Formik, Form } from "formik";
import { object, string } from "yup";
import { showToast } from "src/utils/toaster/showToast";

export type DistributorProfilePropType = {
  name: string;
  panNumber:string;
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
  declarationFormPhotoUrl: string;
  pincode: any;
  firmName: string;
  sjbtCode: string;
};

const TabDistrbutorProfileWrapper = () => {
  const { distributorId } = useParams();
  const [distributorData, setDistributorData] =
    React.useState<DistributorListResponse | null>(null);

  // Fetching Data
  const { data, isFetching, isLoading } = useGetSingleDistributorQuery(
    distributorId || ""
  );

  const [updateProfile, updateProfileInfo] =
    useUpdateDistributorProfileMutation();

  useEffect(() => {
    if (!isFetching && !isLoading) {
      setDistributorData(data?.data || null);
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

  const initialValue: DistributorProfilePropType = {
    sjbtCode: distributorData?.sjbtCode || "",
    panNumber:distributorData?.panNumber || "",
    name: distributorData?.name || "",
    email: distributorData?.email || "",
    mobileNumber: distributorData?.mobileNumber || "",
    dob: distributorData?.dob
      ? distributorData?.dob.split("-")?.reverse().join("/")
      : "" || "",
    fatherName: distributorData?.fatherName || "",
    firmName: distributorData?.firmName || "",
    pincode: distributorData?.pincode || "",
    address: distributorData?.address || "",
    area: distributorData?.area || "",
    cityVillageName: distributorData?.cityVillageName || "",
    district: distributorData?.district || "",
    state: distributorData?.state || "",
    panCardImage: distributorData?.panCardImage || "",
    adhaarCardImage: distributorData?.adhaarCardImage || "",
    cancelChequeImage: distributorData?.cancelChequeImage || "",
    declarationFormPhotoUrl: distributorData?.declarationFormPhotoUrl || "",
  };
  // Setting Distributor Data
  const handleSubmit = (values: DistributorProfilePropType, resetForm: any) => {
    const updateData = {
      name: values?.name,
      email: values?.email,
      dob: values?.dob ? values.dob.split("/")?.reverse().join("-") : "",
      fatherName: values?.fatherName,
      firmName: values?.firmName,
      address: values?.address,
      area: values?.area,
      cityVillageName: values?.cityVillageName,
      district: values?.district,
      pincode: values?.pincode,
      state: values?.state,
    };
    updateProfile({
      distributorId: distributorData?._id,
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

  return (
    <>
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
            <TabDistrbutorProfile
              loading={updateProfileInfo?.isLoading}
              props={props}
              distributorData={distributorData}
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default TabDistrbutorProfileWrapper;
