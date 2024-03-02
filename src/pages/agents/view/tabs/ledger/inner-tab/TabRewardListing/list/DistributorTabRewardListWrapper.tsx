import React, { useEffect , useState } from "react";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { RewardListResponse } from "src/models/Reward.model";
import { formatDateAndTime } from "src/utils/dateAndTime";
import DistributorTabRewardList from "./DistributorTabRewardList";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
  setFilterBy,
} from "src/redux/slices/TabDistributorRewardSlice";
import { AppDispatch, RootState } from "src/redux/store";
import { useDeleteRewardEntryInLedgerMutation, useGetRewardListQuery } from "src/services/RewardService";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getColumns } from "src/utils/auth/getColumns";
import AddDistributorRewardWrapper from "../component/Add/AddDistributorRewardWrapper";
import EditDistributorRewardWrapper from "../component/Edit/EditDistributorRewardWrapper";
import { RxPencil1 } from "react-icons/rx";
import { MdDeleteOutline } from "react-icons/md";
import { showConfirmationDialog } from "src/utils/showConfirmationDialog";
import { showToast } from "src/utils/toaster/showToast";
import ATMMenu from "src/components/UI/atoms/ATMMenu/ATMMenu";
import { CircularProgress } from "@mui/material";

const paramList = [
  "_id",
  "userId",
  "points",
  "applicationType",
  "logs",
  "isDeleted",
  "isActive",
  "createdAt",
  "updatedAt",
];

const DistributorTabRewardListWrapper = () => {
  const dispatch = useDispatch<AppDispatch>(); 
  const [isOpenAddFrom, setIsOpenAddForm] = useState(false);
  const [isOpenEditForm, setIsOpenEditForm] = useState(false);
  const [selectedRefundId, setSelectedRefundId] = useState("");

  const { page, filterBy, rowsPerPage, searchValue, items , dateFilter } = useSelector(
    (state: RootState) => state.tabDistributorReward
  );
  const { distributorId } = useParams();
  
   const [deleteReward] = useDeleteRewardEntryInLedgerMutation()
  const { data, isLoading, isFetching } = useGetRewardListQuery({
    limit: rowsPerPage,
    searchValue: searchValue,
    params: paramList,
    page: page,
    filterBy: filterBy,
    dateFilter : dateFilter ,
    orderBy: "createdAt",
    orderByValue: -1,
    isPaginationRequired: true,
  });

  React.useEffect(() => {
    if (!isFetching && !isLoading) {
      dispatch(setIsTableLoading(false));
      dispatch(setItems(data?.data || []));
      dispatch(setTotalItems(data?.totalItem || 0));
    } else {
      dispatch(setIsTableLoading(true));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isFetching, data]);

  useEffect(() => {
    dispatch(
      setFilterBy(
        filterBy.map((filter) => {
          if (filter.fieldName === "userId") {
            return {
              ...filter,
              value: [distributorId || ""],
            };
          } else {
            return filter;
          }
        })
      )
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [distributorId]);

  const getActionOptions = (row: any) => {
    return [
      {
        label: (
          <div className="flex gap-2 items-center text-secondary-main">
            <RxPencil1 className="text-lg" /> Edit
          </div>
        ),
        onClick: () => {
          setSelectedRefundId(row?._id);
          setIsOpenEditForm(true);
        },
      },
      {
        label: (
          <div className="flex gap-2 items-center text-red-600 font-semibold">
            <MdDeleteOutline className="text-lg" /> Delete
          </div>
        ),
        onClick: () => {
          showConfirmationDialog({
            title: "Heads Up",
            text: "Are you sure want to Delete this Entry ?",
            icon: "question",
            showCancelButton: true,
            next: (result) => {
              if (result.isConfirmed) {
                deleteReward(row._id).then((res: any) => {
                  if (res.error) {
                    showToast("error", res?.error?.data?.message);
                  } else {
                    showToast("success", res?.data?.message);
                  }
                });
              }
            },
          });
        },
      },
    ];
  };

  const columns: columnTypes[] = [
    {
      noAuthRequired: true,
      field: "date_and_time",
      headerName: "Date - Time",
      flex: "flex-[1_1_0%]",
      renderCell: (row: RewardListResponse) => (
        <div>
          <div className="text-slate-700 font-medium">
            {formatDateAndTime(row.createdAt, "DD MMM yyyy")}
          </div>
          <div className="text-[13px] font-medium text-slate-400">
            {formatDateAndTime(row.createdAt, "hh:mm A")}
          </div>
        </div>
      ),
    },
    {
      field: "userName",
      headerName: "Name",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: RewardListResponse) => {
        return <span> {row.userName || "N/A"} </span>;
      },
    },
    {
      field: "sjbtCode",
      headerName: "SJBT-Code",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: RewardListResponse) => {
        return <span> {row?.sjbtCode || "N/A"} </span>;
      },
    },{
      field: "mobileNumber",
      headerName: "Mobile",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: RewardListResponse) => {
        return <span> {row?.mobileNumber || "N/A"} </span>;
      },
    },
    {
      field: "applicationType",
      headerName: "Application",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: RewardListResponse) => {
        return <span> {row.applicationType || "N/A"} </span>;
      },
    },

    {
      field: "points",
      headerName: "Points",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: RewardListResponse) => {
        return (
          <div
            className={`${
              row?.rewardTransactionType === "CREDIT"
                ? "text-green-500"
                : "text-black"
            } ${
              row?.rewardTransactionType === "DEBIT"
                ? "text-red-700"
                : "text-black"
            } text-center flex gap-1 items-center text-[16px] font-medium`}
          >
            <span className="font-bold mb-[1px] ">
              {row?.rewardTransactionType === "CREDIT" ? "+" : "-"} 
            </span>
            {row.points} <img alt='coinimage'  className="w-5 h-5" src="/sjbt-coin.svg"  />
          </div>
        );
      },
    },
    {
      field: "logs",
      headerName: "Remark",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: RewardListResponse) => {
        return <span className="py-2"> {row?.logs || "N/A"} </span>;
      },
    },
    {
      field: "actions",
      extraClasses: "justify-center",
      headerName: "Actions",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: RewardListResponse) => {
        return <ATMMenu options={getActionOptions(row)} />;
      },
    },
  ];
  return (
    <> 
     {(isLoading || isFetching) && (
        <div className="absolute w-[100%] h-[100%] flex justify-center items-center z-10 bg-slate-100 opacity-50">
          <CircularProgress />
        </div>
      )}
      <DistributorTabRewardList
        columns={getColumns(columns, "REWARD_POINTS")}
        rows={items} 
        onAddNew={() => setIsOpenAddForm(true)}
      />
      {isOpenAddFrom && (
        <AddDistributorRewardWrapper
          onClose={() => setIsOpenAddForm(false)}
        />
      )}
      {isOpenEditForm && (
        <EditDistributorRewardWrapper
          RewardId={selectedRefundId}
          onClose={() => setIsOpenEditForm(false)}
        />
      )}
    </>
  );
};

export default DistributorTabRewardListWrapper;
