import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "src/redux/store";

import ATMPagination from "src/components/UI/atoms/ATMPagination/ATMPagination";
import ATMTable, {
  columnTypes,
} from "src/components/UI/atoms/ATMTable/ATMTable";
import ATMTableHeader from "src/components/UI/atoms/ATMTableHeader/ATMTableHeader";
import {
  setRowsPerPage,
  setPage,
  setSearchValue,
} from "src/redux/slices/TabHistoryPanApplicationSlice";
import { PANListResponse } from "src/models/PAN.model";
import ATMExportButtonGroup from "src/components/UI/atoms/ATMExportButtonGroup/ATMExportButtonGroup";
import FilterCardWrapper from "../TabHistoryApplicationPANFilterCard/FilterCardWrapper";
// import { Data, Headers } from "react-csv/components/CommonPropTypes";
import AuthHOC from "src/userAccess/AuthHOC";
import NotAuthorizedPage from "src/components/UI/NotAuthorized/NotAuthorizedPage";
import { AccessAction } from "src/utils/Enums/AccessAction";

type Props = {
  columns: columnTypes[];
  rows: any[];
  onExport: (done: () => void, isAllExport: boolean) => void;
  isAllExporting: boolean;
  isCurrentExporting: boolean;
  isTableLoading: boolean;
  exportDataHeaders: any;
  exportData: any;
};

const TabHistoryApplicationPANListing = ({
  columns,
  rows,
  onExport,
  isAllExporting,
  isCurrentExporting,
  isTableLoading,
  exportDataHeaders,
  exportData,
}: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const panState: any = useSelector(
    (state: RootState) => state.tabHistoryPanApplication
  );
  const { page, rowsPerPage, totalItems, searchValue } = panState;
  return (
    <AuthHOC
      moduleName="PAN_APPLICATIONS"
      action={AccessAction.HISTORY}
      alt={<NotAuthorizedPage />}
    >
      <div className="flex flex-col gap-2 px-4  h-full  ">
        <div className="flex justify-end items-end gap-2 px-2 mt-2">
          <ATMExportButtonGroup
            isAllExporting={isAllExporting}
            isCurrentExporting={isCurrentExporting}
            onExport={onExport}
            allExportFileName="all-History-Pan.csv"
            currentExportFileName="current-History-Pan.csv"
            exportDataHeaders={exportDataHeaders}
            exportData={exportData}
          />
        </div>

        <div className=" border border-slate-100 flex flex-col overflow-auto rounded bg-white ">
          {/*Table Header */}
          <ATMTableHeader
            page={page}
            rowCount={totalItems}
            rowsPerPage={rowsPerPage}
            renderFilter={(close) => <FilterCardWrapper close={close} />}
            rows={rows}
            onRowsPerPageChange={(newValue) =>
              dispatch(setRowsPerPage(newValue))
            }
            searchValue={searchValue}
            onSearchChange={(newValue) => dispatch(setSearchValue(newValue))}
            isFilter
          />

          {/* Table */}
          <div className=" border flex flex-col grow overflow-auto rounded bg-white">
            <ATMTable
              disableRowClick={
                !AuthHOC({
                  type: "ACTION",
                  moduleName: "PAN_APPLICATIONS",
                  action: AccessAction.VIEW,
                  resultType: "BOOLEAN",
                })
              }
              columns={columns}
              rows={rows}
              onRowClick={(row: PANListResponse) => navigate(`/pan/${row._id}`)}
              isLoading={isTableLoading}
            />
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-end border-t border-slate-300">
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

export default TabHistoryApplicationPANListing;
