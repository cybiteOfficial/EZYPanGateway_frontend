import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ATMBreadCrumbs, {
  BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import ATMPagination from "src/components/UI/atoms/ATMPagination/ATMPagination";
import ATMTable from "src/components/UI/atoms/ATMTable/ATMTable";
import ATMTableHeader from "src/components/UI/atoms/ATMTableHeader/ATMTableHeader";
import {
  setRowsPerPage,
  setPage,
  setSearchValue,
} from "src/redux/slices/RoleSlice";
import { AppDispatch, RootState } from "src/redux/store";
import { IoPersonCircleOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

type Props = {
  columns: any[];
  rows: any[];
};

const RolesListing = ({ columns, rows }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const rolesState: any = useSelector((state: RootState) => state.roles);

  const { page, rowsPerPage, isTableLoading, searchValue, totalItems } =
    rolesState;

  const breadcrumbs: BreadcrumbType[] = [
    {
      label: "Dashboard",
      path: "/",
      icon: IoPersonCircleOutline,
    },
    {
      label: "Roles",
      icon: RxDashboard,
    },
  ];

  return (
    <div className="flex flex-col gap-2 px-4 py-3 h-full">
      <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
      {/* Page Header */}
      <div className="flex justify-end items-end gap-2">
        <button
          onClick={() => navigate("add")}
          className="border bg-secondary-main items-center rounded  text-white flex mt-1 py-1 px-4 hover:bg-orange-600 "
        >
          Create New Role
        </button>
      </div>

      <div className="border flex flex-col overflow-auto rounded bg-white">
        {/*Table Header */}
        <ATMTableHeader
          page={page}
          rowCount={totalItems}
          rowsPerPage={rowsPerPage}
          rows={rows}
          onRowsPerPageChange={(newValue) => dispatch(setRowsPerPage(newValue))}
          onSearchChange={(newValue) => dispatch(setSearchValue(newValue))}
          searchValue={searchValue}
        />

        {/* Table */}
        <div className="border flex flex-col grow overflow-auto rounded bg-white">
          <ATMTable columns={columns} rows={rows} isLoading={isTableLoading} />
        </div>

        {/* Pagination */}
        <div className="flex items-center text-md justify-end border-t border-slate-300">
          <ATMPagination
            page={page}
            rowCount={rows.length}
            rows={rows}
            rowsPerPage={rowsPerPage}
            onPageChange={(newPage) => dispatch(setPage(newPage))}
          />
        </div>
      </div>
    </div>
  );
};

export default RolesListing;
