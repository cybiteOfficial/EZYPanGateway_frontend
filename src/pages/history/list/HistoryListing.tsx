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
    label: "History",
  },
];

const tabs: {
  label: string;
  icon: IconType;
  path: string;
  moduleName: string;
  type: "MODULE" | "ACTION" | "FIELD";
  accessAction : string;
}[] = [
  {
    label: "PAN",
    moduleName: "PAN_APPLICATIONS",
    accessAction : "HISTORY",
    type: "MODULE",
    icon: BiCard,
    path: "pan",
  },
  {
    label: "ITR",
    moduleName: "ITR_APPLICATIONS",
    type: "MODULE",
    accessAction : "HISTORY",
    icon: BiCard,
    path: "itr",
  },
  {
    type: "MODULE",
    label: "Gumasta",
    moduleName: "GUMASTA_APPLICATIONS",
    accessAction : "HISTORY",
    icon: BiCard,
    path: "gumasta",
  },
  {
    label: "DSC",
    type: "MODULE",
    moduleName: "DSC_APPLICATIONS",
    icon: BiCard,
    accessAction : "HISTORY",
    path: "dsc",
  },
  {
    label: "MSME",
    type: "MODULE",
    moduleName: "MSME_APPLICATIONS",
    accessAction : "HISTORY",
    icon: BiCard,
    path: "msme",
  },
];

const HistoryListing = (props: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname.split("/")[2];


  return (
    <div className="flex flex-col gap-2 pt-3 h-full">
      {/* Breadcrumbs */}
      <div className=" px-4">
        <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
      </div>
      <div className="flex flex-col gap-2 pt-3 grow overflow-auto">
        <div className="flex flex-col grow overflow-auto">
          {/* Tabs */}
          {tabs?.length && (
            <div className="flex gap-3 items-center  mx-4  border-b border-slate-400 bg-white ">
              {getTabs(tabs)?.map((tab, index) => {
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => navigate(tab.path)}
                    className={`h-full px-5 pb-2 flex gap-2 border-b-[3px]  items-center hover:text-primary-main font-medium text-sm transition-all
        ${
          currentPath === tab.path
            ? "text-primary-main   border-primary-main"
            : "text-gray-700 border-white"
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
          <div className="grow overflow-auto ">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryListing;
