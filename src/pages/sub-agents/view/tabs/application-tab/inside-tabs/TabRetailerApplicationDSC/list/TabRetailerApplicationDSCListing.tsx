import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ATMPagination from "src/components/UI/atoms/ATMPagination/ATMPagination";
import ATMTable from "src/components/UI/atoms/ATMTable/ATMTable";
import ATMTableHeader from "src/components/UI/atoms/ATMTableHeader/ATMTableHeader";
import { AppDispatch, RootState } from "src/redux/store";
import FilterCardWrapper from "../TabRetailerApplicationDSCFilterCard/FilterCardWrapper";
import {
  setRowsPerPage,
  setPage,
  setSearchValue,
} from "src/redux/slices/TabRetailerDSCApplicationSlice";
import { useNavigate } from "react-router-dom";
import { DSCListResponse } from "src/models/DSC.model";
import AuthHOC from "src/userAccess/AuthHOC";
import { AccessAction } from "src/utils/Enums/AccessAction";

type Props = {
  columns: any[];
  rows: any[];
};

const TabRetailerApplicationDSCListing = ({ columns, rows }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const dscState: any = useSelector(
    (state: RootState) => state.tabRetailerDSCApplication
  );
  const { page, rowsPerPage, totalItems, searchValue, isTableLoading } =
    dscState;

  return (
    <div className="flex flex-col gap-2 px-4 py-3 h-full">
      <div className="border border-slate-100 flex flex-col overflow-auto rounded bg-white">
        {/*Table Header */}
        <ATMTableHeader
          page={page}
          rowCount={totalItems}
          rowsPerPage={rowsPerPage}
          renderFilter={(close) => <FilterCardWrapper close={close} />}
          isFilter
          rows={rows}
          onRowsPerPageChange={(newValue) => dispatch(setRowsPerPage(newValue))}
          searchValue={searchValue}
          onSearchChange={(newValue) => dispatch(setSearchValue(newValue))}
        />

        {/* Table */}
        <div className="border flex flex-col grow overflow-auto rounded bg-white">
          <ATMTable
            columns={columns}
            rows={rows}
            onRowClick={(row: DSCListResponse) => {
              navigate(`/dsc/${row._id}`);
            }}
            disableRowClick={
              !AuthHOC({
                moduleName: "DSC_APPLICATIONS",
                action: AccessAction.VIEW,
                resultType: "BOOLEAN",
              })
            }
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

export default TabRetailerApplicationDSCListing;
