
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
} from "src/redux/slices/TabPaymentDetailITRSlice";
import AuthHOC from "src/userAccess/AuthHOC";
import { AccessAction } from "src/utils/Enums/AccessAction";

type Props = {
  columns: columnTypes[];
  rows: any[];
  isTableLoading: boolean;
};

const TabPaymentDetailITRApplicationListing = ({
   columns,
    rows,
    isTableLoading,
  }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const itrState = useSelector(
    (state: RootState) => state.TabPaymentDetailITRSlice
  );

  const { page, rowsPerPage, totalItems, searchValue } =
    itrState;


  return (
   
    <div className="flex flex-col  px-4  h-full mt-4 ">


      <div className="border border-slate-100 flex flex-col overflow-auto rounded bg-white ">
        {/*Table Header */}
        <ATMTableHeader
          page={page}
          rowCount={totalItems}
          rowsPerPage={rowsPerPage}
          // renderFilter={(close) => <FilterCardWrapper close={close} />}
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
                moduleName: "ITR_APPLICATIONS",
                action: AccessAction.VIEW,
                resultType: "BOOLEAN",
              })
            }   rows={rows}
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

export default TabPaymentDetailITRApplicationListing;


