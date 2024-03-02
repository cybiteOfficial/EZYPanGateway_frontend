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
} from "src/redux/slices/DigitalPANSlice";
import ATMBreadCrumbs, {
  BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";

type Props = {
  columns: columnTypes[];
  rows: any[];
};

const DigitalPanListing = ({ columns, rows }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const DigitalPanApplicationState: any = useSelector(
    (state: RootState) => state.DigitalPANSlice
  );
  
  const { page, rowsPerPage, isTableLoading, searchValue, totalItems } =
   DigitalPanApplicationState; 
   
   const breadcrumbs: BreadcrumbType[] = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "Digital Pan",
    },
  ];


  return (
    <div className="border flex flex-col overflow-auto rounded bg-white "> 
    <div className="py-3  px-4 pt-5" >
    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
    </div>
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
        <ATMTable
          columns={columns}
          isLoading={isTableLoading}
          rows={rows}
          rowExtraClasses={(row) => "min-h-[40px]"}
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
  );
};

export default DigitalPanListing;

