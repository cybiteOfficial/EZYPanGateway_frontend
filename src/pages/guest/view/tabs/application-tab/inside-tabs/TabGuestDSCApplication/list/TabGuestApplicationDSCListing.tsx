import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ATMPagination from "src/components/UI/atoms/ATMPagination/ATMPagination";
import ATMTable from "src/components/UI/atoms/ATMTable/ATMTable";
import ATMTableHeader from "src/components/UI/atoms/ATMTableHeader/ATMTableHeader";
import { DSCListResponse } from "src/models/DSC.model";
import { setRowsPerPage, setPage } from "src/redux/slices/DSCSlice";
import { AppDispatch, RootState } from "src/redux/store";
import FilterCardWrapper from "../TabGuestApplicationDSCFilterCard/FilterCardWrapper";
import AuthHOC from "src/userAccess/AuthHOC";
import { AccessAction } from "src/utils/Enums/AccessAction";

type Props = {
  columns: any[];
  rows: any[];
};

const TabGuestDSCApplicationListing = ({ columns, rows }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const dscState: any = useSelector(
    (state: RootState) => state.tabGuestDSCApplication
  );

  const { page, rowsPerPage, totalItems, isTableLoading } = dscState;

  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-2 px-4 py-3 h-full">
      <div className="border border-slate-100 flex flex-col overflow-auto rounded bg-white">
        {/*Table Header */}
        <ATMTableHeader
          page={page}
          rowCount={totalItems}
          renderFilter={(close) => <FilterCardWrapper close={close} />}
          rowsPerPage={rowsPerPage}
          rows={rows}
          onRowsPerPageChange={(newValue) => dispatch(setRowsPerPage(newValue))}
          isFilter
        />

        {/* Table */}
        <div className="border flex flex-col grow overflow-auto rounded bg-white">
          <ATMTable
            columns={columns}
            isLoading={isTableLoading}
            rows={rows}
            disableRowClick={
              !AuthHOC({
                moduleName: "DSC_APPLICATIONS",
                action: AccessAction.VIEW,
                resultType: "BOOLEAN",
              })
            }
            onRowClick={(row: DSCListResponse) => navigate(`/dsc/${row._id}`)}
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

export default TabGuestDSCApplicationListing;
