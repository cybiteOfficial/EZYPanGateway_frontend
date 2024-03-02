import React from "react";
import ATMImageZoomer from "src/components/UI/atoms/ATMImageZoomer/ATMImageZoomer";
import { RetailerListResponse } from "src/models/Retailer.model";
import Tooltip from "@mui/material/Tooltip/Tooltip";
import AuthHOC from "src/userAccess/AuthHOC";
import { FormikProps } from "formik"; 
import { RetailerProfileUpdatePropType } from "./TabRetailerProfileWrapper";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
type Props = {
  retailerData: RetailerListResponse | null;
  props:FormikProps<RetailerProfileUpdatePropType>;
  loading:any
};

// Section Heading
const SectionHeading = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="border-l-[3px] border-primary-main px-3 py-2 text-slate-700 font-medium text-[15px] ">
      {children}
    </div>
  );
};

// Field
// const InfoField = ({
//   label,
//   value,
//   accessField,
// }: {
//   label: string;
//   value: string;
//   accessField?: string;
// }) => {
//   const [isCopied, setIsCopied] = React.useState(false);
//   if (accessField) {
//     return (
//       <AuthHOC moduleName="RETAILERS" field={accessField} type="FIELD">
//         <div>
//           <div className=" font-medium text-primary-main text-sm">
//             {" "}
//             {label}{" "}
//           </div>
//           <div className="bg-stone-100 p-2 flex justify-between items-center rounded mt-1 text-sm">
//             {value}
//             <ATMCopyToClipboard
//               tooltipTitle={isCopied ? "Copied" : "Copy"}
//               copyText={value}
//               onCopy={() => {
//                 setIsCopied(true);
//                 setTimeout(() => {
//                   setIsCopied(false);
//                 }, 1000);
//               }}
//             >
//               <IoCopyOutline />
//             </ATMCopyToClipboard>
//           </div>
//         </div>
//       </AuthHOC>
//     );
//   }
//   return (
//     <div>
//       <div className=" font-medium text-primary-main text-sm"> {label} </div>
//       <div className="bg-stone-100 p-2 flex justify-between items-center rounded mt-1 text-sm">
//         {value}
//         <ATMCopyToClipboard
//           tooltipTitle={isCopied ? "Copied" : "Copy"}
//           copyText={value}
//           onCopy={() => {
//             setIsCopied(true);
//             setTimeout(() => {
//               setIsCopied(false);
//             }, 1000);
//           }}
//         >
//           <IoCopyOutline />
//         </ATMCopyToClipboard>
//       </div>
//     </div>
//   );
// };

const TabRetailerProfile = ({ retailerData , props , loading}: Props) => { 
     
  const { values, setFieldValue} = props;


  const documentsList = [
    {
      title: "Aadhar Card",
      imageUrl: retailerData?.adhaarCardImage,
    },
    {
      title: "PAN Card",
      imageUrl: retailerData?.panCardImage,
    },
    {
      title: "Cancelled Cheque",
      imageUrl: retailerData?.cancelChequeImage,
    },
  ];

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
          // data-lg-size={1400}
          data-src={imageUrl}
          className="rounded p-3 border border-black cursor-zoom-in hover:opacity-50 transition-all  "
        >
          <div className="text-primary-main text-sm font-medium">{title}</div>
          <div className="mt-2">
            <img src={imageUrl} className="w-full h-[150px] rounded" alt="" />
          </div>
        </div>
      </Tooltip>
    );
  };

  return (
    <div className="px-5 h-full  ">
      <div className="rounded border p-3 h-full shadow flex flex-col gap-3 overflow-auto">
        <div className="flex flex-col gap-3 overflow-auto ">
          {/* Personal Information */}
          <div className="py-3 flex flex-col gap-3  border-slate-500 ">
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
                  imageUrl={document.imageUrl || ""}
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
              <AuthHOC moduleName="RETAILERS" field="sjbtCode" type="FIELD">
                <div className="col-span-2">
                  <div className=" font-medium text-primary-main text-sm">
                    Distributor Codes
                  </div>
                  <div className="bg-stone-100 p-2 flex justify-between items-center rounded mt-1 text-sm">
                    {retailerData?.allDistributor
                      ?.map((distributor) => distributor?.sjbtCode)
                      .join(", ")}
                  </div>
                </div>
              </AuthHOC>
            </div>
          </div>
        </div> 
        <div className="flex justify-end " >
          <ATMLoadingButton 
           children='Upload Profile'
           type="submit"
           isLoading={loading}
          />

        </div>
      </div>
    </div>
  );
};

export default TabRetailerProfile;
