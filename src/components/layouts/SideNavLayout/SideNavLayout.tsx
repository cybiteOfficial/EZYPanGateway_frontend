import React, { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { navigation } from "../../../navigation";
import { setIsCollapsed } from "../../../redux/slices/SideNavLayoutSlice";
import { AppDispatch, RootState } from "../../../redux/store";
import Header from "../../UI/Header/Header";
import VerticalNavBar from "../../UI/VerticalNavBar/VerticalNavBar";

type Props = {
  children: ReactNode;
};

const SideNavLayout = ({ children }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const sideNavLayoutState: any = useSelector(
    (state: RootState) => state.sideNavLayout
  );

  const { isCollapsed } = sideNavLayoutState;

  const toggleCollapse = () => {
    dispatch(setIsCollapsed(!isCollapsed));
  };

  const location = useLocation();

  const currentPath = `/${location.pathname?.split("/")[1]}`;

  return (
    <div className="flex h-screen w-screen">
      {/* Side Navigation Bar */}
      <VerticalNavBar
        toggleCollapse={toggleCollapse}
        isCollapsed={isCollapsed}
        navigation={navigation}
        isPathEqualtoNavItem={(navItem: any) =>`/${navItem.path?.split('/')?.[1]}`  === currentPath}
      />
      {/* </div> */}

      <div className={`h-full grow overflow-auto`}>
        {/* Header */}
        <div className="2xl:h-[55px]  sm:h-[55px]  border-b border-slate-300">
          <Header toggleCollapse={toggleCollapse} />
        </div>

        <div className="h-[calc(100%-55px)] w-full overflow-auto bg-white">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SideNavLayout;
