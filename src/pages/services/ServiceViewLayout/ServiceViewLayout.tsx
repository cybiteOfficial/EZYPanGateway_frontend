import React from "react";
import { IconType } from "react-icons";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  navItemList: {
    label: string;
    path: string;
    icon: IconType;
  }[];
};

const ServiceViewLayout = ({
  children,
  navItemList,
}: Props) => {

    const navigate = useNavigate()
    const location = useLocation()

    const currentPath = location.pathname.split('/')[3]

  return (
    <div className="h-full flex">
      {/*Side Bar  */}
      <div className="h-full overflow-auto w-[180px] border-r flex flex-col gap-3 py-2">
        {navItemList.map((navItem, navItemIndex) => (
          <button
            type="button"
            key={navItemIndex}
            onClick={() => navigate(navItem.path)}
            className={`flex items-center gap-2  py-2 px-3 text-sm border-primary-main ${
              currentPath === navItem.path
                ? "text-primary-main border-l-[3px] "
                : "text-slate-600"
            } `}
          >
            {<navItem.icon className="text-lg" />}
            {navItem.label}
          </button>
        ))}
      </div>

      {/* Main Contanier */}
      <div className="grow h-full overflow-auto">{children}</div>
    </div>
  );
};

export default ServiceViewLayout;
