import React from "react";
import { IconType } from "react-icons";
import { BiCard } from "react-icons/bi";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

type Props = {};

const tabs: {
  label: string;
  icon: IconType;
  path: string;
}[] = [
  {
    label: "WITHOUT CATEGORIES",
    icon: BiCard,
    path: "without-categories",

  },
  {
    label: "WITH PCO CATEGORY",
    icon: BiCard,
    path: "with-pco-categorie",
  },
  {
    label: "WITH DSA CATEGORY",
    icon: BiCard,
    path: "with-dsa-categorie",
  }
];

const PanCommission = (props: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname.split("/")[4]
  return (
    <div className="flex flex-col gap-2 pt-3 h-full">
      <div className="flex flex-col grow overflow-auto">
        {/* Tabs */}
        {tabs?.length && (
          <div className="flex gap-4 items-center border-b border-slate-300 bg-white ">
            {tabs?.map((tab, index) => {
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

export default PanCommission;
