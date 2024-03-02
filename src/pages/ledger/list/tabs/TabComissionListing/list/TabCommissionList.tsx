import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ATMPagination from "src/components/UI/atoms/ATMPagination/ATMPagination";
import ATMTable from "src/components/UI/atoms/ATMTable/ATMTable";
import ATMTableHeader from "src/components/UI/atoms/ATMTableHeader/ATMTableHeader";
import {
  setRowsPerPage,
  setPage,
  setSearchValue,
} from "src/redux/slices/CommissionSlice";
import { AppDispatch, RootState } from "src/redux/store";
// import { Data, Headers } from "react-csv/components/CommonPropTypes";
import ATMExportButtonGroup from "src/components/UI/atoms/ATMExportButtonGroup/ATMExportButtonGroup";
import FilterCardWrapper from "src/pages/ledger/Dialog/CommisionCard/FilterCardWrapper";

type Props = {
  columns: any[];
  rows: any[];
  onExport: (done: () => void, isAllExport: boolean) => void;
  isAllExporting: boolean;
  exportDataHeaders: any;
  exportData: any;
  isCurrentExporting: boolean;
};

const TabCommissionList = ({ columns,
   rows ,
   onExport,
  exportDataHeaders,
  exportData,
  isAllExporting,
  isCurrentExporting
  }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const commissionState: any = useSelector((state: RootState) => state.commission);
  const { page, rowsPerPage, isTableLoading, searchValue, totalItems } =
    commissionState;

  return (
    <div className="flex flex-col gap-2 px-4 py-3 h-full">
      {/* Page Header */}
     <div className="flex justify-end items-end gap-2">
         
         <ATMExportButtonGroup
           isAllExporting={isAllExporting}
           isCurrentExporting={isCurrentExporting}
           onExport={onExport}
           allExportFileName="commission-list.csv"
           currentExportFileName="commission-list.csv"
           exportDataHeaders={exportDataHeaders}
           exportData={exportData}
         />
      
     </div>
      <div className="border flex flex-col overflow-auto rounded bg-white"> 
        {/*Table Header */}
        <ATMTableHeader 
        isFilter={true}
          page={page}
          rowCount={totalItems}
          rowsPerPage={rowsPerPage}
          rows={rows}
          renderFilter={(close) => <FilterCardWrapper close={close} />}
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

export default TabCommissionList;
