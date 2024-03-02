import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ATMPagination from "src/components/UI/atoms/ATMPagination/ATMPagination";
import ATMTable from "src/components/UI/atoms/ATMTable/ATMTable";
import ATMTableHeader from "src/components/UI/atoms/ATMTableHeader/ATMTableHeader";
import {
  setRowsPerPage,
  setPage,
  setSearchValue,
} from "src/redux/slices/agentsSlice";
import { AppDispatch, RootState } from "src/redux/store";
import ATMBreadCrumbs, {
  BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import ATMExportButtonGroup from "src/components/UI/atoms/ATMExportButtonGroup/ATMExportButtonGroup";
// import { Data, Headers } from "react-csv/components/CommonPropTypes";
import { DistributorListResponse } from "src/models/Agents.model";
import AuthHOC from "src/userAccess/AuthHOC";
import NotAuthorizedPage from "src/components/UI/NotAuthorized/NotAuthorizedPage";
import { AccessAction } from "src/utils/Enums/AccessAction";
import FilterCardWrapper from "./Dialogs/DistributorListFilterCard/FilterCardWrapper";

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

const DistributorListing = ({
  columns,
  rows,
  onExport,
  isAllExporting,
  isCurrentExporting,
  isTableLoading,
  exportDataHeaders,
  exportData,
}: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const agentsState: any = useSelector((state: RootState) => state.agents);
  const navigate = useNavigate();

  const { page, rowsPerPage, searchValue, totalItems } = agentsState;

  const breadcrumbs: BreadcrumbType[] = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: IoPersonCircleOutline,
    },
    {
      label: "Distributors",
      icon: FiUser,
    },
  ];

  return (
    <AuthHOC
      moduleName="DISTRIBUTORS"
      action={AccessAction.LIST}
      alt={<NotAuthorizedPage />}
    >
      <div className="flex flex-col gap-2 px-4 py-3 h-full">
        {/* Breadcrumbs */}
        <ATMBreadCrumbs breadcrumbs={breadcrumbs} />

        {/* Page Header */}
        <div className="flex justify-end items-end gap-2">
          <AuthHOC moduleName="DISTRIBUTORS" action={AccessAction.EXPORT}>
            <ATMExportButtonGroup
              isAllExporting={isAllExporting}
              isCurrentExporting={isCurrentExporting}
              onExport={onExport}
              allExportFileName="all-distributor.csv"
              currentExportFileName="current-distributor.csv"
              exportDataHeaders={exportDataHeaders}
              exportData={exportData}
            />
          </AuthHOC>
        </div>

        <div className="border flex flex-col grow overflow-auto rounded bg-white ">
          {/*Table Header */}
          <ATMTableHeader
            isFilter={true}
           renderFilter={(close) => <FilterCardWrapper close={close} />}
            page={page}
            rowCount={totalItems}
            rowsPerPage={rowsPerPage}
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
          <div
            id="scroll-top"
            className="border flex flex-col grow rounded bg-white overflow-auto scroll-smooth"
          >
            <ATMTable
              disableRowClick={
                !AuthHOC({
                  type: "ACTION",
                  moduleName: "DISTRIBUTORS",
                  action: AccessAction.VIEW,
                  resultType: "BOOLEAN",
                })
              }
              onRowClick={(row: DistributorListResponse) => {
                navigate(`/distributor/${row._id}/applications`, {
                  state: {
                    distributor: row,
                  },
                });
              }}
              columns={columns}
              rows={rows}
              isLoading={isTableLoading}
              noDataMessage="No Distributor Found"
            />
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

export default DistributorListing;
