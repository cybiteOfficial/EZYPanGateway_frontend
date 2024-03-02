import React from "react";
import ATMBreadCrumbs, {
  BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import ATMTable from "src/components/UI/atoms/ATMTable/ATMTable";
import { IoPersonCircleOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { BusinessOpportunityListResponse } from "src/models/BusinessOpportunity.model";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import AuthHOC from "src/userAccess/AuthHOC";
import NotAuthorizedPage from "src/components/UI/NotAuthorized/NotAuthorizedPage";
import { AccessAction } from "src/utils/Enums/AccessAction";

type Props = {
  columns: columnTypes[];
  rows: BusinessOpportunityListResponse[];
};

const ListBusinessOppurtunity = ({ columns, rows }: Props) => {
  const businessOpportunityState: any = useSelector(
    (state: RootState) => state.businessOpportunity
  );

  const { isTableLoading } = businessOpportunityState;

  const breadcrumbs: BreadcrumbType[] = [
    {
      label: "Dashboard",
      path: "/",
      icon: IoPersonCircleOutline,
    },
    {
      label: "Business Opportunity",
      icon: RxDashboard,
    },
  ];

  return (
    <AuthHOC
      moduleName="BUSINESS_OPPORTUNITIES"
      action={AccessAction.LIST}
      alt={<NotAuthorizedPage />}
    >
      <div className="flex flex-col gap-2 px-4 py-3 h-full">
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

export default ListBusinessOppurtunity;
