import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ATMBreadCrumbs, {
  BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import ATMPagination from "src/components/UI/atoms/ATMPagination/ATMPagination";
import {
  setPage,
  setRowsPerPage,
  setSearchValue,
} from "src/redux/slices/FAQSlice";
import { AppDispatch, RootState } from "src/redux/store";
import { IoPersonCircleOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import AccordionComponent from "./AccordionComponent";
import ATMTableHeader from "src/components/UI/atoms/ATMTableHeader/ATMTableHeader";
import NotAuthorizedPage from "src/components/UI/NotAuthorized/NotAuthorizedPage";
import AuthHOC from "src/userAccess/AuthHOC";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import { AccessAction } from "src/utils/Enums/AccessAction";

type Props = {
  items: any[];
  isLoading: boolean;
};

const FAQListing = ({ items, isLoading }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const faqState: any = useSelector((state: RootState) => state.faq);

  const { page, rowsPerPage, searchValue, totalItems } = faqState;

  const breadcrumbs: BreadcrumbType[] = [
    {
      label: "Dashboard",
      path: "/",
      icon: IoPersonCircleOutline,
    },
    {
      label: "FAQ",
      icon: RxDashboard,
    },
  ];

  return (
    <AuthHOC
      moduleName="FAQS"
      action={AccessAction.LIST}
      alt={<NotAuthorizedPage />}
    >
      <div className="flex flex-col gap-2 px-4 py-3 h-full overflow-auto">
        <ATMBreadCrumbs breadcrumbs={breadcrumbs} />

        {/* Page Header */}
        <div className="flex justify-end items-end gap-2">
          <AuthHOC
            moduleName="FAQS"
            action={AccessAction.ADD}
          >
            <ATMLoadingButton onClick={() => navigate("add")}>
              Add New
            </ATMLoadingButton>
          </AuthHOC>
        </div>

        <div className="border rounded bg-white">
          {/*Table Header */}
          <ATMTableHeader
            page={page}
            rowCount={totalItems}
            rowsPerPage={rowsPerPage}
            rows={items}
            onRowsPerPageChange={(newValue) =>
              dispatch(setRowsPerPage(newValue))
            }
            onSearchChange={(newValue) => dispatch(setSearchValue(newValue))}
            searchValue={searchValue}
          />
        </div>

        <div className="border flex flex-col overflow-auto rounded bg-white">
          <div className="py-3 grow overflow-auto ">
            {isLoading ? (
              <div className="flex flex-col gap-5 px-3">
                {Array(10)
                  .fill(null)
                  .map(() => (
                    <div className="bg-slate-300 h-[50px] w-full rounded">
                      {" "}
                    </div>
                  ))}
              </div>
            ) : items.length ? (
              <AccordionComponent items={items} />
            ) : (
              <div className="text-center py-2 text-slate-500">
                No Data Found
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="flex items-center text-md justify-end border-t border-slate-300">
            <ATMPagination
              page={page}
              rowCount={totalItems}
              rows={items}
              rowsPerPage={rowsPerPage}
              onPageChange={(newPage) => dispatch(setPage(newPage))}
            />
          </div>
        </div>
      </div>
    </AuthHOC>
  );
};

export default FAQListing;
