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
    label: "Services",
  },
];

const tabs: {
  label: string;
  icon: IconType;
  path: string;
}[] = [
  {
    label: "PAN",
    icon: BiCard,
    path: "PAN/categories",
  },
  {
    label: "ITR",
    icon: BiCard,
    path: "ITR/categories",
  },
  {
    label: "GUMASTA",
    icon: BiCard,
    path: "gumasta/commission",
  },
  {
    label: "DSC",
    icon: BiCard,
    path: "DSC/commission",
  },
  {
    label: "MSME",
    icon: BiCard,
    path: "MSME/commission",
  },
  {
    label: "DIGITAL PAN",
    icon: BiCard,
    path: "digital-pan",
  },
];

const Services = (props: Props) => {
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
          <div className="flex gap-4 items-center border-b border-slate-300 bg-white ">
            {getTabs(tabs)?.map((tab, index) => {
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() =>
                    navigate(tab.path, {
                      state: location.state,
                    })
                  }
                  className={`h-full px-3 py-2 flex gap-2 items-center  cursor-pointer hover:text-primary-main font-medium text-sm
                  ${
                    currentPath === tab.path.split("/")[0]
                      ? "border-b-[2.5px] border-primary-main text-primary-main"
                      : "text-slate-700"
                  }`}
                >
                  <div className="text-lg">
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
          <div className="h-full overflow-auto ">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
