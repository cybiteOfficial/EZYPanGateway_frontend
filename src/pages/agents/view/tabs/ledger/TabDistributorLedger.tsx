import React from "react";
import { IconType } from "react-icons";
import { BiCard } from "react-icons/bi";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getTabs } from "src/utils/auth/getTabs";

type Props = {};

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

const TabDistributorLedger = (props: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname.split("/")[4];

  const { state } = location;

  React.useEffect(() => {
    navigate(
      location.pathname.split("/").reverse()[0] === "applications"
        ? "pan"
        : location.pathname.split("/").reverse()[0],
      {
        state: state,
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-2 px-5 h-90 ">
      <div className="flex flex-col grow overflow-auto">
        {/* Tabs */}
        {tabs?.length && (
          <div className="flex gap-12 items-center px-3 py-1 border-2 mx-4 rounded border-gray-100 bg-white ">
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
                  className={`h-full px-5 py-2 flex gap-2 rounded items-center focus:hover:text-primary-main font-medium text-sm
                                                 ${
                                                   currentPath === tab.path
                                                     ? "border-b-2  text-primary-main  bg-gray-100"
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
    </div>
  );
};

export default TabDistributorLedger;
