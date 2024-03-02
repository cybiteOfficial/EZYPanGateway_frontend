import React from "react";
import { GoDeviceMobile } from "react-icons/go";
import { useParams } from "react-router-dom";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import ATMBreadCrumbs, {
  BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import ATMPageLoader from "src/components/UI/atoms/ATMPageLoader/ATMPageLoader";
import {
  useGetSinglePanQuery,
} from "src/services/PANService";
import ViewPanCardApplication from "./VIewPanCardApplication";
import AuthHOC from "src/userAccess/AuthHOC";
import ATMCopyToClipboard from "src/components/UI/atoms/ATMCopyToClipboard/ATMCopyToClipboard";
import { IoCopyOutline } from "react-icons/io5";
import { BsDot } from "react-icons/bs";

type Props = {};

const breadcrumbs: BreadcrumbType[] = [
  {
    label: "PAN",
    icon: GoDeviceMobile,
    path: "/pan/PENDING",
  },
  {
    label: "PAN Details",
    icon: GoDeviceMobile,
  },
];

const ViewPanCardApplicationWrapper = (props: Props) => {
  const { panApplicationId } = useParams();
  const [applicationData, setApplicationData] = React.useState<any>(null);
  const [isCopied, setIsCopied] = React.useState(false);

  const { data, isFetching, isLoading } =
    useGetSinglePanQuery(panApplicationId);
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

  const totalPriceValue =
    applicationData?.mainCategoryPrice > 0
      ? applicationData?.mainCategoryPrice
      : applicationData?.basePrice + applicationData?.convinienceCharges;
  return (
    <>
      <SideNavLayout>
        <div className="grow border-b rounded-r h-full overflow-auto flex flex-col gap-5 ">
          {/* BreadCrumbs */}
          <div className="px-4 pt-5">
            {breadcrumbs && <ATMBreadCrumbs breadcrumbs={breadcrumbs} />}
          </div>
          {/* View Layout fields */}
          <div className="flex px-4 items-start gap-2 justify-between">
           <div className="md:flex  gap-9">
           <div className="text-lg  text-primary-dark font-medium px-2">
              {" "}
              {applicationData?.name}
              <div className="text-sm text-slate-600">
                {" "}
                {applicationData?.mobileNumber || "-"}{" "}
              </div>
            </div>
            <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3  xs:grid-cols-2 gap-y-3">
              {/* SJBT CODE */}
              <div className="px-2 2xl:border-r-[1.5px] xl:border-r-[1.5px]  border-black ">
                <div className="font-medium text-sm text-center">
                  {" "}
                  SJBT Code{" "}
                </div>
                <div className="bg-primary-light px-3 py-1 rounded-full text-primary-main text-xs flex gap-2 items-center ">
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
              {/* SRN Number */}
              <AuthHOC moduleName="PAN_APPLICATIONS" type="FIELD" field="srn">
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
              <div className="px-3 2xl:border-r-[1.5px] xl:border-r-[1.5px]  border-black text-center">
                <div className="font-medium text-sm text-center ">
                  Total Price
                </div>
                <div className="bg-primary-light px-3 py-1 rounded-full text-primary-main text-xs flex gap-2 items-center justify-center">
                  {" "}
                  &#8377;
                  {`${totalPriceValue || 0}+ ${
                    applicationData?.additionalCat2 || 0
                  } + ${applicationData?.additionalCat3 || 0}`}
                </div>
              </div>
              {/* REWARD USED */}
              <AuthHOC
                moduleName="PAN_APPLICATIONS"
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
                moduleName="PAN_APPLICATIONS"
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
              {/* Application Type */}
              <div className="px-3 2xl:border-r-[1.5px] xl:border-r-[1.5px]  border-black text-center">
                <div className="font-medium text-sm ">Application Type </div>
                <div className="bg-primary-light px-3 py-1 rounded-full text-primary-main text-xs flex gap-2 items-center justify-center">
                  {" "}
                  {applicationData?.applicationType || ""}
                </div>
              </div>
              {/*PAN Number */}
              {applicationData?.applicationType === "CORRECTION" && (
                <div className="px-2 2xl:border-r-[1.5px] xl:border-r-[1.5px]  border-black text-center">
                  <div className="font-medium text-sm ">PAN Number</div>
                  <div className="bg-primary-light px-3 py-1 rounded-full text-primary-main text-sm flex gap-2 items-center justify-center text-red-700 font-bold">
                    {applicationData?.panNumber || ""}
                  </div>
                </div>
              )}
              {/* Category */}
              <div className="px-3 items-center 2xl:border-r-[1.5px] xl:border-r-[1.5px]  border-black ">
                <div className="font-medium text-sm text-center">
                  {" "}
                  Category{" "}
                </div>
                <div className="bg-primary-light px-3 py-1 rounded-full text-primary-main text-xs flex gap-2 items-center ">
                  {applicationData?.paymentCategory?.length
                    ? applicationData?.paymentCategory
                        ?.map((category: any) => category?.name)
                        .join(" , ")
                    : "N/A"}
                </div>
              </div>
              {/*Order Id */}
              <AuthHOC
                moduleName="PAN_APPLICATIONS"
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
            <div className="bg-primary-light px-3  pt-[6px] rounded-full text-primary-main text-sm flex font-medium h-8 w-20 2xl:mt-0 sm:mt-0  xs:mt-3 text-center justify-center">
              {applicationData?.appliedFrom}
              {applicationData?.appliedFrom === "APP" && (
                <>
                  <BsDot className="text-black text-xl " />
                  {applicationData?.version}
                </>
              )}
            </div>
          </div>
          <ViewPanCardApplication applicationData={applicationData} />
        </div>
      </SideNavLayout>
   
    </>
  );
};

export default ViewPanCardApplicationWrapper;
