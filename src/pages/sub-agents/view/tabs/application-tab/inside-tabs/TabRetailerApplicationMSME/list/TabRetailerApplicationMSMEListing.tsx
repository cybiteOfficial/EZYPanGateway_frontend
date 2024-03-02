import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ATMPagination from "src/components/UI/atoms/ATMPagination/ATMPagination";
import ATMTable from "src/components/UI/atoms/ATMTable/ATMTable";
import ATMTableHeader from "src/components/UI/atoms/ATMTableHeader/ATMTableHeader";
import {
  setRowsPerPage,
  setPage,
  setSearchValue,
} from "src/redux/slices/TabRetailerMSMEApplicationSlice";
import { AppDispatch, RootState } from "src/redux/store";
import { MSMEListResponse } from "src/models/MSME.model";
import { useNavigate } from "react-router-dom";
import FilterCardWrapper from "../TabRetailerApplicationMSMEFilterCard/FilterCardWrapper";
import AuthHOC from "src/userAccess/AuthHOC";
import { AccessAction } from "src/utils/Enums/AccessAction";

type Props = {
  columns: any[];
  rows: any[];
};

const TabRetailerApplicationMSMEListing = ({ columns, rows }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const msmeState: any = useSelector(
    (state: RootState) => state.tabRetailerMSMEApplication
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
          renderFilter={(close) => <FilterCardWrapper close={close} />}
          isFilter
          rowsPerPage={rowsPerPage}
          onSearchChange={(newValue) => dispatch(setSearchValue(newValue))}
          searchValue={searchValue}
          rows={rows}
          onRowsPerPageChange={(newValue) => dispatch(setRowsPerPage(newValue))}
        />

        {/* Table */}
        <div className="border flex flex-col grow overflow-auto rounded bg-white">
          <ATMTable
            columns={columns}
            disableRowClick={
              !AuthHOC({
                moduleName: "MSME_APPLICATIONS",
                action: AccessAction.VIEW,
                resultType: "BOOLEAN",
              })
            }rows={rows}
            isLoading={isTableLoading}
            onRowClick={(row: MSMEListResponse) => navigate(`/msme/${row._id}`)}
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

export default TabRetailerApplicationMSMEListing;
