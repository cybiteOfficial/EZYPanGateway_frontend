import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "src/redux/store";
import {
  setRowsPerPage,
  setPage,
  setSearchValue,
} from "src/redux/slices/TabRetailerPanApplicationSlice";
import ATMPagination from "src/components/UI/atoms/ATMPagination/ATMPagination";
import ATMTable, {
  columnTypes,
} from "src/components/UI/atoms/ATMTable/ATMTable";
import ATMTableHeader from "src/components/UI/atoms/ATMTableHeader/ATMTableHeader";
import { PANListResponse } from "src/models/PAN.model";
import FilterCardWrapper from "../TabRetailerApplicationPANFilterCard/FilterCardWrapper";
import AuthHOC from "src/userAccess/AuthHOC";
import { AccessAction } from "src/utils/Enums/AccessAction";

type Props = {
  columns: columnTypes[];
  rows: any[];
};

const TabRetailerApplicationPANListing = ({ columns, rows }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const panState: any = useSelector(
    (state: RootState) => state.tabRetailerPanApplication
  );

  const { page, rowsPerPage, searchValue, totalItems, isTableLoading } =
    panState;

  return (
    <div className="flex flex-col gap-2 px-4  h-full ">
      <div className="border border-slate-100 flex flex-col overflow-auto rounded bg-white ">
        {/*Table Header */}
        <ATMTableHeader
          page={page}
          rowCount={totalItems}
          rowsPerPage={rowsPerPage}
          rows={rows}
          onRowsPerPageChange={(newValue) => dispatch(setRowsPerPage(newValue))}
          renderFilter={(close) => <FilterCardWrapper close={close} />}
          searchValue={searchValue}
          onSearchChange={(newValue) => dispatch(setSearchValue(newValue))}
          isFilter
        />

        {/* Table */}
        <div className="border flex flex-col grow overflow-auto rounded bg-white">
          <ATMTable
            columns={columns}
            rows={rows}
            disableRowClick={
              !AuthHOC({
                action: AccessAction.VIEW,
                moduleName: "PAN_APPLICATIONS",
                resultType: "BOOLEAN",
              })
            }
            onRowClick={(row: PANListResponse) => navigate(`/pan/${row._id}`)}
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

export default TabRetailerApplicationPANListing;
