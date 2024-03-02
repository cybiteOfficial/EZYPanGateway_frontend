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
} from "src/redux/slices/ITRApplication/ITRVerifiedApplicationSlice";
import { ITRListResponse } from "src/models/ITR.model";
import AuthHOC from "src/userAccess/AuthHOC";
import { AccessAction } from "src/utils/Enums/AccessAction";

type Props = {
  columns: columnTypes[];
  rows: any[];
};

const ITRVerifyApplicationListing = ({ columns, rows }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const ITRVerifiedApplicationState: any = useSelector(
    (state: RootState) => state.ITRVerifiedApplication
  );

  const { page, rowsPerPage, isTableLoading, searchValue, totalItems } =
    ITRVerifiedApplicationState;

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
          isLoading={isTableLoading}
          disableRowClick={
            !AuthHOC({
              type: "ACTION",
              moduleName: "ITR_APPLICATIONS",
              action: AccessAction.APPLIACTION_VIEW_ON_CLICK,
              resultType: "BOOLEAN",
            })
          }   rows={rows}
          rowExtraClasses={(row) => "min-h-[40px]"}
          onRowClick={(row: ITRListResponse) => navigate(`/itr/${row._id}`)}
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

export default ITRVerifyApplicationListing;
