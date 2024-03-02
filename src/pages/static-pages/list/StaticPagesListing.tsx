import React from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NotAuthorizedPage from "src/components/UI/NotAuthorized/NotAuthorizedPage";
import ATMBreadCrumbs, {
  BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import ATMPagination from "src/components/UI/atoms/ATMPagination/ATMPagination";
import ATMTable from "src/components/UI/atoms/ATMTable/ATMTable";
import ATMTableHeader from "src/components/UI/atoms/ATMTableHeader/ATMTableHeader";
import {
  setRowsPerPage,
  setPage,
  setSearchValue,
} from "src/redux/slices/StaticPagesSlice";

import { RootState } from "src/redux/store";
import AuthHOC from "src/userAccess/AuthHOC";
import { AccessAction } from "src/utils/Enums/AccessAction";

type Props = {
  columns: any[];
  rows: any[];
};

const breadcrumbs: BreadcrumbType[] = [
  {
    label: "Dashboard",
    path: "/",
    icon: IoPersonCircleOutline,
  },
  {
    label: "Static Pages",
    icon: RxDashboard,
  },
];
const StaticPageListing = ({ columns, rows }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const statePagesState: any = useSelector(
    (state: RootState) => state.staticPages
  );
  const { page, rowsPerPage, searchValue, totalItems, isTableLoading } =
    statePagesState;

  return (
    <AuthHOC
      moduleName="STATIC_PAGES"
      action={AccessAction.LIST}
      alt={<NotAuthorizedPage />}
    >
      <div className="flex flex-col gap-2 px-4 py-3 h-full">
        {/* Breadcrumbs */}
        <ATMBreadCrumbs breadcrumbs={breadcrumbs} />

        {/* Page Header */}

        <div className="flex justify-end items-end gap-2">
          <AuthHOC moduleName="STATIC_PAGES" action={AccessAction.ADD}>
            <ATMLoadingButton onClick={() => navigate("add")}>
              Add New
            </ATMLoadingButton>
          </AuthHOC>
        </div>

        <div className="border flex flex-col overflow-auto rounded bg-white">
          {/*Table Header */}
          <ATMTableHeader
            searchValue={searchValue}
            page={page}
            rowCount={totalItems}
            rowsPerPage={rowsPerPage}
            rows={rows}
            onRowsPerPageChange={(newValue) =>
              dispatch(setRowsPerPage(newValue))
            }
            onSearchChange={(newValue) => {
              dispatch(setSearchValue(newValue));
            }}
          />

          {/* Table */}
          <div className="border flex flex-col grow overflow-auto rounded bg-white">
            <ATMTable
              columns={columns}
              rows={rows}
              isLoading={isTableLoading}
            />
          </div>

          {/* Pagination */}
          <div className="flex items-center text-md justify-end border-t border-slate-300">
            <ATMPagination
              page={page}
              rowCount={totalItems}
              rows={rows}
              rowsPerPage={rowsPerPage}
              onPageChange={(newPage) => dispatch(setPage(newPage))}
            />
          </div>
        </div>
      </div>
    </AuthHOC>
  );
};

export default StaticPageListing;
