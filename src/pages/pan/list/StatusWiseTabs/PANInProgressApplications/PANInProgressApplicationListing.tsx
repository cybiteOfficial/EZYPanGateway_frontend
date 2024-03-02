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
  setOrderByValue
} from "src/redux/slices/PANApplication/PANInProgressApplicationSlice";
import { PANListResponse } from "src/models/PAN.model";
import AuthHOC from "src/userAccess/AuthHOC";
import { AccessAction } from "src/utils/Enums/AccessAction";

type Props = {
  columns: columnTypes[];
  rows: any[];
};

const PANInProgressApplicationListing = ({ columns, rows }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const PANInProgressApplicationState: any = useSelector(
    (state: RootState) => state.PANInProgressApplication
  );

  const { page, rowsPerPage, isTableLoading, searchValue, totalItems , orderByValue } =
    PANInProgressApplicationState;

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
        orderValue={orderByValue}
        onOrderByChange={(newValue)=>dispatch(setOrderByValue(newValue))} 
        isShowOrder={true}
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
              moduleName: "PAN_APPLICATIONS",
              action: AccessAction.VIEW,
              resultType: "BOOLEAN",
            })
          }
          rowExtraClasses={(row) => "min-h-[40px]"}
          onRowClick={(row: PANListResponse) => navigate(`/pan/${row._id}`)}
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

export default PANInProgressApplicationListing;
