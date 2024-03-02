import React from "react";
import ATMTable from "src/components/UI/atoms/ATMTable/ATMTable";
import ATMBreadCrumbs, {
  BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import AuthHOC from "src/userAccess/AuthHOC";
import NotAuthorizedPage from "src/components/UI/NotAuthorized/NotAuthorizedPage";
import { AccessAction } from "src/utils/Enums/AccessAction";

type Props = {
  columns: any[];
  rows: any[];
};

const SubscriptionListing = ({ columns, rows }: Props) => {
  const subscriptionState: any = useSelector(
    (state: RootState) => state.subscription
  );
  const { isTableLoading } = subscriptionState;

  const breadcrumbs: BreadcrumbType[] = [
    {
      label: "Dashboard",
      path: "/",
      icon: IoPersonCircleOutline,
    },
    {
      label: "Subscription",
      icon: FiUser,
    },
  ];

  return (
    <AuthHOC
      moduleName="SUBSCRIPTIONS"
      action={AccessAction.LIST}
      alt={<NotAuthorizedPage />}
    >
      <div className="flex flex-col gap-2 px-4 pt-3 h-full ">
        {/* Breadcrumbs */}
        <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
        <div className="pt-2"></div>
        <div className="border flex flex-col overflow-auto rounded bg-white">
          {/* Table */}
          <div className="border flex flex-col grow overflow-auto rounded bg-white">
            <ATMTable
              columns={columns}
              rows={rows}
              isLoading={isTableLoading}
            />
          </div>
        </div>
      </div>
    </AuthHOC>
  );
};

export default SubscriptionListing;
