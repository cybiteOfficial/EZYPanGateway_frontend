import moment from "moment";
import React, { useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import { TbFileDownload } from "react-icons/tb";
import AOCodeListDialogWrapper from "src/components/AOCodeListDialog/AOCodeListDialogWrapper";
import ATMCopyToClipboard from "src/components/UI/atoms/ATMCopyToClipboard/ATMCopyToClipboard";
import ATMImageZoomer from "src/components/UI/atoms/ATMImageZoomer/ATMImageZoomer";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import { useDeleteZipFileMutation } from "src/services/AdminServices";
import {
  useChangePANStatusMutation,
  useGetPanZipMutation,
} from "src/services/PANService";
import { useNavigate } from "react-router-dom";
import AuthHOC from "src/userAccess/AuthHOC";
import { AccessAction } from "src/utils/Enums/AccessAction";
import { showToast } from "src/utils/toaster/showToast";
import { useParams } from "react-router-dom";
import { showConfirmationDialog } from "src/utils/showConfirmationDialog";
import ApplicationRejectionDialogWrapper from "src/components/ApplicationRejectionDialog/ApplicationRejectionDialogWrapper";
import ApplicationVerifyDialogWrapper from "src/components/ApplicationVerifyDialog/ApplicationVerifyDialogWrapper";
import Tooltip from "@mui/material/Tooltip";

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
      <AuthHOC moduleName="PAN_APPLICATIONS" type="FIELD" field={accessField}>
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
        className="rounded p-3 border border-black cursor-zoom-in hover:opacity-50 transition-all"
      >
        <div className="text-primary-main text-sm font-medium">{title}</div>
        <div className="mt-2">
          <img src={imageUrl} className="w-full h-[150px] rounded" alt="" />
        </div>
      </div>
    </Tooltip>
  );
};

const ViewPanCardApplication = ({ applicationData }: Props) => {
  const { panApplicationId } = useParams();
  const [isOpenAOCodeDialog, setIsOpenAOCodeDialog] = React.useState(false);
  const [isZipDownloading, setIAsZipDownloading] = React.useState(false);
  const [isOpenVerifyDialog, setIsOpenVerifyDialog] = useState(false);
  const [panIdVerfiy, setPanIdVerfiy] = useState("");
  const [isOpenRejectionDialog, setIsOpenRejectionDialog] = useState(false);
  const [panIdReject, setPanIdReject] = useState("");
  const navigate = useNavigate();
  const [downloadZip] = useGetPanZipMutation();
  const [deleteZipFile] = useDeleteZipFileMutation();
  const [changeStatus] = useChangePANStatusMutation();

  const documentsList =
    applicationData?.applicationType === "NEW"
      ? [
          {
            title: "Aadhar Card Front",
            imageUrl: applicationData?.adhaarFrontPhotoUrl,
          },
          {
            title: "Aadhar Card Back",
            imageUrl: applicationData?.adhaarBackPhotoUrl,
          },
          {
            title: "PAN Form Front",
            imageUrl: applicationData?.panFormFrontPhotoUrl,
          },
          {
            title: "PAN Form Back  ",
            imageUrl: applicationData?.panFormBackPhotoUrl,
          },
          {
            title: "Passport Photo",
            imageUrl: applicationData?.passportPhotoUrl,
          },
          {
            title: "Signature",
            imageUrl: applicationData?.signaturePhotoUrl,
          },
        ].concat(
          Array.isArray(applicationData?.otherDocuments)
            ? applicationData?.otherDocuments?.map((document: any) => {
                return {
                  title: document.title || "Other Document",
                  imageUrl: document.imageUrl,
                };
              })
            : []
        )
      : [
          {
            title: "Aadhar Card Front",
            imageUrl: applicationData?.adhaarFrontPhotoUrl,
          },
          {
            title: "Aadhar Card Back",
            imageUrl: applicationData?.adhaarBackPhotoUrl,
          },
          {
            title: "PAN Form Front",
            imageUrl: applicationData?.panFormFrontPhotoUrl,
          },
          {
            title: "PAN CARD FRONT  ",
            imageUrl: applicationData?.panCardFront,
          },
          {
            title: "Passport Photo",
            imageUrl: applicationData?.passportPhotoUrl,
          },
          {
            title: "Signature",
            imageUrl: applicationData?.signaturePhotoUrl,
          },
        ].concat(
          Array.isArray(applicationData?.otherDocuments)
            ? applicationData?.otherDocuments?.map((document: any) => {
                return {
                  title: document.title || "Other Document",
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
  } 

 // Check payment category for application
  const CheckPaymentCategory = (array: any, category: string) => {
    return array?.some((item: any) => item?.code === category);
  };
  return (
    <div className="px-5 grow overflow-auto relative ">
      <div className="rounded border p-3 2xl:h-full xl:h-full lg:h-full md:h-full shadow flex flex-col gap-3">
        {applicationData?.status === "REJECT" && (
          <div className="grid md:grid-cols-3 xs:grid-cols-1">
            <InfoField
              label="Rejection Reason"
              value={applicationData?.rejectionReason}
              accessField="email"
            />
          </div>
        )}

        <div>
          <InfoField
            label="Comment"
            value={applicationData?.comments || "N/A"}
          />
        </div>
        {/* Find AO Code Button */}
        <div
          className={`flex ${
            applicationData?.status !== "PENDING" &&
            applicationData?.status !== "REJECT" &&  applicationData?.status !== "IN_PROGRESS"  && applicationData?.status !== "CANCELLED"
              ? "justify-between"
              : "justify-end"
          } gap-2  items-stretch border-b border-slate-300 pb-2`}
        >
          {applicationData?.status !== "PENDING" &&
            applicationData?.status !== "REJECT" && applicationData?.status !== "IN_PROGRESS" && applicationData?.status !== "CANCELLED" && (
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
            )}

          <div className="flex items-end">
            <AuthHOC moduleName="CITY_CODES" action={AccessAction.LIST}>
              <ATMLoadingButton
                onClick={() => setIsOpenAOCodeDialog(true)}
                className="p-2 rounded"
              >
                Find AO Codes
              </ATMLoadingButton>
            </AuthHOC>
          </div>
        </div>

        <div className="flex flex-col gap-3 overflow-auto ">
          {/* Personal Information */}
          <div className="py-3 flex flex-col gap-3 border-t border-slate-500 ">
            <SectionHeading> PERSONAL INFORMATION </SectionHeading>

            <div className="grid 2xl:grid-cols-3 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-6 p-3">
              <InfoField
                label="Name"
                value={applicationData?.name}
                accessField="name"
              />
              <InfoField
                label={
                  applicationData?.parentType === "FATHER"
                    ? "Father's Name"
                    : "Mother's Name"
                }
                value={applicationData?.parentName || "N/A"}
              />
              <InfoField
                label="Date of Birth (DOB)"
                value={moment(applicationData?.dob, "yyyy-MM-DD").format(
                  "DD-MM-yyyy"
                )}
              />
              <InfoField
                label="Mobile Number"
                value={applicationData?.mobileNumber}
                accessField="mobileNumber"
              />
              <InfoField
                label="Email"
                value={applicationData?.email}
                accessField="email"
              />
              <InfoField
                label="Aadhar Number"
                value={applicationData?.adhaarNumber}
              />
            </div>
          </div>

          {/* Documents */}
          <div
            className={`py-3 flex flex-col gap-3  ${
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

          {/* Other Information */}
          <div className="pt-3 flex flex-col gap-3 border-t border-slate-500">
            <SectionHeading> OTHER INFORMATION</SectionHeading>
            <div className="grid 2xl:grid-cols-3 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-5 p-3">
              <InfoField
                label="Applied By"
                value={applicationData?.appliedAsType || "N/A"}
              />
              <InfoField
                label="Applied By Number"
                value={applicationData?.appliedByNumber || "N/A"}
              />
            </div>

            {applicationData?.appliedByType === "DISTRIBUTOR" &&
              applicationData?.baseCatAppied === "CAT_DSA" && (
                <div className="grid 2xl:grid-cols-3 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-5 p-3">
                  <InfoField
                    label="Distributor Code"
                    value={applicationData?.distributorCode || "N/A"}
                  />
                  <InfoField
                    label="Distributor Name"
                    value={applicationData?.appliedByName || "N/A"}
                  />
                  <InfoField
                    label="Distributor Mobile No."
                    value={applicationData?.appliedByNumber || "N/A"}
                  />
                  <InfoField
                    label="Distributor PAN No."
                    value={applicationData?.appliedByUserPanNumber || "N/A"}
                  />
                  <InfoField
                    label="Firm Name"
                    value={applicationData?.appliedByUserFirmName || "N/A"}
                  />
                  <div>
                    <InfoField
                      label="Address"
                      value={
                        applicationData?.appliedByUserCurrentAddress || "N/A"
                      }
                    />
                  </div>
                </div>
              )}

            {applicationData?.appliedAsType === "RETAILER" &&
             (CheckPaymentCategory(applicationData?.paymentCategory ,"CAT_DSA" ) || applicationData?.baseCatAppied === 'CAT_DSA' ) && (
                <div className="grid 2xl:grid-cols-3 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-5 p-3">
                  <InfoField
                    label="Distributor Code"
                    value={applicationData?.distributorCode || "N/A"}
                  />
                  <InfoField
                    label="Retailer Name"
                    value={applicationData?.retailerName || "N/A"}
                  />
                  <InfoField
                    label="Retailer Mobile No."
                    value={applicationData?.retailerMobileNumber || "N/A"}
                  />
                  <InfoField
                    label="Retailer PAN No."
                    value={applicationData?.retailerPanNumber || "N/A"}
                  />
                  <InfoField
                    label="Firm Name"
                    value={applicationData?.retailerFirmName || "N/A"}
                  />
                  <div>
                    <InfoField
                      label="Address"
                      value={
                        applicationData?.appliedByUserCurrentAddress || "N/A"
                      }
                    />
                  </div>
                </div>
              )}

            <div className=" flex flex-col  ">
              {applicationData?.status === "DONE" && (
                <div className="grid 2xl:grid-cols-3 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-5 p-3">
                  <InfoField
                    label="Generated By"
                    value={applicationData?.generatedByName}
                    accessField="generatedByName"
                  />
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
        {/* Action Buttons */}
        <div className="flex gap-2 justify-center items-center sticky bottom-0">
          {applicationData?.status === "IN_PROGRESS" && (
            <div className=" flex gap-1">
              <AuthHOC
                forApplicationStatus={true}
                applicationName="PAN"
                applicationStatus="VERIFY"
              >
                <ATMLoadingButton
                  onClick={() => {
                    setPanIdVerfiy(panApplicationId || " ");
                    setIsOpenVerifyDialog(true);
                  }}
                  loadingText="Please wait..."
                  className="px-3 py-3 rounded bg-green-500 text-white text-[12px] font-medium w-48 "
                >
                  VERIFY
                </ATMLoadingButton>
              </AuthHOC>
              <AuthHOC
                forApplicationStatus={true}
                applicationName="PAN"
                applicationStatus="REJECT"
              >
                <ATMLoadingButton
                  onClick={() => {
                    setPanIdReject(panApplicationId || " ");
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

          {applicationData?.status === "GENERATE" && (
            <AuthHOC
              forApplicationStatus={true}
              applicationName="PAN"
              applicationStatus="DONE"
            >
              <ATMLoadingButton
                onClick={() =>
                  showConfirmationDialog({
                    title: "Heads Up",
                    text: "Are you sure want to Done ?",
                    icon: "question",
                    showCancelButton: true,
                    next: (result) => {
                      if (result.isConfirmed) {
                        const formData = new FormData();
                        formData.append("requestedStatus", "DONE");

                        changeStatus({
                          id: panApplicationId || "",
                          body: formData,
                        }).then((res: any) => {
                          if (res.error) {
                            showToast("error", res.error.data?.message);
                          } else {
                            if (res.data?.status) {
                              showToast("success", res.data?.message);
                              navigate("/pan/GENERATE");
                            } else {
                              showToast("error", res.data?.message);
                            }
                          }
                        });
                      }
                    },
                  })
                }
                loadingText="Please wait..."
                className="px-3 py-3 rounded bg-status-done text-white text-[12px] font-medium w-48"
              >
                DONE
              </ATMLoadingButton>
            </AuthHOC>
          )}
        </div>
      </div>

      {/* Download Zip Button */}

      <div className="2xl:absolute xl:absolute lg:absolute md:absolute right-3 bottom-2 ">
        <AuthHOC moduleName="PAN_APPLICATIONS" action={AccessAction.ZIP}>
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
          type="PAN"
          onClose={() => setIsOpenVerifyDialog(false)}
          onSubmit={(formData) => {
            changeStatus({ id: panIdVerfiy || "", body: formData }).then(
              (res: any) => {
                if (res?.error) {
                  showToast("error", res?.error?.data?.message);
                } else {
                  if (res?.data?.status) {
                    showToast("success", res?.data?.message);
                    navigate("/pan/PENDING");
                  } else {
                    showToast("error", res?.data?.message);
                  }
                }
              }
            );
          }}
        />
      )}

      {isOpenRejectionDialog && (
        <ApplicationRejectionDialogWrapper
          onClose={() => setIsOpenRejectionDialog(false)}
          onSubmit={(formData) =>
            changeStatus({ id: panIdReject || "", body: formData }).then(
              (res: any) => {
                if (res?.error) {
                  showToast("error", res?.error?.data?.message);
                } else {
                  if (res?.data?.status) {
                    showToast("success", res?.data?.message);
                    navigate("/pan/PENDING");
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

export default ViewPanCardApplication;
