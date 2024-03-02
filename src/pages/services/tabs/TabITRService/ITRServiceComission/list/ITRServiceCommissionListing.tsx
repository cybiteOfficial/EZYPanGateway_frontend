import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ATMPagination from "src/components/UI/atoms/ATMPagination/ATMPagination";
import ATMTable from "src/components/UI/atoms/ATMTable/ATMTable";
import ATMTableHeader from "src/components/UI/atoms/ATMTableHeader/ATMTableHeader";
import { setRowsPerPage, setPage } from "src/redux/slices/ITRCommissionSlice";
import { AppDispatch, RootState } from "src/redux/store";
import AuthHOC from "src/userAccess/AuthHOC";
import { AccessAction } from "src/utils/Enums/AccessAction";

type Props = {
  columns: any[];
  rows: any[];
};

const ITRServiceCommissionListing = ({ columns, rows }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const itrCommissionState: any = useSelector(
    (state: RootState) => state.itrCommission
  );

  const { page, rowsPerPage, isTableLoading, totalItems } = itrCommissionState;

  return (
    <AuthHOC
      moduleName="COMMISSIONS"
      action={AccessAction.UPDATED_HISTORY}
    >
      <div className="flex flex-col gap-2 px-4 py-3 h-full">
        <div className="border flex flex-col overflow-auto rounded bg-white">
          {/*Table Header */}
          <ATMTableHeader
            page={page}
            rowCount={totalItems}
            rowsPerPage={rowsPerPage}
            rows={rows}
            isSearchVisible={false}
            onRowsPerPageChange={(newValue) =>
              dispatch(setRowsPerPage(newValue))
            }
          />

          {/* Table */}
          <div className="border flex flex-col grow overflow-auto rounded bg-white ">
            <ATMTable
              columns={columns}
              rows={rows}
              isLoading={isTableLoading}
              rowExtraClasses={() => "min-h-[30px]"}
            />
          </div>

          {/* Pagination */}
          <div className="flex items-center text-md justify-end border-t border-slate-300">
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
    </AuthHOC>
  );
};

export default ITRServiceCommissionListing;
