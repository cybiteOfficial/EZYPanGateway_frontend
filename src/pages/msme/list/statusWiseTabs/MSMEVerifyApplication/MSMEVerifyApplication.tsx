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
} from "src/redux/slices/MSMEApplication/MSMEVerifiedApplicationSlice";
import { MSMEListResponse } from "src/models/MSME.model";
import { AccessAction } from "src/utils/Enums/AccessAction";
import AuthHOC from "src/userAccess/AuthHOC";

type Props = {
  columns: columnTypes[];
  rows: any[];
};

const MSMEVerifiedApplication = ({ columns, rows }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const MSMEVerifiedApplicationState: any = useSelector(
    (state: RootState) => state.MSMEVerifiedApplication
  );

  const { page, rowsPerPage, isTableLoading, searchValue, totalItems } =
    MSMEVerifiedApplicationState;

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
          rows={rows}
          disableRowClick={
            !AuthHOC({
              type: "ACTION",
              moduleName: "MSME_APPLICATIONS",
              action: AccessAction.APPLIACTION_VIEW_ON_CLICK,
              resultType: "BOOLEAN",
            })
          }
          rowExtraClasses={(row) => "min-h-[40px]"}
          onRowClick={(row: MSMEListResponse) => navigate(`/msme/${row._id}`)}
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

export default MSMEVerifiedApplication;
