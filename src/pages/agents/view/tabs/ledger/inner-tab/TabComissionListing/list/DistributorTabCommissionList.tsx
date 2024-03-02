import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import ATMPagination from "src/components/UI/atoms/ATMPagination/ATMPagination";
import ATMTable from "src/components/UI/atoms/ATMTable/ATMTable";
import ATMTableHeader from "src/components/UI/atoms/ATMTableHeader/ATMTableHeader";
import {
  setRowsPerPage,
  setPage,
  setSearchValue,
} from "src/redux/slices/TabDistributorComissionSlice";
import { AppDispatch, RootState } from "src/redux/store";
import CommissionFilterDialogWrapper from "../FilterDialog/CommissionFilterDialogWrapper";

type Props = {
  columns: any[];
  rows: any[];
  onAddNew: () => void;
  totalCommissionAmount:any
};

const DistributorTabCommissionList = ({ columns, rows ,onAddNew ,totalCommissionAmount }: Props) => { 
  const dispatch = useDispatch<AppDispatch>();

  const userType = JSON.parse(localStorage.getItem("userData") || "{}");

  const tabDistributorCommissionState: any = useSelector(
    (state: RootState) => state.tabDistributorCommission
  );
  const { page, rowsPerPage, searchValue, totalItems, isTableLoading } =
    tabDistributorCommissionState;

  return (
    <div className="flex flex-col gap-2 px-4 py-3 h-full">
      {userType?.type ==='SUPER_ADMIN' &&     <div className='flex justify-between mr-4 items-end'>
       <div className="px-5  pb-2">
          <p className="text-xl font-medium lg:text-2xl max-[1024px]:text-xl max-[1024px]:justify-center max-[1024px]:flex flex  xs:text-[16px]">
            Total Commission Amount:
            <span className="text-link flex items-center text-primary-dark ml-1">
              &#x20B9; {totalCommissionAmount?.totalCommission}
              {/* {commissionData?.totalCommission ? commissionData?.totalCommission : 0}/- */}
            </span>
          </p>
          <p className="text-lg font-medium lg:text-xl max-[1024px]:text-md max-[1024px]:justify-center max-[1024px]:flex flex  xs:text-[16px]">
            {" "}
            Platform Fees :
            <span className="text-link flex items-center text-primary-dark ml-1">
             &#x20B9;  {totalCommissionAmount?.platformFees}
              {/* {commissionData?.platformFees ? (commissionData?.platformFees).toFixed(2) : 0  }/- */}
            </span>
          </p>

        </div>
     <ATMLoadingButton onClick={onAddNew} className="w-[90px]">
              Add
            </ATMLoadingButton>
     </div>}
    
      <div className="border flex flex-col overflow-auto rounded bg-white">
        {/*Table Header */}
        <ATMTableHeader 
         isFilter={true}
          page={page}
          rowCount={totalItems}
          rowsPerPage={rowsPerPage}
          rows={rows} 
          renderFilter={(close) => <CommissionFilterDialogWrapper close={close} />}
          onRowsPerPageChange={(newValue) => dispatch(setRowsPerPage(newValue))}
          searchValue={searchValue}
          onSearchChange={(newValue) => dispatch(setSearchValue(newValue))}
        />

        {/* Table */}
        <div className="border flex flex-col grow overflow-auto rounded bg-white">
          <ATMTable columns={columns} rows={rows} isLoading={isTableLoading} />{" "}
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
  );
};

export default DistributorTabCommissionList;
