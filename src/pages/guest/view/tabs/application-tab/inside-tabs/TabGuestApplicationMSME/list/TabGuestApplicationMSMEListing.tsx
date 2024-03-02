import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ATMPagination from "src/components/UI/atoms/ATMPagination/ATMPagination";
import ATMTable from "src/components/UI/atoms/ATMTable/ATMTable";
import ATMTableHeader from "src/components/UI/atoms/ATMTableHeader/ATMTableHeader";
import {
  setRowsPerPage,
  setPage,
  setSearchValue,
} from "src/redux/slices/TabGuestMSMEApplicationSlice";
import { AppDispatch, RootState } from "src/redux/store";
import { MSMEListResponse } from "src/models/MSME.model";
import { useNavigate } from "react-router-dom";
import FilterCardWrapper from "../TabGuestApplicationMSMEFilterCard/FilterCardWrapper";
import AuthHOC from "src/userAccess/AuthHOC";
import { AccessAction } from "src/utils/Enums/AccessAction";


type Props = {
  columns: any[];
  rows: any[];
};


const TabGuestApplicationMSMEListing = ({ columns, rows }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const msmeState: any = useSelector(
    (state: RootState) => state.tabGuestMSMEApplication
  );
  const navigate = useNavigate();
  const { page, rowsPerPage, searchValue, totalItems,isTableLoading } = msmeState;

  return (
    <div className="flex flex-col gap-2 px-4 h-full">
      <div className="border  border-slate-100  flex flex-col overflow-auto rounded bg-white">
        {/*Table Header */}
        <ATMTableHeader
          page={page}
          rowCount={totalItems}
          rowsPerPage={rowsPerPage}
          renderFilter={(close) => <FilterCardWrapper close={close} />}
          rows={rows}
          isFilter
          onRowsPerPageChange={(newValue) => dispatch(setRowsPerPage(newValue))}
          searchValue={searchValue}
          onSearchChange={(newValue) => dispatch(setSearchValue(newValue))}
        />

        {/* Table */}
        <div className="border flex flex-col grow overflow-auto rounded bg-white">
          <ATMTable
            columns={columns}
            rows={rows}
            disableRowClick={
              !AuthHOC({
                moduleName: "MSME_APPLICATIONS",
                action: AccessAction.VIEW,
                resultType: "BOOLEAN",
              })
            }
            onRowClick={(row: MSMEListResponse) => navigate(`/msme/${row._id}`)}
            isLoading = {isTableLoading}
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
    </div>
  );
};

export default TabGuestApplicationMSMEListing;
