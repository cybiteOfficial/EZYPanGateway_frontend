import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ATMBreadCrumbs, {
  BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import ATMPagination from "src/components/UI/atoms/ATMPagination/ATMPagination";
import ATMTable from "src/components/UI/atoms/ATMTable/ATMTable";
import ATMTableHeader from "src/components/UI/atoms/ATMTableHeader/ATMTableHeader";
import { setRowsPerPage, setPage } from "src/redux/slices/AdminSlice";
import { AppDispatch, RootState } from "src/redux/store";
import { IoPersonCircleOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { setSearchValue } from "src/redux/slices/AdminSlice";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import { useNavigate } from "react-router-dom";
import { AccessAction } from "src/utils/Enums/AccessAction";
import NotAuthorizedPage from "src/components/UI/NotAuthorized/NotAuthorizedPage";
import AuthHOC from "src/userAccess/AuthHOC";

type Props = {
  columns: any[];
  rows: any[];
};

const AdminListing = ({ columns, rows }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const adminState: any = useSelector((state: RootState) => state.admin);
  const [selectedRows, setSelectedRows] = useState([]);
  const navigate = useNavigate();
  const { page, rowsPerPage, totalItems, searchValue, isTableLoading } =
    adminState;
  const breadcrumbs: BreadcrumbType[] = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: IoPersonCircleOutline,
    },
    {
      label: "Manage Admins",
      icon: RxDashboard,
    },
  ];
  return (
    <AuthHOC
      moduleName="ADMINS"
      action={AccessAction.LIST}
      alt={<NotAuthorizedPage />}
    >
      <div className="flex flex-col gap-2 px-4 py-3 h-full">
        {/* Breadcrumbs */}
        <ATMBreadCrumbs breadcrumbs={breadcrumbs} />

        {/* Page Header */}
        <div className="flex justify-end items-end gap-2">
          <AuthHOC
            moduleName="ADMINS"
            action={AccessAction.ADD}
            alt={<NotAuthorizedPage />}
          >
            <ATMLoadingButton onClick={() => navigate("add")}>
              Create New Admin
            </ATMLoadingButton>
          </AuthHOC>
        </div>
        <div className="border flex flex-col overflow-auto rounded bg-white">
          {/*Table Header */}
          <ATMTableHeader
            page={page}
            rowCount={totalItems}
            rowsPerPage={rowsPerPage}
            rows={rows}
            onRowsPerPageChange={(newValue) =>
              dispatch(setRowsPerPage(newValue))
            }
            onSearchChange={(newValue) => dispatch(setSearchValue(newValue))}
            searchValue={searchValue}
          />

          {/* Table */}
          <div className="border flex flex-col grow overflow-auto rounded bg-white">
            <ATMTable
              columns={columns}
              rows={rows}
              isLoading={isTableLoading}
              selectedRows={selectedRows}
              onRowSelect={(selectedRows) => setSelectedRows(selectedRows)}
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

export default AdminListing;
