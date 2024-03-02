import React, { useEffect } from "react";
import { BiChevronRight } from "react-icons/bi";
import { HiMenu } from "react-icons/hi";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { createSearchParams, useNavigate } from "react-router-dom";
import { setExpandedIndex } from "src/redux/slices/VerticalNavBarSlice";
import { AppDispatch, RootState } from "src/redux/store";
import { useGetPendingApplicattionCountQuery } from "src/services/PendingApplicationService";
import { NavItemType, PendingApplicationCountType } from "../../../navigation";
import AuthHOC from "src/userAccess/AuthHOC";

type Props = {
  toggleCollapse: () => void;
  isCollapsed: boolean;
  navigation: (
    pendingApplicationCount: PendingApplicationCountType
  ) => NavItemType[];
  isPathEqualtoNavItem?: (navItem: any) => boolean;
};

const Badge = ({ value }: { value: string | number }) => {
  return (
    <div>
      <div className="bg-secondary-main rounded-full text-[10px] font-medium text-white h-5 w-5 flex items-center justify-center">
        {value}
      </div>
    </div>
  );
};

const VerticalNavBar = ({
  toggleCollapse,
  isCollapsed,
  navigation,
  isPathEqualtoNavItem = (navItem) => false,
}: Props) => {
  const [pendingApplicationCount, setPendingApplicationCount] =
    React.useState<any>(null);
  const verticalNavBarState: any = useSelector(
    (state: RootState) => state.verticalNavBar
  );
  const dispatch = useDispatch<AppDispatch>();

  const { expandedIndex } = verticalNavBarState;

  useEffect(() => {
    document
      .getElementById("scroll-to-view")
      ?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const navigate = useNavigate();

  const { data, isLoading, isFetching } =
    useGetPendingApplicattionCountQuery("");

  React.useEffect(() => {
    if (!isFetching && !isLoading) {
      setPendingApplicationCount(data?.data || null);
    }
  }, [isFetching, isLoading, data]);

  return (
    <div
      className={`h-full overflow-auto bg-white transition-all duration-500 border-r border-slate-300 md:static absolute z-[1000]  ${
        isCollapsed
          ? "md:min-w-[70px] md:w-[70px] min-w-0 w-0"
          : "min-w-[270px] w-[270px]"
      }`}
    >
      {/* Logo & Menu Icon */}
      <div
        className={`flex px-4 border-b border-slate-300 items-center justify-between  sticky top-0 py-3 bg-white h-[55px] w-full `}
      >
        {/* Logo */}
        {!isCollapsed && (
          <div className="flex gap-3 items-center font-semibold text-xl">
            <img src="/sjbtLogo.png" alt="" className="w-[40px] h-[40px]" />
            <img src="/name.gif" alt="" className="w-[120px]" />
          </div>
        )}

        {/* Menu Icon */}
        <div
          onClick={toggleCollapse}
          className="flex flex-col gap-1 cursor-pointer justify-center "
        >
          {isCollapsed ? (
            <HiMenu className="text-2xl text-slate-500" />
          ) : (
            <TbLayoutSidebarLeftCollapse className="text-2xl text-slate-500" />
          )}
        </div>
      </div>

      {/* Navigations */}
      <div className="px-3 py-1 flex flex-col gap-1 divide-y transition-all h-[calc(100%-55px)]  overflow-auto">
        {navigation(pendingApplicationCount)?.map((navItem, navIndex) => {
          return navItem?.moduleName || navItem?.moduleWiseActions?.length ? (
            <AuthHOC
              type={navItem.type || "MODULE"}
              action={navItem.accessAction}
              moduleName={navItem?.moduleName || ""}
              moduleWiseActions={navItem.moduleWiseActions}
              key={navIndex}
            >
              <div
                onClick={() =>
                  navItem.path && !navItem.children
                    ? navigate({
                        pathname: navItem.path,
                        search: `?${createSearchParams(navItem.searchParams)}`,
                      })
                    : dispatch(
                        setExpandedIndex(
                          expandedIndex === navIndex ? -1 : navIndex
                        )
                      )
                }
                id={isPathEqualtoNavItem(navItem) ? "scroll-to-view" : ""}
                className={`
                
                py-3 
                cursor-pointer  
                transition-all
                duration-500
                text-[15px]
                
                ${isCollapsed ? "justify-center px-2" : "px-3"}
                ${
                  isPathEqualtoNavItem(navItem)
                    ? "text-primary-main font-semibold border-l-[3px] border-l-primary-main"
                    : "text-slate-600"
                } 
                `}
              >
                <div className="flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    {" "}
                    <navItem.icon />{" "}
                    {!isCollapsed && <div className=""> {navItem.label} </div>}
                  </div>
                  {navItem.children && !isCollapsed && (
                    <div>
                      <BiChevronRight
                        className={`text-2xl text-slate-800  transition-all  ${
                          expandedIndex === navIndex && "rotate-90"
                        }`}
                      />
                    </div>
                  )}

                  {navItem.badge &&
                    !isCollapsed &&
                    (isFetching || isLoading ? (
                      <div className="bg-slate-300 rounded-full h-5 w-5 animate-pulse"></div>
                    ) : (
                      <Badge value={navItem.badge} />
                    ))}
                </div>

                {/* Children */}
                {expandedIndex === navIndex && !isCollapsed && (
                  <div className="flex flex-col gap-1 px-4 py-3">
                    {navItem.children?.map((navChild, navChildIndex) => (
                      <AuthHOC
                        type={navChild.type || "MODULE"}
                        action={navChild.accessAction}
                        moduleName={navChild?.moduleName || ""}
                        key={navChildIndex}
                      >
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            navChild.path &&
                              navigate({
                                pathname: navChild.path,
                                search: `?${createSearchParams(
                                  navChild.searchParams
                                )}`,
                              });
                          }}
                          id={
                            isPathEqualtoNavItem(navChild)
                              ? "scroll-to-view"
                              : ""
                          }
                          className={`
                  flex
                  justify-between
                  items-center 
                  pl-2
                  py-2 
                  cursor-pointer  
                  transition-all
                  duration-500
                  text-[14px]
                  ${isCollapsed && "justify-center"}
                  ${
                    isPathEqualtoNavItem(navChild)
                      ? "text-primary-main font-semibold border-l-[3px] border-l-primary-main"
                      : "text-slate-500"
                  } 
                  `}
                        >
                          {!isCollapsed && (
                            <div className="flex gap-3 items-center ">
                              <navChild.icon />
                              <div className=""> {navChild.label} </div>
                            </div>
                          )}

                          {navChild.badge !== undefined
                            ? !isCollapsed &&
                              (isFetching || isLoading ? (
                                <div className="bg-slate-300 rounded-full h-5 w-5 animate-pulse"></div>
                              ) : (
                                <Badge value={navChild.badge} />
                              ))
                            : null}
                        </div>
                      </AuthHOC>
                    ))}
                  </div>
                )}
              </div>
            </AuthHOC>
          ) : (
            <div
              key={navIndex}
              onClick={() =>
                navItem.path && !navItem.children
                  ? navigate({
                      pathname: navItem.path,
                      search: `?${createSearchParams(navItem.searchParams)}`,
                    })
                  : dispatch(
                      setExpandedIndex(
                        expandedIndex === navIndex ? -1 : navIndex
                      )
                    )
              }
              id={isPathEqualtoNavItem(navItem) ? "scroll-to-view" : ""}
              className={`
            
            py-3 
            cursor-pointer  
            transition-all
            duration-500
            text-[15px]
            
            ${isCollapsed ? "justify-center px-2" : "px-3"}
            ${
              isPathEqualtoNavItem(navItem)
                ? "text-primary-main font-semibold border-l-[3px] border-l-primary-main"
                : "text-slate-600"
            } 
            `}
            >
              <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  {" "}
                  <navItem.icon />{" "}
                  {!isCollapsed && <div className=""> {navItem.label} </div>}
                </div>
                {navItem.children && !isCollapsed && (
                  <div>
                    <BiChevronRight
                      className={`text-2xl text-slate-800  transition-all  ${
                        expandedIndex === navIndex && "rotate-90"
                      }`}
                    />
                  </div>
                )}

                {navItem.badge &&
                  !isCollapsed &&
                  (isFetching || isLoading ? (
                    <div className="bg-slate-300 rounded-full h-5 w-5 animate-pulse"></div>
                  ) : (
                    <Badge value={navItem.badge} />
                  ))}
              </div>

              {/* Children */}
              {expandedIndex === navIndex && !isCollapsed && (
                <div className="flex flex-col gap-1 px-4 py-3">
                  {navItem.children?.map((navChild, navChildIndex) => (
                    <AuthHOC
                      type={navChild.type || "MODULE"}
                      action={navChild.accessAction}
                      moduleName={navChild?.moduleName || ""}
                      key={navChildIndex}
                    >
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          navChild.path &&
                            navigate({
                              pathname: navChild.path,
                              search: `?${createSearchParams(
                                navChild.searchParams
                              )}`,
                            });
                        }}
                        id={
                          isPathEqualtoNavItem(navChild) ? "scroll-to-view" : ""
                        }
                        className={`
              flex
              justify-between
              items-center 
              pl-2
              py-2 
              cursor-pointer  
              transition-all
              duration-500
              text-[14px]
              ${isCollapsed && "justify-center"}
              ${
                isPathEqualtoNavItem(navChild)
                  ? "text-primary-main font-semibold border-l-[3px] border-l-primary-main"
                  : "text-slate-500"
              } 
              `}
                      >
                        {!isCollapsed && (
                          <div className="flex gap-3 items-center ">
                            <navChild.icon />
                            <div className=""> {navChild.label} </div>
                          </div>
                        )}

                        {navChild.badge !== undefined
                          ? !isCollapsed &&
                            (isFetching || isLoading ? (
                              <div className="bg-slate-300 rounded-full h-5 w-5 animate-pulse"></div>
                            ) : (
                              <Badge value={navChild.badge} />
                            ))
                          : null}
                      </div>
                    </AuthHOC>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VerticalNavBar;
