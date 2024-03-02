import React from "react";
import { useDispatch, useSelector } from "react-redux";
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
} from "src/redux/slices/TabHistoryITRApplicationSlice";
import ATMExportButtonGroup from "src/components/UI/atoms/ATMExportButtonGroup/ATMExportButtonGroup";
import FilterCardWrapper from "../TabHistoryApplicationITRFilterCard/FilterCardWrapper";
import { ITRListResponse } from "src/models/ITR.model";
import { useNavigate } from "react-router-dom";
// import { Data, Headers } from "react-csv/components/CommonPropTypes";
import NotAuthorizedPage from "src/components/UI/NotAuthorized/NotAuthorizedPage";
import AuthHOC from "src/userAccess/AuthHOC";
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

const TabHistoryApplicationITRListing = ({
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
  const itrState = useSelector(
    (state: RootState) => state.tabHistoryITRApplication
  );

  const { page, rowsPerPage, totalItems, searchValue } =
    itrState;

  const navigate = useNavigate();

  return (
    <AuthHOC
    moduleName="ITR_APPLICATIONS"
    action={AccessAction.HISTORY}
    alt={<NotAuthorizedPage />}
  >
    <div className="flex flex-col  px-4  h-full ">
      <div className="flex justify-end items-end gap-2 px-2 mt-2">
        <ATMExportButtonGroup
          isAllExporting={isAllExporting}
          isCurrentExporting={isCurrentExporting}
          onExport={onExport}
          allExportFileName="all-History-Itr.csv"
          currentExportFileName="current-History-Itr.csv"
          exportDataHeaders={exportDataHeaders}
          exportData={exportData}
        />
      </div>


      <div className="border border-slate-100 flex flex-col overflow-auto rounded bg-white ">
        {/*Table Header */}
        <ATMTableHeader
          page={page}
          rowCount={totalItems}
          rowsPerPage={rowsPerPage}
          renderFilter={(close) => <FilterCardWrapper close={close} />}
          rows={rows}
          onRowsPerPageChange={(newValue) => dispatch(setRowsPerPage(newValue))}
          searchValue={searchValue}
          onSearchChange={(newValue) => dispatch(setSearchValue(newValue))}
          isFilter
        />

        {/* Table */}
        <div className="border flex flex-col grow overflow-auto rounded bg-white">
          <ATMTable
            columns={columns}
            disableRowClick={
              !AuthHOC({
                type: "ACTION",
                moduleName: "ITR_APPLICATIONS",
                action: AccessAction.VIEW,
                resultType: "BOOLEAN",
              })
            }   rows={rows}
            isLoading={isTableLoading}
            onRowClick={(row: ITRListResponse) => navigate(`/itr/${row._id}`)}
          />{" "}
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

export default TabHistoryApplicationITRListing;
