import React from "react";
import ATMBreadCrumbs, {
  BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import ATMTable from "src/components/UI/atoms/ATMTable/ATMTable";
import { IoPersonCircleOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { BasePriceListResponse } from "src/models/BasePrice.model";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import AuthHOC from "src/userAccess/AuthHOC";
import { AccessAction } from "src/utils/Enums/AccessAction";
import NotAuthorizedPage from "src/components/UI/NotAuthorized/NotAuthorizedPage";

type Props = {
  columns: columnTypes[];
  rows: BasePriceListResponse[];
};

const BasePriceListing = ({ columns, rows }: Props) => {
  const basePriceState: any = useSelector(
    (state: RootState) => state.basePrice
  );

  const { isTableLoading } = basePriceState;

  const breadcrumbs: BreadcrumbType[] = [
    {
      label: "Dashboard",
      path: "/",
      icon: IoPersonCircleOutline,
    },
    {
      label: "Base Price",
      icon: RxDashboard,
    },
  ];

  return (
    <AuthHOC
      moduleName="PRICE_CONFIGS"
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

export default BasePriceListing;
