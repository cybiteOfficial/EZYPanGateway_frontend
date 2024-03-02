import Tooltip from "@mui/material/Tooltip";
import React from "react";
import { IoCopyOutline } from "react-icons/io5";
import { TbFileDownload } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import AOCodeListDialogWrapper from "src/components/AOCodeListDialog/AOCodeListDialogWrapper";
import ApplicationRejectionDialogWrapper from "src/components/ApplicationRejectionDialog/ApplicationRejectionDialogWrapper";
import ApplicationVerifyDialogWrapper from "src/components/ApplicationVerifyDialog/ApplicationVerifyDialogWrapper";
import ATMCopyToClipboard from "src/components/UI/atoms/ATMCopyToClipboard/ATMCopyToClipboard";
import ATMImageZoomer from "src/components/UI/atoms/ATMImageZoomer/ATMImageZoomer";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import { useDeleteZipFileMutation } from "src/services/AdminServices";
import { useChangeDSCStatusMutation, useGetDscZipMutation } from "src/services/DSCService";
import AuthHOC from "src/userAccess/AuthHOC";
import { AccessAction } from "src/utils/Enums/AccessAction";
import { showToast } from "src/utils/toaster/showToast";

type Props = {
  applicationData: any;
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
const InfoField = ({
  label,
  value,
  accessField,
}: {
  label: string;
  value: string;
  accessField?: string;
}) => {
  const [isCopied, setIsCopied] = React.useState(false);

  if (accessField) {
    return (
      <AuthHOC moduleName="DSC_APPLICATIONS" type="FIELD" field={accessField}>
        <div>
          <div className=" font-medium text-primary-main text-sm">
            {" "}
            {label}{" "}
          </div>
          <div className="bg-stone-100 p-2 flex justify-between items-center rounded mt-1 text-sm">
            {value}
            <ATMCopyToClipboard
              tooltipTitle={isCopied ? "Copied" : "Copy"}
              copyText={value}
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
    );
  }

  return (
    <div>
      <div className=" font-medium text-primary-main text-sm"> {label} </div>
      <div className="bg-stone-100 p-2 flex justify-between items-center rounded mt-1 text-sm">
        {value}
        <ATMCopyToClipboard
          tooltipTitle={isCopied ? "Copied" : "Copy"}
          copyText={value}
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

const ViewDSCCardApplication = ({ applicationData }: Props) => { 
  const { dscApplicationId } = useParams();
  const [isOpenAOCodeDialog, setIsOpenAOCodeDialog] = React.useState(false);
  const [isZipDownloading, setIAsZipDownloading] = React.useState(false);
  const [downloadZip] = useGetDscZipMutation();
  const [deleteZipFile] = useDeleteZipFileMutation();
  const [changeStatus] = useChangeDSCStatusMutation();

  const [isOpenVerifyDialog, setIsOpenVerifyDialog] = React.useState(false);
  const [dscIdVerfiy, setDscIdVerfiy] = React.useState("");
  const [isOpenRejectionDialog, setIsOpenRejectionDialog] = React.useState(false);
  const [dscIdReject, setDscIdReject] = React.useState("");
  const navigate = useNavigate();

  const documentsList = [
    {
      title: "Aadhar Card",
      imageUrl: applicationData?.adhaarCardPhotoUrl,
    },
    {
      title: "PAN Card",
      imageUrl: applicationData?.panCardPhotoUrl,
    },
    {
      title: "Proprietor Photograph  ",
      imageUrl: applicationData?.photoUrl,
    },
  ].concat(
    Array.isArray(applicationData?.otherDocuments)
      ? applicationData?.otherDocuments?.map((document: any) => {
          return {
            title: document.title || "Other Documents",
            imageUrl: document.imageUrl,
          };
        })
      : []
  );

  // Download Zip
  const handleDownloadZip = (srn: string) => {
    setIAsZipDownloading(true);
    downloadZip(srn).then((res: any) => {
      if (res?.error) {
        showToast("error", res?.error?.data?.message);
        setIAsZipDownloading(false);
      } else {
        if (res?.data?.status) {
          let a = document.createElement("a");
          a.href = res?.data?.data;
          a.click();
          showToast("success", res?.data?.message);
          setIAsZipDownloading(false);
          deleteZipFile({
            folderUrl: res?.data?.data,
          });
        } else {
          showToast("error", res?.data?.message);
          setIAsZipDownloading(false);
        }
      }
    });
  };
  return (
    <div className="px-5 grow overflow-auto  ">
      <div className="rounded border p-3 2xl:h-full xl:h-full lg:h-full md:h-full shadow flex flex-col gap-3">
        {/* Basic Info Card */}
        { applicationData?.status === "REJECT" &&     <div className="grid md:grid-cols-3 xs:grid-cols-1">
            <InfoField
              label="Rejection Reason"
              value={applicationData?.rejectionReason}
              accessField="email"
            />
          </div>}
        <div
          className={`flex ${
            applicationData?.status === "VERIFY"
              ? "justify-between"
              : "justify-end"
          } gap-2  items-stretch border-b border-slate-300 pb-2`}
        >
          {applicationData?.status === "VERIFY" ? (
            <div className="grow flex gap-2">
              <div className="grow">
                <div className=" font-medium text-primary-main text-sm">
                  Remark
                </div>
                <div className="bg-stone-100 p-2 flex justify-between items-center rounded mt-1 text-sm">
                  {applicationData?.remark || "N/A"}
                </div>
              </div>
              <div className="flex items-end  ">
                <button className="p-2 border border-secondary-main rounded h-[37px] flex items-center">
                  <a
                    href={applicationData?.acknowledgementPdf || ""}
                    rel="noreferrer"
                    target="_blank"
                    className="text-secondary-main font-medium text-sm"
                  >
                    Download Ack. PDF
                  </a>
                </button>
              </div>
            </div>
          ): null}
        </div>
        <div className="flex flex-col gap-3 overflow-auto ">
          {/* DSC Information */}
            <div className="py-3 flex flex-col gap-3 border-t border-slate-500">
              <SectionHeading> DSC INFORMATION </SectionHeading>

              <div className="grid 2xl:grid-cols-3 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-6 p-3">
                <InfoField
                  label="Propritor Name"
                  value={applicationData?.propritorName}
                  accessField="propritorName"
                />
                <InfoField
                  label="Email"
                  value={applicationData?.email}
                  accessField="email"
                />
                <InfoField
                  label="Mobile Number"
                  value={applicationData?.mobileNumber}
                  accessField="mobileNumber"
                />
                <InfoField
                  label="Adhaar Number"
                  value={applicationData?.adhaarNumber}
                  accessField="adhaarNumber"
                />
              </div>
            </div>

          {/* Documents */}
          <div
            className={`py-3 flex flex-col gap-3 ${
              applicationData?.status !== "GENERATE" && "border-t"
            } border-slate-500`}
          >
            <SectionHeading> DOCUMENTS </SectionHeading>

            <ATMImageZoomer>
              {documentsList.map((document, documentIndex) => (
                <DocumentCard
                  key={documentIndex}
                  title={document.title}
                  imageUrl={document.imageUrl}
                />
              ))}
            </ATMImageZoomer>
          </div>

          {/* ADDRESS Information */}
          <div className="py-3 flex flex-col gap-3 border-t border-slate-500">
            <SectionHeading> ADDRESS INFORMATION </SectionHeading>

            <div className="grid 2xl:grid-cols-3 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-5 p-3">
             
                <InfoField label=" Address" value={applicationData?.address} /> 
                <InfoField
                label="Applied By"
                value={applicationData?.appliedAsType || "N/A"}
              />
              <InfoField
                label="Applied By Number"
                value={applicationData?.appliedByNumber || "N/A"}
              />
             
            </div>
            <div className=" flex flex-col gap-3 ">
              {applicationData?.status === "VERIFY" && (
                <div className="grid 2xl:grid-cols-3 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-5 p-3">
                  <InfoField
                    label="Verified By"
                    value={applicationData?.verifiedByName}
                    accessField="verifiedByName"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-2 justify-center items-center sticky bottom-0 bg-white  w-full">
            {/* Action Buttons */}
            <div className="flex gap-2">
              {applicationData?.status === "IN_PROGRESS" && (
                <div className=" flex gap-1">
                  <AuthHOC
                    forApplicationStatus={true}
                    applicationName="DSC"
                    applicationStatus="VERIFY"
                  >
                    <ATMLoadingButton
                      onClick={() => {
                        setDscIdVerfiy(dscApplicationId || " ");
                        setIsOpenVerifyDialog(true);
                      }}
                      loadingText="Please wait..."
                      className="px-3 py-3 rounded bg-green-500 text-white text-[12px] font-medium w-48"
                    >
                      VERIFY
                    </ATMLoadingButton>
                  </AuthHOC>
                  <AuthHOC 
                    forApplicationStatus={true}
                    applicationName="DSC"
                    applicationStatus="REJECT"
                  >
                    <ATMLoadingButton
                      onClick={() => {
                        setDscIdReject(dscApplicationId || " ");
                        setIsOpenRejectionDialog(true);
                      }}
                      loadingText="Please wait..."
                      className="px-3 py-3 rounded bg-red-500 text-white text-[12px] font-medium w-48"
                    >
                      REJECT
                    </ATMLoadingButton>
                  </AuthHOC>
                </div>
              )}
            </div>
        </div>
      </div>

      {/* Download Zip Button */}
      <div className="2xl:absolute xl:absolute lg:absolute md:absolute right-3 bottom-2">
        <AuthHOC moduleName="DSC_APPLICATIONS" action={AccessAction.ZIP}>
          <ATMLoadingButton
            isLoading={isZipDownloading}
            loadingText="Downloading..."
            onClick={() => handleDownloadZip(applicationData?.srn)}
          >
            <div className="flex gap-2 items-center">
              <TbFileDownload className="text-xl animate-bounce" /> Download Zip
            </div>
          </ATMLoadingButton>
        </AuthHOC>
      </div>

      {isOpenAOCodeDialog && (
        <AOCodeListDialogWrapper onClose={() => setIsOpenAOCodeDialog(false)} />
      )} 
       {isOpenVerifyDialog && (
        <ApplicationVerifyDialogWrapper 
         type="DSC"
          onClose={() => setIsOpenVerifyDialog(false)}
          onSubmit={(formData) =>
            changeStatus({ id: dscIdVerfiy || "", body: formData }).then(
              (res: any) => {
                if (res?.error) {
                  showToast("error", res?.error?.data?.message);
                } else {
                  if (res?.data?.status) {
                    showToast("success", res?.data?.message);
                    navigate("/dsc/PENDING");

                  } else {
                    showToast("error", res?.data?.message);
                  }
                }
              }
            )
          }
        />
      )}

      {isOpenRejectionDialog && (
        <ApplicationRejectionDialogWrapper
          onClose={() => setIsOpenRejectionDialog(false)}
          onSubmit={(formData) =>
            changeStatus({ id: dscIdReject || "", body: formData }).then(
              (res: any) => {
                if (res?.error) {
                  showToast("error", res?.error?.data?.message);
                } else {
                  if (res?.data?.status) {
                    showToast("success", res?.data?.message);
                    navigate("/dsc/PENDING");

                  } else {
                    showToast("error", res?.data?.message);
                  }
                }
              }
            )
          }
        />
      )}
    </div>
  );
};

export default ViewDSCCardApplication;
