import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ATMPagination from "src/components/UI/atoms/ATMPagination/ATMPagination";
import ATMTable from "src/components/UI/atoms/ATMTable/ATMTable";
import ATMTableHeader from "src/components/UI/atoms/ATMTableHeader/ATMTableHeader";
import {
  setRowsPerPage,
  setPage,
  setSearchValue,
} from "src/redux/slices/TabPaymentDetailDSCSlice";
import { AppDispatch, RootState } from "src/redux/store";
import AuthHOC from "src/userAccess/AuthHOC";
import { AccessAction } from "src/utils/Enums/AccessAction";

type Props = {
  columns: any[];
  rows: any[];
  isTableLoading: boolean;
 
};

const TabPaymentDSCApplicationListing = ({
  columns,
  rows,
  isTableLoading,
}: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const dscState = useSelector(
    (state: RootState) => state.TabPaymentDetailDSCSlice
  );
  const { page, rowsPerPage, searchValue, totalItems } = dscState;


  return (
 
      <div className="flex flex-col gap-2 px-4  h-full mt-4">
       
        <div className="border border-slate-100 flex flex-col overflow-auto rounded bg-white ">
          {/*Table Header */}
          <ATMTableHeader
            page={page}
            rowCount={totalItems}
            // renderFilter={(close) => <FilterCardWrapper close={close} />}
            rowsPerPage={rowsPerPage}
            rows={rows}
            onRowsPerPageChange={(newValue) =>
              dispatch(setRowsPerPage(newValue))
            }
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
              rows={rows}
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

export default TabPaymentDSCApplicationListing;




