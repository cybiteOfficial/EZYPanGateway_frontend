import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ATMPagination from "src/components/UI/atoms/ATMPagination/ATMPagination";
import ATMTable, {
  columnTypes,
} from "src/components/UI/atoms/ATMTable/ATMTable";
import ATMTableHeader from "src/components/UI/atoms/ATMTableHeader/ATMTableHeader";
import { AppDispatch, RootState } from "src/redux/store";
import {
  setRowsPerPage,
  setPage,
  setSearchValue,
} from "src/redux/slices/DSCApplication/DSCCancelledApplicationSlice";
import { DSCListResponse } from "src/models/DSC.model";
import AuthHOC from "src/userAccess/AuthHOC";
import { AccessAction } from "src/utils/Enums/AccessAction";

type Props = {
  columns: columnTypes[];
  rows: any[];
};
const DSCCancelledApplication = ({ columns, rows }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const DSCCancelledApplicationState: any = useSelector(
    (state: RootState) => state.DSCCancelledApplication
  );

  const { page, rowsPerPage, isTableLoading, searchValue, totalItems } =
    DSCCancelledApplicationState;
  return (
    <div className="border flex flex-col overflow-auto rounded bg-white ">
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
          disableRowClick={
            !AuthHOC({
              type: "ACTION",
              moduleName: "DSC_APPLICATIONS",
              action: AccessAction.VIEW,
              resultType: "BOOLEAN",
            })
          }
          isLoading={isTableLoading}
          rows={rows}
          rowExtraClasses={(row) => "min-h-[40px]"}
          onRowClick={(row: DSCListResponse) => navigate(`/dsc/${row._id}`)}
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

export default DSCCancelledApplication;
