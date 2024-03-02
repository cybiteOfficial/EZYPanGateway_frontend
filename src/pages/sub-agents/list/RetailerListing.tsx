import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiUser } from "react-icons/fi";
import { IoPersonCircleOutline } from "react-icons/io5";
// import { Data, Headers } from "react-csv/components/CommonPropTypes";
import ATMPagination from "src/components/UI/atoms/ATMPagination/ATMPagination";
import ATMTable from "src/components/UI/atoms/ATMTable/ATMTable";
import ATMTableHeader from "src/components/UI/atoms/ATMTableHeader/ATMTableHeader";
import { AppDispatch, RootState } from "src/redux/store";
import ATMBreadCrumbs, {
  BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import ATMExportButtonGroup from "src/components/UI/atoms/ATMExportButtonGroup/ATMExportButtonGroup";
import {
  setRowsPerPage,
  setPage,
  setSearchValue,
} from "src/redux/slices/retailerSlice";
import { RetailerListResponse } from "src/models/Retailer.model";
import NotAuthorizedPage from "src/components/UI/NotAuthorized/NotAuthorizedPage";
import AuthHOC from "src/userAccess/AuthHOC";
import { AccessAction } from "src/utils/Enums/AccessAction";
import RetailerFilterDialogWrapper from "./Dialog/RetailerFilterWrapper";

type Props = {
  columns: any[];
  rows: any[];
  onExport: (done: () => void, isAllExport: boolean) => void;
  isAllExporting: boolean;
  isCurrentExporting: boolean;
  isTableLoading: boolean;
  exportDataHeaders: any;
  exportData: any;
};

const RetailerListing = ({
  columns,
  rows,
  onExport,
  isAllExporting,
  isCurrentExporting,
  isTableLoading,
  exportDataHeaders,
  exportData,
}: Props) => {
  // Navigate
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const retailerState: any = useSelector((state: RootState) => state.retailer);
  const { page, rowsPerPage, searchValue, totalItems } = retailerState;

  const breadcrumbs: BreadcrumbType[] = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: IoPersonCircleOutline,
    },
    {
      label: "Retailers",
      icon: FiUser,
    },
  ];

  return (
    <AuthHOC
      moduleName="RETAILERS"
      action={AccessAction.LIST}
      alt={<NotAuthorizedPage />}
    >
      <div className="flex flex-col gap-2 px-4 py-3 h-full">
        {/* Breadcrumbs */}
        <ATMBreadCrumbs breadcrumbs={breadcrumbs} />

        {/* Page Header */}
        <div className="flex justify-end items-end gap-2">
          <AuthHOC moduleName="RETAILERS" action={AccessAction.EXPORT}>
            <ATMExportButtonGroup
              isAllExporting={isAllExporting}
              isCurrentExporting={isCurrentExporting}
              onExport={onExport}
              allExportFileName="all-retailer.csv"
              currentExportFileName="current-retailer.csv"
              exportDataHeaders={exportDataHeaders}
              exportData={exportData}
            />
          </AuthHOC>
        </div>

        <div className="border flex flex-col overflow-auto rounded bg-white ">
          <ATMTableHeader
          isFilter
            page={page}
            rowCount={totalItems}
            rowsPerPage={rowsPerPage} 
            renderFilter={(close) => <RetailerFilterDialogWrapper close={close} />}
            rows={rows}
            onRowsPerPageChange={(newValue) =>
              dispatch(setRowsPerPage(newValue))
            }
            searchValue={searchValue}
            onSearchChange={(newValue) => {
              dispatch(setSearchValue(newValue));
            }}
          />

          {/* Table */}
          <div className="border flex flex-col grow rounded bg-white overflow-auto">
            <ATMTable
              disableRowClick={
                !AuthHOC({
                  type: "ACTION",
                  moduleName: "RETAILERS",
                  action: AccessAction.VIEW,
                  resultType: "BOOLEAN",
                })
              }
              onRowClick={(row: RetailerListResponse) => {
                navigate(`/retailer/${row._id}/applications`, {
                  state: {
                    retailer: row,
                  },
                });
              }}
              columns={columns}
              rows={rows}
              isLoading={isTableLoading}
              noDataMessage="No Retailer Found"
            />{" "}
          </div>

          {/* Pagination */}
          <div className=" flex items-center justify-end border-t border-slate-300">
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

export default RetailerListing;
