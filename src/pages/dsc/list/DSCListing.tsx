import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ATMBreadCrumbs, {
  BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import { getTabs } from "src/utils/auth/getTabs";
import { twMerge } from "tailwind-merge";

type Props = {
  statusWiseCount: any;
  isCountLoading: boolean;
};

const DSCListing = ({ statusWiseCount, isCountLoading = false }: Props) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const breadcrumbs: BreadcrumbType[] = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "DSC",
    },
  ];

  const applicationStatus = [
    {
      label: "PENDING",
      extraClasses: " text-status-pending ",
      onActiveClassNames: {
        button: "bg-status-pending",
        badge: "text-status-pending",
      },
      path: "PENDING",
      type: "ACTION",
      moduleName: "DSC_APPLICATIONS",
      accessAction: "SHOW_PENDING_APPLICATION",
    },
    {
      label: "IN PROGRESS",
      extraClasses: " text-status-progress",
      onActiveClassNames: {
        button: "bg-status-progress",
        badge: "text-status-progress",
      },
      path: "IN_PROGRESS",
      type: "ACTION",
      moduleName: "DSC_APPLICATIONS",
      accessAction: "SHOW_IN_PROGRESS_APPLICATION",
    },
    {
      label: "REJECT",
      extraClasses: " text-status-reject",
      onActiveClassNames: {
        button: "bg-status-reject",
        badge: "text-status-reject",
      },
      path: "REJECT",
      type: "ACTION",
      moduleName: "DSC_APPLICATIONS",
      accessAction: "SHOW_REJECTED_APPLICATION",
    },
    {
      label: "LOGIN DONE",
      extraClasses: " text-status-verify",
      onActiveClassNames: {
        button: "bg-status-verify",
        badge: "text-status-verify",
      },
      path: "VERIFY",
      type: "ACTION",
      moduleName: "DSC_APPLICATIONS",
      accessAction: "SHOW_VERIFIED_APPLICATION",
    },
    {
      label: "CANCELLED",
      extraClasses: " text-status-cancelled",
      onActiveClassNames: {
        button: "bg-status-cancelled",
        badge: "text-status-cancelled",
      },
      path: "CANCELLED",
      type: "ACTION",
      moduleName: "DSC_APPLICATIONS",
      accessAction: "SHOW_CANCELLED_APPLICATION",
    },
  ];

  return (
    <div className="flex flex-col gap-2 px-4 py-3 h-full w-full">
      <ATMBreadCrumbs breadcrumbs={breadcrumbs} />

      {/* Page Header */}
      <div className="flex 2xl:justify-end xl:justify-end lg:justify-end xs:justify-normal items-center gap-2 overflow-x-scroll">
        {getTabs(applicationStatus)?.map((status, statusIndex) => {
          return (
            <button
              key={statusIndex}
              onClick={() => navigate(status.path)}
              className={twMerge(
                ` flex gap-2 items-center font-medium rounded px-4 py-2 text-[13px] duration-300 transition-all relative ${
                  status.extraClasses
                } ${
                  pathname.split("/")[2] === status.path
                    ? `${status.onActiveClassNames.button} text-white `
                    : "bg-slate-50"
                } `
              )}
            >
              {status.label}
              {/* Badge */}
              {isCountLoading ? (
                <div className="h-5 w-5 rounded-full bg-white"></div>
              ) : (
                <div
                  className={twMerge(
                    ` h-5 w-5 text-[10px] flex justify-center items-center rounded-full font-medium ${
                      pathname.split("/")[2] === status.path
                        ? `${status.onActiveClassNames.badge}  bg-white `
                        : "bg-primary-main text-white"
                    } `
                  )}
                >
                  {statusWiseCount && statusWiseCount[status.path]}
                </div>
              )}
            </button>
          );
        })}
      </div>

      <Outlet />
    </div>
  );
};

export default DSCListing;
