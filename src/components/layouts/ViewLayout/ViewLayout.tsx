import React, { useEffect } from "react";
import SideNavLayout from "../SideNavLayout/SideNavLayout";
import { BiSearchAlt2 } from "react-icons/bi";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ATMInputAdormant from "src/components/UI/atoms/formFields/ATMInputAdormant/ATMInputAdormant";
import { IconType } from "react-icons";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/redux/store";
import { setIsCollapsed } from "src/redux/slices/SideNavLayoutSlice";
import ATMBreadCrumbs, {
  BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
// import InfiniteScroll from "react-infinite-scroll-component";

type ViewLayoutPropTypes = {
  renderListItem?: (item: any) => React.ReactNode;
  searchValue?: string;
  onSearch?: (value: string) => void;
  tabs?: {
    label: string;
    icon: IconType;
    path: string;
  }[];
  breadcrumbs?: BreadcrumbType[];
  listData?: any[];
  hideSearchBox?: boolean;
  infoCard?: React.ReactNode;
  children?: React.ReactNode;
  isListLoading?: boolean;
};

const ViewLayout = ({
  infoCard,
  listData,
  renderListItem,
  tabs,
  searchValue,
  hideSearchBox = false,
  onSearch,
  breadcrumbs,
  children,
  isListLoading,
}: ViewLayoutPropTypes) => {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setIsCollapsed(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentPath = location.pathname?.split("/")[3];

  return (
    <>
      <SideNavLayout>
        <div className="w-full flex  h-full bg-white ">
          {/* Left Section Side Bar */}
          <div className="min-w-[230px] h-full flex flex-col   border-r">
            {/* Info Card */}
            <div className=" w-full">{infoCard}</div>
            {/* Search Bar */}
            {!hideSearchBox && (
              <div className="py-3 flex items-center justify-center">
                <ATMInputAdormant
                  name=""
                  value={searchValue || ""}
                  onChange={(e) => {
                    onSearch &&  onSearch(e.target.value);
                  }}
                  placeholder="Search here..."
                  className="h-[35px] border-slate-100 shadow px-2 "
                  adormant={
                    <BiSearchAlt2 className="text-slate-400 text-xl " />
                  }
                  adormantProps={{
                    position: "start",
                    extraClasses: "bg-white border-0",
                  }}
                />
              </div>
            )}
            {/* List */}
            <div className="overflow-auto h-full max-w-xs" id="scrollableDiv">
              {isListLoading
                ? Array(5)?.fill(null)?.map((_, index) => (
                      <div
                        key={index}
                        className="flex gap-5 py-2 items-center px-4 border-b animate-pulse"
                      >
                        <div className="w-[30px] h-[30px] flex justify-center items-center bg-primary-dark text-white rounded-full bg-slate-300"></div>

                        <div className="flex flex-col text-[15px] gap-2">
                          <div className="bg-slate-300 w-[130px] h-[13px]"></div>
                          <div className="bg-slate-300 w-[100px] h-[10px]"></div>
                        </div>
                      </div>
                    ))
                : listData?.length
                ? listData?.map((item, itemIndex) => {
                    return (
                      <React.Fragment key={itemIndex}>
                        {renderListItem && renderListItem(item)}
                      </React.Fragment>
                    );
                  })
                :null}
              {}
            </div>
          </div>

          {/* Right Section */}
          <div className="grow border-b rounded-r h-full overflow-auto flex flex-col gap-3 ">
            {/* BreadCrumbs */}
            <div className="px-4 pt-5">
              {breadcrumbs && <ATMBreadCrumbs breadcrumbs={breadcrumbs} />}
            </div>
            {/* Tabs */}
            {tabs?.length && (
              <div className="flex gap-4 items-center  border-b border-slate-300 bg-white ">
                {tabs?.map((tab, index) => {
                  return (
                    <button
                      key={index}
                      onClick={() =>
                        navigate(tab.path, {
                          state: location.state,
                        })
                      }
                      disabled={currentPath === tab?.path?.split("/")[0]}
                      className={`h-full px-3 py-2 flex gap-2 items-center  cursor-pointer hover:text-primary-main font-medium text-sm
                                                 ${
                                                   currentPath ===
                                                   tab?.path?.split("/")[0]
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

            {/* Children */}
            <div id="scroll-top" className="grow overflow-auto  ">
              <div className="h-full overflow-auto ">
                {children || <Outlet />}
              </div>
            </div>
          </div>
        </div>
      </SideNavLayout>
    </>
  );
};

export default ViewLayout;
