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
} from "src/redux/slices/RejectionListSlice";
import { AppDispatch, RootState } from "src/redux/store";
import { IoPersonCircleOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import AuthHOC from "src/userAccess/AuthHOC";
import { AccessAction } from "src/utils/Enums/AccessAction";
import NotAuthorizedPage from "src/components/UI/NotAuthorized/NotAuthorizedPage";
type Props = {
  columns: any[];
  rows: any[];
};

const RejectionListing = ({ columns, rows }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const rejectionListState: any = useSelector(
    (state: RootState) => state.rejectionList
  );
  const navigate = useNavigate();
  const { page, rowsPerPage, searchValue, isTableLoading, totalItems } =
    rejectionListState;

  const breadcrumbs: BreadcrumbType[] = [
    {
      label: "Dashboard",
      path: "/",
      icon: IoPersonCircleOutline,
    },
    {
      label: "Rejection List",
      icon: RxDashboard,
    },
  ];

  return (
    <AuthHOC
      moduleName="REJECTION_LISTS"
      action={AccessAction.LIST}
      alt={<NotAuthorizedPage />}
    >
      <div className="flex flex-col gap-2 px-4 py-3 h-full">
        {/* Breadcrumbs */}
        <ATMBreadCrumbs breadcrumbs={breadcrumbs} />

        {/* Page Header */}
        <div className="flex justify-end items-end gap-2">
          <AuthHOC
            moduleName="REJECTION_LISTS"
            action={AccessAction.ADD}
          >
            <ATMLoadingButton onClick={() => navigate("add")}>
              Add Rejection Message
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
            searchValue={searchValue}
            onSearchChange={(newValue) => dispatch(setSearchValue(newValue))}
          />

          {/* Table */}
          <div className="border flex flex-col grow overflow-auto rounded bg-white">
            <ATMTable
              columns={columns}
              rows={rows}
              isLoading={isTableLoading}
            />{" "}
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

export default RejectionListing;
