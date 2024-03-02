import React from "react";
import { IconType } from "react-icons";
import { BiCard } from "react-icons/bi";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ATMBreadCrumbs, {
  BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import { getTabs } from "src/utils/auth/getTabs";

type Props = {};

const breadcrumbs: BreadcrumbType[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    label: "Ledger",
  },
];

const tabs: {
  label: string;
  icon: IconType;
  path: string;
  moduleName: string;
  type: "MODULE" | "ACTION" | "FIELD";
}[] = [
  {
    type: "MODULE",
    moduleName: "COMMISSIONS",
    label: "COMMISSION",
    icon: BiCard,
    path: "commission",
  },
  {
    type: "MODULE",
    moduleName: "REWARDS",
    label: "REWARD",
    icon: BiCard,
    path: "reward",
  },
  {
    type: "MODULE",
    moduleName: "REFUND_WALLET_TRANSACTIONS",
    label: "REFUND BALANCE",
    icon: BiCard,
    path: "refund-balance",
  },
];

const LedgerListing = (props: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname.split("/")[2];

  return (
    <div className="flex flex-col gap-2 pt-3 h-full">
      {/* Breadcrumbs */}
      <div className=" px-4">
        <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
      </div>

      <div className="flex flex-col grow overflow-auto">
        {/* Tabs */}
        {tabs?.length && (
          <div className="flex gap-4 items-center  border-b border-slate-300 bg-white ">
            {getTabs(tabs)?.map((tab, index) => {
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => navigate(tab.path)}
                  className={`h-full px-3 py-2 flex gap-2 items-center    focus:hover:text-primary-main font-medium text-sm
                                                 ${
                                                   currentPath === tab.path
                                                     ? "border-b-[2.5px] border-primary-main text-primary-main"
                                                     : "text-slate-700"
                                                 }
                                                 `}
                >
                  <div className=" text-lg  ">
                    <tab.icon />
                  </div>
                  {tab.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Outlet */}
        <div className="grow overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LedgerListing;
