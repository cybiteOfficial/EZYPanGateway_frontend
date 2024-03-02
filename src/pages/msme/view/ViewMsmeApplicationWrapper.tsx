import React from "react";
import { GoDeviceMobile } from "react-icons/go";
import {  useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import ATMBreadCrumbs, {
  BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import ATMPageLoader from "src/components/UI/atoms/ATMPageLoader/ATMPageLoader";
import {
  useChangeMSMEStatusMutation,
  useGetSingleMsmeQuery,
} from "src/services/MSMEService";
import ViewMsmeApplication from "./ViewMsmeApplication";
import AuthHOC from "src/userAccess/AuthHOC";
import ATMCopyToClipboard from "src/components/UI/atoms/ATMCopyToClipboard/ATMCopyToClipboard";
import { IoCopyOutline } from "react-icons/io5";
import { BsDot } from "react-icons/bs";

type Props = {};

const breadcrumbs: BreadcrumbType[] = [
  {
    label: "MSME",
    icon: GoDeviceMobile,
    path: "/msme/PENDING",
  },
  {
    label: "MSME Details",
    icon: GoDeviceMobile,
  },
];

const ViewMsmeCardApplicationWrapper = (props: Props) => {
  const { msmeApplicationId } = useParams();
  const [isCopied , setIsCopied] = React.useState(false);
  const [applicationData, setApplicationData] = React.useState<any>(null);

  const { data, isFetching, isLoading } =
    useGetSingleMsmeQuery(msmeApplicationId);


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [changeStatus] = useChangeMSMEStatusMutation();

  //   Setting Application Data
  React.useEffect(() => {
    if (!isFetching && !isLoading) {
      setApplicationData(data?.data || null);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isFetching, data]);

  if (isFetching || isLoading) {
    return <ATMPageLoader />;
  }
  return (
    <>
      <SideNavLayout>
        <div className="grow border-b rounded-r h-full overflow-auto flex flex-col gap-5 ">
          {/* BreadCrumbs */}
          <div className="px-4 pt-5">
            {breadcrumbs && <ATMBreadCrumbs breadcrumbs={breadcrumbs} />}
          </div>
          {/* View Layout fields */}
          <div className="flex  px-4 justify-between items-start gap-2">
         <div className="flex gap-9">
         <div className="text-lg  text-primary-dark font-medium ">
              {" "}
              {applicationData?.propritorName}
              <div className="text-sm text-slate-600">
                {" "}
                {applicationData?.mobileNumber || "-"}{" "}
              </div>
            </div>
            <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-4 xs:grid-cols-2 gap-y-3">
                <AuthHOC
               moduleName="MSME_APPLICATIONS" type="FIELD" field="distributorCode"
                >
                  <div className="px-2 2xl:border-r-[1.5px] xl:border-r-[1.5px]  border-black ">
                    <div className="font-medium text-sm text-center">
                      {" "}
                      SJBT Code{" "}
                    </div>
                    <div className="bg-primary-light px-3 py-1 rounded-full text-primary-main text-xs flex gap-2 items-center justify-center">
                      {applicationData?.distributorCode || "N/A"}
                      <ATMCopyToClipboard
                        tooltipTitle={isCopied ? "Copied" : "Copy"}
                        copyText={applicationData?.distributorCode}
                        onCopy={() => {
                          setIsCopied(true);
                          setTimeout(() => {
                            setIsCopied(false);
                          }, 1000);
                        }}
                      >
                        <IoCopyOutline />
                      </ATMCopyToClipboard>{" "}
                    </div>
                  </div>
                </AuthHOC>
                {/* SRN Number */}
                <AuthHOC
                moduleName="MSME_APPLICATIONS" type="FIELD" field="srn"
                >
                  <div className="px-2 2xl:border-r-[1.5px] xl:border-r-[1.5px]  border-black ">
                    <div className="font-medium text-sm text-center"> SRN </div>
                    <div className="bg-primary-light px-3 py-1 rounded-full text-primary-main text-xs flex gap-2 items-center">
                      {applicationData?.srn}
                      <ATMCopyToClipboard
                        tooltipTitle={isCopied ? "Copied" : "Copy"}
                        copyText={applicationData?.srn}
                        onCopy={() => {
                          setIsCopied(true);
                          setTimeout(() => {
                            setIsCopied(false);
                          }, 1000);
                        }}
                      >
                        <IoCopyOutline />
                      </ATMCopyToClipboard>{" "}
                    </div>
                  </div>
                </AuthHOC>
                {/*Total Price */}
                <AuthHOC
                 moduleName="ITR_APPLICATIONS"
                 type="FIELD"
                 field="totalPrice"
                >
                  <div className="px-3 2xl:border-r-[1.5px] xl:border-r-[1.5px]  border-black text-center">
                    <div className="font-medium text-sm text-center ">
                      Total Price
                    </div>
                    <div className="bg-primary-light px-3 py-1 rounded-full text-primary-main text-xs flex gap-2 items-center justify-center">
                    &#8377; {applicationData?.basePrice}
                    </div>
                  </div>
                </AuthHOC>

                {/* REWARD USED */}
                <AuthHOC
                    moduleName="MSME_APPLICATIONS"
                    type="FIELD"
                    field="rewardWalletAmountApplied"
                >
                  <div className="px-1 2xl:border-r-[1.5px] xl:border-r-[1.5px]  border-black text-center">
                    <div className="font-medium text-sm  text-center">
                      {" "}
                      Reward Used{" "}
                    </div>
                    <div className="bg-primary-light px-1 py-1 rounded-full text-primary-main text-xs flex gap-2 items-center font-medium justify-center">
                      &#8377; {applicationData?.rewardWalletAmountApplied?.toFixed(2)}
                    </div>
                  </div>
                </AuthHOC>
                {/* REFUND USED */}
                <AuthHOC
                      moduleName="MSME_APPLICATIONS"
                      type="FIELD"
                      field="refundWalletAmountApplied"
                >
                  <div className="px-1 2xl:border-r-[1.5px] xl:border-r-[1.5px]  border-black text-center">
                    <div className="font-medium text-sm text-center">
                      {" "}
                      Refund Used{" "}
                    </div>
                    <div className="bg-primary-light px-1 py-1 rounded-full text-primary-main text-xs flex gap-2 items-center font-medium justify-center">
                      &#8377; {applicationData?.refundWalletAmountApplied?.toFixed(2)}
                    </div>
                  </div>
                </AuthHOC>
                {/*Order Id */}
                <AuthHOC
              moduleName="MSME_APPLICATIONS"
              type="FIELD"
              field="uniqueTransactionId"
                >
                  <div className="px-2 text-center 2xl:border-r-[1.5px] xl:border-r-[1.5px]  border-black">
                    <div className="font-medium text-sm mr-2">Order Id</div>
                    <div className="bg-primary-light px-3 py-1 rounded-full text-primary-main text-xs flex gap-2 items-center">
                      {applicationData?.uniqueTransactionId}
                      <ATMCopyToClipboard
                        tooltipTitle={isCopied ? "Copied" : "Copy"}
                        copyText={applicationData?.uniqueTransactionId}
                        onCopy={() => {
                          setIsCopied(true);
                          setTimeout(() => {
                            setIsCopied(false);
                          }, 1000);
                        }}
                      >
                        <IoCopyOutline />
                      </ATMCopyToClipboard>{" "}
                    </div>
                  </div>
                </AuthHOC>
              </div>

         </div> 
            {/* Application From */}
            <div className="bg-primary-light px-3  pt-[6px] rounded-full text-primary-main text-sm flex font-medium h-8 w-20 2xl:mt-0 sm:mt-0  xs:mt-3 text-center">
            {applicationData?.appliedFrom}
            {applicationData?.appliedFrom === "APP" && (
              <>
                <BsDot className="text-black text-xl" />
                {applicationData?.version}
              </>
            )}
          </div>
           
         
          </div>
          <ViewMsmeApplication applicationData={applicationData} />
        </div>
      </SideNavLayout>

   
    </>
  );
};

export default ViewMsmeCardApplicationWrapper;
