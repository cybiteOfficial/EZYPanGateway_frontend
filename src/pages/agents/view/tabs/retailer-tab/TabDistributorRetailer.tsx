import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ATMPagination from "src/components/UI/atoms/ATMPagination/ATMPagination";
import ATMTable from "src/components/UI/atoms/ATMTable/ATMTable";
import ATMTableHeader from "src/components/UI/atoms/ATMTableHeader/ATMTableHeader";
import {
  setRowsPerPage,
  setPage,
  setSearchValue,
} from "src/redux/slices/TabDistributorRetailerSlice";
import { AppDispatch, RootState } from "src/redux/store";
import AuthHOC from "src/userAccess/AuthHOC";
import { AccessAction } from "src/utils/Enums/AccessAction";

type Props = {
  columns: any[];
  rows: any[];
};

const TabDistributorRetailer = ({ columns, rows }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const retailerState: any = useSelector(
    (state: RootState) => state.tabDistributorRetailer
  );
  // const [isFilterOpen, setIsFilterOpen] = useState(false);
  const navigate = useNavigate();
  const { page, rowsPerPage, searchValue, totalItems, isTableLoading } =
    retailerState;

  return (
    <div className="flex flex-col gap-2 px-4 py-3 h-full">
      {/* Page Header */}
      <div className="flex justify-end items-end gap-2"></div>

      <div className="border flex flex-col overflow-auto rounded bg-white">
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
            rows={rows}
            disableRowClick={
              !AuthHOC({
                moduleName: "RETAILERS",
                action: AccessAction.VIEW,
                resultType: "BOOLEAN",
              })
            }
            onRowClick={(row: any) =>
              navigate(`/retailer/${row._id}/applications`, {
                state: {
                  retailer: row,
                },
              })
            }
            isLoading={isTableLoading}
            rowExtraClasses={() => "min-h-[30px]"}
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

export default TabDistributorRetailer;
