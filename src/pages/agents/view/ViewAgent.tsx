import React from "react";
import { BiAbacus } from "react-icons/bi";
import { GoDeviceMobile } from "react-icons/go";
import ViewLayout from "src/components/layouts/ViewLayout/ViewLayout";
import { BreadcrumbType } from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import {
  useGetSingleDistributorQuery,
} from "src/services/DistributorServices";
import AgentInfoCard from "./AgentInfoCard";
import { getTabs } from "src/utils/auth/getTabs";
import { switchToAuthModule } from "src/utils/auth/switchToAuthModule";
import { AccessAction } from "src/utils/Enums/AccessAction";
import { useParams } from "react-router-dom";

type Props = {};

const breadcrumbs: BreadcrumbType[] = [
  {
    label: "Distributors",
    icon: GoDeviceMobile,
    path: "/distributor",
  },
  {
    label: "Distributor View",
    icon: GoDeviceMobile,
  },
];


const tabs = [
  {
    type: "MODULE",
    moduleName: [
      "PAN_APPLICATIONS",
      "ITR_APPLICATIONS",
      "GUMASTA_APPLICATIONS",
      "DSC_APPLICATIONS",
      "MSME_APPLICATIONS",
    ],
    label: "APPLICATIONS",
    icon: BiAbacus,
    path: "applications",
  },
  {
    type: "MODULE",
    moduleName: "RETAILERS",
    label: "RETAILERS",
    icon: BiAbacus,
    path: "retailers",
  },
  {
    accessAction: AccessAction.VIEW,
    moduleName: "DISTRIBUTORS",
    label: "PROFILE",
    icon: BiAbacus,
    path: "profile",
  },
  {
    type: "MODULE",
    moduleName: ["COMMISSIONS", "REWARDS", "REFUND_WALLET_TRANSACTIONS"],
    label: "LEDGER",
    icon: BiAbacus,
    path: switchToAuthModule([
      {
        moduleName: "COMMISSIONS",
        path: "ledger/commission",
      },
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
  {
    accessAction: AccessAction.CHECK_SUBSCRIPTION_HISTORY,
    moduleName: "DISTRIBUTORS",
    label: "SUBSCRIPTION HISTORY",
    icon: BiAbacus,
    path: "subscription-history",
  },
];

const ViewAgent = (props: Props) => {
  const [selectedDistributor, setSelectedDistributor] =
    React.useState<any>(null);

  const { distributorId } = useParams();

  const {
    data: singleDistributor,
    isFetching: isSingleDistributorFetching,
    isLoading: isSingleDistributorLoading,
  } = useGetSingleDistributorQuery(distributorId);

  React.useEffect(() => {
    if (!isSingleDistributorFetching && !isSingleDistributorLoading) {
      setSelectedDistributor(singleDistributor?.data || null);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isSingleDistributorFetching,
    isSingleDistributorLoading,
    singleDistributor,
  ]);

  return (
    <ViewLayout
      breadcrumbs={breadcrumbs}
      hideSearchBox
      infoCard={
        <AgentInfoCard
          infoData={{
            name: selectedDistributor?.name,
            mobile: selectedDistributor?.mobileNumber,
          }}
          isInfoLoading={
            isSingleDistributorFetching || isSingleDistributorLoading
          }
        />
      }
      tabs={getTabs(tabs)}
    
    />
  );
};

export default ViewAgent;
