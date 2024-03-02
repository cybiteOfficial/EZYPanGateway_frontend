import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ATMPagination from "src/components/UI/atoms/ATMPagination/ATMPagination";
import ATMTable from "src/components/UI/atoms/ATMTable/ATMTable";
import ATMTableHeader from "src/components/UI/atoms/ATMTableHeader/ATMTableHeader";
import {
  setRowsPerPage,
  setPage,
  setSearchValue,
} from "src/redux/slices/AppVideoSlice";
import { AppDispatch, RootState } from "src/redux/store";
import { useNavigate } from "react-router-dom";
import AuthHOC from "src/userAccess/AuthHOC";
import NotAuthorizedPage from "src/components/UI/NotAuthorized/NotAuthorizedPage";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import { AccessAction } from "src/utils/Enums/AccessAction";

type Props = {
  columns: any[];
  rows: any[];
};

const TabAppVideoList = ({ columns, rows }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const appVideoState: any = useSelector((state: RootState) => state.appVideo);
  const { page, rowsPerPage, isTableLoading, searchValue, totalItems } =
    appVideoState;

  return (
    <AuthHOC
      moduleName="VIDEOS"
      action={AccessAction.LIST}
      alt={<NotAuthorizedPage />}
    >
      <div className="flex flex-col gap-2 px-4 py-3 h-full">
        {/* Page Header */}
        <div className="flex justify-end items-end gap-2">
          <AuthHOC
            moduleName="VIDEOS"
            action={AccessAction.ADD}
          >
           <ATMLoadingButton onClick={() => navigate("add")}>
              Add New Form
            </ATMLoadingButton>
          </AuthHOC>
        </div>

        <div className="border flex flex-col overflow-auto rounded bg-white">
          {/*Table Header */}
          <ATMTableHeader
            page={page}
            rowCount={totalItems}
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
              rows={rows}
              
              isLoading={isTableLoading}
             
            />{" "}
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

export default TabAppVideoList;
