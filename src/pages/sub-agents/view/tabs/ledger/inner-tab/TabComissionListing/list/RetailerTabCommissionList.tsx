import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ATMPagination from "src/components/UI/atoms/ATMPagination/ATMPagination";
import ATMTable from "src/components/UI/atoms/ATMTable/ATMTable";
import ATMTableHeader from "src/components/UI/atoms/ATMTableHeader/ATMTableHeader";
import { AppDispatch, RootState } from "src/redux/store";
import {
  setSearchValue,
  setRowsPerPage,
  setPage,
} from "src/redux/slices/TabRetailerComissionSlice";
type Props = {
  columns: any[];
  rows: any[];
};

const RetailerTabCommissionList = ({ columns, rows }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
 
  const tabRetailerSlice: any = useSelector(
    (state: RootState) => state.tabRetailerComission
  );
  const { page, rowsPerPage,  searchValue,totalItems } = tabRetailerSlice;

  return (
    <div className="flex flex-col gap-2 px-4 py-3 h-full">
      <div className="border flex flex-col overflow-auto rounded bg-white">
        {/*Table Header */}
        <ATMTableHeader
           page={page}
           rowCount={totalItems}
           rowsPerPage={rowsPerPage}
           rows={rows}
           onRowsPerPageChange={(newValue) => dispatch(setRowsPerPage(newValue))}
           searchValue={searchValue}
           onSearchChange={(newValue) => dispatch(setSearchValue(newValue))}
        />

        {/* Table */}
        <div className="border flex flex-col grow overflow-auto rounded bg-white">
          <ATMTable columns={columns} rows={rows} />{" "}
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

export default RetailerTabCommissionList;
