import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ATMPagination from "src/components/UI/atoms/ATMPagination/ATMPagination";
import ATMTable from "src/components/UI/atoms/ATMTable/ATMTable";
import ATMTableHeader from "src/components/UI/atoms/ATMTableHeader/ATMTableHeader";
import { AppDispatch, RootState } from "src/redux/store";
import { ITRListResponse } from "src/models/ITR.model";
import {  useNavigate } from "react-router-dom";
import FilterCardWrapper from "./TabGuestApplicationITRFilterCard/FilterCardWrapper";
import {
  setRowsPerPage,
  setPage,
  setSearchValue,
} from "src/redux/slices/TabGuestITRApplicationSlice";
import { AccessAction } from "src/utils/Enums/AccessAction";
import AuthHOC from "src/userAccess/AuthHOC";
type Props = {
  columns: any[];
  rows: any[];
};

const TabGuestITRApplicationListing = ({ columns, rows }: Props) => {

  const dispatch = useDispatch<AppDispatch>();
  const itrState: any = useSelector(
    (state: RootState) => state.tabGuestITRApplication
  );
  const navigate = useNavigate();
  const { page, rowsPerPage, totalItems, searchValue, isTableLoading } =
    itrState;
  return (
    <div className="flex flex-col gap-2 px-4 py-1 h-full">

      <div className="border border-slate-100  flex flex-col overflow-auto rounded bg-white">

        {/*Table Header */}
        <ATMTableHeader
          page={page}
          rowCount={totalItems}
          rowsPerPage={rowsPerPage}
          renderFilter={(close) => <FilterCardWrapper close={close} />}
          rows={rows}
          onRowsPerPageChange={(newValue) => dispatch(setRowsPerPage(newValue))}
          isFilter
          searchValue={searchValue}
          onSearchChange={(newValue) => dispatch(setSearchValue(newValue))}
        // onFilterClick={() => setIsFilterOpen(true)}
        />

        {/* Table */}
        <div className="border flex flex-col grow overflow-auto rounded bg-white">
          <ATMTable columns={columns}
           rows={rows}
           disableRowClick={
            !AuthHOC({
              action: AccessAction.VIEW,
              moduleName: "ITR_APPLICATIONS",
              resultType: "BOOLEAN",
            })
          }
           isLoading={isTableLoading}
            onRowClick={(row: ITRListResponse) => navigate(`/itr/${row._id}`)} />        </div>

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

export default TabGuestITRApplicationListing;
