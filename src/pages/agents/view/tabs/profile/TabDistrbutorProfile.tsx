import Tooltip from "@mui/material/Tooltip/Tooltip";
import React from "react";
import { IoCopyOutline } from "react-icons/io5";
import ATMCopyToClipboard from "src/components/UI/atoms/ATMCopyToClipboard/ATMCopyToClipboard";
import ATMImageZoomer from "src/components/UI/atoms/ATMImageZoomer/ATMImageZoomer";
import { DistributorListResponse } from "src/models/Agents.model";
import AuthHOC from "src/userAccess/AuthHOC";
import { DistributorProfilePropType } from "./TabDistrbutorProfileWrapper";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import { FormikProps } from "formik";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";

type Props = {
  distributorData: DistributorListResponse | null;
  props: FormikProps<DistributorProfilePropType>;
  loading: any;
};

// Section Heading
const SectionHeading = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="border-l-[3px] border-primary-main px-3 py-2 text-slate-700 font-medium text-[15px] ">
      {children}
    </div>
  );
};

// Document Card
const DocumentCard = ({
  title,
  imageUrl,
}: {
  title: string;
  imageUrl: string;
}) => {
  return (
    <Tooltip title="Click to Zoom">
      <div
        data-src={imageUrl}
        className={`rounded p-3 border border-black cursor-zoom-in transition-all ${
          !imageUrl.endsWith(".pdf") && "hover:opacity-50"
        }`}
      >
        <div className="text-primary-main text-sm font-medium">{title}</div>
        <div className="mt-2">
          {imageUrl.endsWith(".pdf") ? (
            <iframe
              className="w-full h-[150px] rounded"
              title="declaration-form"
              src={imageUrl}
            />
          ) : (
            <img src={imageUrl} className="w-full h-[150px] rounded" alt="" />
          )}
        </div>
      </div>
    </Tooltip>
  );
};

const TabDistrbutorProfile = ({ distributorData, props, loading }: Props) => {
  const [isCopied, setIsCopied] = React.useState(false);
  const { values, setFieldValue } = props;

  const documentsList = [
    {
      title: "Aadhar Card",
      imageUrl: values?.adhaarCardImage || "",
    },
    {
      title: "Cancelled Cheque",
      imageUrl: values?.cancelChequeImage || "",
    },
    {
      title: "Pan Card",
      imageUrl: values?.panCardImage || "",
    },
    {
      title: "Declaration Form",
      imageUrl: values?.declarationFormPhotoUrl || "",
    },
  ].concat(
    Array(2).map(() => {
      return {
        title: "Other Document",
        imageUrl: "",
      };
    })
  );

  return (
    <div className="px-5 h-full  ">
      <div className="rounded border p-3 h-full shadow flex flex-col gap-3 overflow-auto">
        {/* Basic Info Card */}
        <div className="bg-slate-100 rounded py-3 pr-2 flex justify-between">
          <div className="flex">
            {/* SJBT Code */}
            <AuthHOC type="FIELD" moduleName="DISTRIBUTORS" field="sjbtCode">
              <div className="px-3 flex gap-2 items-center">
                <div className="font-medium "> SJBT Code </div>
                <div className="bg-primary-light px-3 py-1 rounded-full text-primary-main text-sm flex gap-2 items-center   ">
                  {distributorData?.sjbtCode}
                  <ATMCopyToClipboard
                    tooltipTitle={isCopied ? "Copied" : "Copy"}
                    copyText={values?.sjbtCode || ""}
                    onCopy={() => {
                      setIsCopied(true);
                      setTimeout(() => {
                        setIsCopied(false);
                      }, 1000);
                    }}
                  >
                    <IoCopyOutline />
                  </ATMCopyToClipboard>
                </div>
              </div>
            </AuthHOC>
          </div>
        </div>

        <div className="flex flex-col gap-3 overflow-auto ">
          {/* Personal Information */}
          <div className="py-3 flex flex-col gap-3 border-t border-slate-500 ">
            <SectionHeading> PERSONAL INFORMATION </SectionHeading>

            <div className="grid grid-cols-3 gap-5 p-3">
              <ATMTextField
                name="name"
                label="Name"
                value={values?.name?.toUpperCase()}
                placeholder="name"
                onChange={(e) => {
                  setFieldValue("name", e.target.value);
                }}
              />
              <ATMTextField
                name="email"
                label="Email"
                value={values?.email?.toUpperCase()}
                placeholder="email"
                onChange={(e) => {
                  setFieldValue("email", e.target.value);
                }}
              />
              <ATMTextField
                name="mobileNumber"
                disabled={true}
                label="Mobile Number"
                value={values?.mobileNumber}
                placeholder="mobileNumber"
                onChange={(e) => {
                  setFieldValue("mobileNumber", e.target.value);
                }}
              /> 
               <ATMTextField
                name="panNumber"
                disabled={true}
                label="Pan Number"
                value={values?.panNumber}
                placeholder="panNumber"
                onChange={(e) => {
                  setFieldValue("panNumber", e.target.value);
                }}
              />
              <ATMTextField
                name="fatherName"
                label="Father's Name"
                value={values?.fatherName?.toUpperCase()}
                placeholder="fatherName"
                onChange={(e) => {
                  setFieldValue("fatherName", e.target.value);
                }}
              />
              <ATMTextField
                name="address"
                label="Area-Locality"
                value={values?.address?.toUpperCase()}
                placeholder="address"
                onChange={(e) => {
                  setFieldValue("address", e.target.value);
                }}
              />
              <ATMTextField
                name="cityVillageName"
                label="City-Village Name"
                value={values?.cityVillageName?.toUpperCase()}
                placeholder="cityVillageName"
                onChange={(e) => {
                  setFieldValue("cityVillageName", e.target.value);
                }}
              />
              <ATMTextField
                name="district"
                label="District"
                value={values?.district?.toUpperCase()}
                placeholder="District"
                onChange={(e) => {
                  setFieldValue("district", e.target.value);
                }}
              />
               <ATMTextField
                name="pincode"
                label="Pincode"
                value={values?.pincode?.toUpperCase()}
                placeholder="Pincode"
                onChange={(e) => {
                  setFieldValue("pincode", e.target.value);
                }}
              />

              <ATMTextField
                name="state"
                label="State"
                value={values?.state?.toUpperCase()}
                placeholder="state"
                onChange={(e) => {
                  setFieldValue("state", e.target.value);
                }}
              />
            </div>
          </div>

          {/* Documents */}
          <div className="py-3 flex flex-col gap-3 border-t border-slate-500">
            <SectionHeading> DOCUMENTS </SectionHeading>
            <ATMImageZoomer>
              {documentsList.map((document, documentIndex) => (
                <DocumentCard
                  title={document.title}
                  imageUrl={document.imageUrl}
                  key={documentIndex}
                />
              ))}
            </ATMImageZoomer>
          </div>

          {/* Other Information */}
          <div className="py-3 flex flex-col gap-3 border-t border-slate-500">
            <SectionHeading> OTHER INFORMATION </SectionHeading>

            <div className="grid grid-cols-3 gap-5 p-3">
              <ATMTextField
                name="firmName"
                label="Firm Name"
                value={values?.firmName?.toUpperCase()}
                placeholder="firmName"
                onChange={(e) => {
                  setFieldValue("firmName", e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end ">
          <ATMLoadingButton
            children="Upload Profile"
            type="submit"
            isLoading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default TabDistrbutorProfile;
