import React, { useEffect } from "react";
import { IconType } from "react-icons";
import { BiCard } from "react-icons/bi";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getTabs } from "src/utils/auth/getTabs";
import { switchToAuthModule } from "src/utils/auth/switchToAuthModule";

type Tabs = {
  label: string;
  icon: IconType;
  path: string;
  moduleName: string;
  type: "MODULE" | "ACTION" | "FIELD";
};

type Props = {};

const tabs: Tabs[] = [
  {
    moduleName: "PAN_APPLICATIONS",
    type: "MODULE",
    label: "PAN",
    icon: BiCard,
    path: "pan",
  },
  {
    moduleName: "ITR_APPLICATIONS",
    type: "MODULE",
    label: "ITR",
    icon: BiCard,
    path: "itr",
  },
  {
    moduleName: "GUMASTA_APPLICATIONS",
    type: "MODULE",
    label: "Gumasta",
    icon: BiCard,
    path: "gumasta",
  },
  {
    moduleName: "DSC_APPLICATIONS",
    type: "MODULE",
    label: "DSC",
    icon: BiCard,
    path: "dsc",
  },
  {
    moduleName: "MSME_APPLICATIONS",
    type: "MODULE",
    label: "MSME",
    icon: BiCard,
    path: "msme",
  },
  // {
  //   moduleName: "DIGITAL_PAN_APPLICATIONS",
  //   type: "MODULE",
  //   label: "Digital PAN",
  //   icon: BiCard,
  //   path: "digital-pan",
  // },
];

const TabDistributorApplication = (props: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { state } = location;

  const currentPath = location.pathname.split("/")[4];

  useEffect(() => {
    navigate(
      location.pathname.split("/").reverse()[0] === "applications"
        ? 
        switchToAuthModule([
            { moduleName: "PAN_APPLICATIONS", path: "pan" },
            { moduleName: "ITR_APPLICATIONS", path: "itr" },
            { moduleName: "GUMASTA_APPLICATIONS", path: "gumasta" },
            { moduleName: "DSC_APPLICATIONS", path: "dsc" },
            { moduleName: "MSME_APPLICATIONS", path: "msme" },
          ]) || "/distributor"
        : location.pathname.split("/").reverse()[0],
      {
        state: state,
      }
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col grow overflow-auto h-full gap-2 ">
      {/* Tabs */}
      {tabs?.length && (
        <div className="flex gap-3 items-center px-3 mx-4 shadow border  rounded border-gray-100 bg-white ">
          {getTabs(tabs)?.map((tab, index) => {
            return (
              <button
                key={index}
                type="button"
                onClick={() =>
                  navigate(tab.path, {
                    state: state,
                  })
                }
                className={`h-full px-5 py-1 flex gap-2  items-center focus:hover:text-primary-main font-medium text-sm
                  ${
                    currentPath === tab.path
                      ? "text-primary-main  bg-slate-200"
                      : "text-gray-700"
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
  );
};

export default TabDistributorApplication;
