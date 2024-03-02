import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import ATMPagination from "src/components/UI/atoms/ATMPagination/ATMPagination";
import ATMTable from "src/components/UI/atoms/ATMTable/ATMTable";
import ATMTableHeader from "src/components/UI/atoms/ATMTableHeader/ATMTableHeader";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import {
  setSearchValue,
  setRowsPerPage,
  setPage,
} from "src/redux/slices/TabRetailerRewardSlice";
import { AppDispatch, RootState } from "src/redux/store";
import {
  useGetUserRewardWalletQuery,
  useUpdateUserRewardWalletMutation,
} from "src/services/RewardService";
import { showConfirmationDialog } from "src/utils/showConfirmationDialog";
import { showToast } from "src/utils/toaster/showToast";

type Props = {
  columns: any[];
  rows: any[];
  onAddNew: () => void;
};

const RetailerTabRewardList = ({ columns, rows, onAddNew }: Props) => { 

  const userType = JSON.parse(localStorage.getItem("userData") || "{}");

  const dispatch = useDispatch<AppDispatch>();
  const rewardState: any = useSelector(
    (state: RootState) => state.tabRetailerReward
  );
  const { page, rowsPerPage, searchValue, totalItems, isTableLoading } =
    rewardState;
  const { retailerId } = useParams();

  //Wallet Amount UseState
  const [walletAmount, setWalletAmount] = useState<any>(0);
  // Update Wallet Amount
  const [updateWallet] = useUpdateUserRewardWalletMutation();
  // Get Total Wallet Amount Query
  const {
    data: walletAmountData,
    isLoading: isLoadingWalletAmountData,
    isFetching: isFetchingWalletAmount,
  } = useGetUserRewardWalletQuery(retailerId);

  // To Set Total Wallet Amount
  useEffect(() => {
    if (!isLoadingWalletAmountData && !isFetchingWalletAmount) {
      setWalletAmount(walletAmountData?.data?.[0]?.totalReward);
    }
  }, [isFetchingWalletAmount, isLoadingWalletAmountData, walletAmountData]);

  return (
    <div className="flex flex-col gap-2 px-4 py-3 h-full">
      {/* Update / Add Wallet Amount  UI */}
    {userType?.type ==='SUPER_ADMIN' &&   <div className="flex justify-between mr-4  items-end">
        {/* Update */}
        <div className="px-3 flex  items-end gap-5 ">
          {/* Total Reward Wallet */}
          <ATMTextField
            type="number"
            value={walletAmount}
            onChange={(e) => {
              setWalletAmount(e.target.value);
            }}
            label={`Total Reward Amount ${"(In Rupees)"}`}
            placeholder="Total Reward"
          />

          <ATMLoadingButton
            className="h-[40px]"
            onClick={() => {
              showConfirmationDialog({
                title: "Heads Up",
                text: "Are you sure you want to update this wallet ?",
                icon: "question",
                showCancelButton: true,
                next: (result) => {
                  if (result.isConfirmed) {
                    updateWallet({
                      amountToBeUpdate:Number(walletAmount) ,
                      userId: retailerId,
                    }).then((res: any) => {
                      if (res.error) {
                        showToast("error", res?.error?.data?.message);
                      } else {
                        showToast("success", res?.data?.message);
                      }
                    });
                  }
                },
              });
            }}
          >
            Update
          </ATMLoadingButton>
        </div>
        {/* Add */}
        <ATMLoadingButton onClick={onAddNew} className="w-[90px]">
          Add
        </ATMLoadingButton>
      </div>}
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

export default RetailerTabRewardList;
