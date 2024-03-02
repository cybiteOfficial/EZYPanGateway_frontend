import React from "react";
import { BiAbacus } from "react-icons/bi";
import { GoDeviceMobile } from "react-icons/go";
import ViewLayout from "src/components/layouts/ViewLayout/ViewLayout";
import { BreadcrumbType } from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import {
  useGetSingleRetailerQuery,
} from "src/services/RetailerServices";
import RetailerInfoCard from "./RetailerInfoCard";
import { getTabs } from "src/utils/auth/getTabs";
import { switchToAuthModule } from "src/utils/auth/switchToAuthModule";
import { AccessAction } from "src/utils/Enums/AccessAction";
import { useParams } from "react-router-dom";

type Props = {};


const breadcrumbs: BreadcrumbType[] = [
  {
    label: "Retailers",
    icon: GoDeviceMobile,
    path: "/retailer",
  },
  {
    label: "Retailer View",
    icon: GoDeviceMobile,
  },
];


const tabs = [
  {
    label: "APPLICATIONS",
    moduleName: [
      "PAN_APPLICATIONS",
      "ITR_APPLICATIONS",
      "GUMASTA_APPLICATIONS",
      "DSC_APPLICATIONS",
      "MSME_APPLICATIONS",
      "STC_DIGITAL_PAN",
    ],
    icon: BiAbacus,
    type: "MODULE",
    path: "applications",
  },
  {
    label: "PROFILE",
    icon: BiAbacus,
    accessAction: AccessAction.VIEW,
    moduleName: "RETAILERS",
    path: "profile",
  },
  {
    label: "LEDGER",
    icon: BiAbacus,
    type: "MODULE",
    moduleName: ["COMMISSIONS", "REWARDS", "REFUND_WALLET_TRANSACTIONS"],
    path: switchToAuthModule([
      {
        moduleName: "REWARDS",
        path: "ledger/reward",
      },
      {
        moduleName: "REFUND_WALLET_TRANSACTIONS",
        path: "ledger/refund-balance",
      },
    ]),
  },
  {
    moduleName: "USERS",
    accessAction: AccessAction.CHECK_LOGS,
    label: "LOGS",
    icon: BiAbacus,
    path: "log",
  },
];

const ViewRetailer = (props: Props) => {
  // States
  
  const [selectedRetailer, setSelectedRetailer] = React.useState<any>(null);

  const { retailerId } = useParams();

  // Get Single Query
  const {
    data: singleRetailer,
    isFetching: isSingleRetailerFetching,
    isLoading: isSingleRetailerLoading,
  } = useGetSingleRetailerQuery(retailerId);

  // Setting Selected Retailer
  React.useEffect(() => {
    if (!isSingleRetailerFetching && !isSingleRetailerLoading) {
      setSelectedRetailer(singleRetailer?.data || null);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSingleRetailerFetching, isSingleRetailerLoading, singleRetailer]);

  return (
    <ViewLayout
      breadcrumbs={breadcrumbs} 
      hideSearchBox
      infoCard={
        <RetailerInfoCard
          infoData={{
            name: selectedRetailer?.name,
            mobile: selectedRetailer?.mobileNumber,
          }}
          isInfoLoading={isSingleRetailerFetching || isSingleRetailerLoading}
        />
      }
      tabs={getTabs(tabs)}
     
    />
  );
};

export default ViewRetailer;
