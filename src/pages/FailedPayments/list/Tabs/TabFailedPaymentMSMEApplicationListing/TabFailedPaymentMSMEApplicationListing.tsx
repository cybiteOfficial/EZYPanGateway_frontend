import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ATMPagination from "src/components/UI/atoms/ATMPagination/ATMPagination";
import ATMTable from "src/components/UI/atoms/ATMTable/ATMTable";
import ATMTableHeader from "src/components/UI/atoms/ATMTableHeader/ATMTableHeader";
import {
  setRowsPerPage,
  setPage,
  setSearchValue,
} from "src/redux/slices/TabFailedPaymentMSMESlice";
import { AppDispatch, RootState } from "src/redux/store";
import ATMExportButtonGroup from "src/components/UI/atoms/ATMExportButtonGroup/ATMExportButtonGroup";
// import { Data, Headers } from "react-csv/components/CommonPropTypes";
import AuthHOC from "src/userAccess/AuthHOC";
import { AccessAction } from "src/utils/Enums/AccessAction";
import MsmeFailedApplicationFilterCardWrapper from "./MsmeFailedApplicationFilterCard/MsmeFailedApplicationFilterCardWrapper";

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

const TabFailedPaymentMSMEApplicationListing = ({
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
  const msmeState = useSelector(
    (state: RootState) => state.TabFailedPaymentMSME
  );
  const { page, rowsPerPage, totalItems, searchValue } = msmeState;

  return (
   
      <div className="flex flex-col gap-2 px-4 h-full ">
        <div className="flex justify-end items-end gap-2 px-2 mt-2">
          <ATMExportButtonGroup
            isAllExporting={isAllExporting}
            isCurrentExporting={isCurrentExporting}
            onExport={onExport}
            allExportFileName="all-History-Msme.csv"
            currentExportFileName="current-History-Msme.csv"
            exportDataHeaders={exportDataHeaders}
            exportData={exportData}
          />
        </div>

        <div className="border border-slate-100 flex flex-col overflow-auto rounded bg-white ">
          {/*Table Header */}
          <ATMTableHeader
            page={page}
            rowCount={totalItems}
            isFilter
            renderFilter={(close) => <MsmeFailedApplicationFilterCardWrapper close={close} />}
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
              disableRowClick={
                !AuthHOC({
                  type: "ACTION",
                  moduleName: "MSME_APPLICATIONS",
                  action: AccessAction.VIEW,
                  resultType: "BOOLEAN",
                })
              }
              rows={rows}
              isLoading={isTableLoading}
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
  );
};

export default TabFailedPaymentMSMEApplicationListing;
