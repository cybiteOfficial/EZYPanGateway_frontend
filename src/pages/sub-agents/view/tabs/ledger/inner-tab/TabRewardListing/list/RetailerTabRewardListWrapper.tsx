import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { RewardListResponse } from "src/models/Reward.model";
import { formatDateAndTime } from "src/utils/dateAndTime";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
  setFilterBy,
} from "src/redux/slices/TabRetailerRewardSlice";
import { AppDispatch, RootState } from "src/redux/store";
import RetailerTabRewardList from "./RetailerTabRewardList";
import { useParams } from "react-router-dom";
import { useDeleteRewardEntryInLedgerMutation, useGetRewardListQuery } from "src/services/RewardService";
import AddRetailerRewardWrapper from "../component/Add/AddRetailerRewardWrapper";
import EditRetailerRewardWrapper from "../component/Edit/EditRetailerRewardWrapper";
import { RxPencil1 } from "react-icons/rx";
import { MdDeleteOutline } from "react-icons/md";
import { showConfirmationDialog } from "src/utils/showConfirmationDialog";
import ATMMenu from "src/components/UI/atoms/ATMMenu/ATMMenu";
import { showToast } from "src/utils/toaster/showToast";
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

const RetailerTabRewardListWrapper = () => {
  const dispatch = useDispatch<AppDispatch>(); 
 
  const userType = JSON.parse(localStorage.getItem("userData") || "{}");

  const [isOpenAddFrom, setIsOpenAddForm] = useState(false);
  const [isOpenEditForm, setIsOpenEditForm] = useState(false);
  const [selectedRefundId, setSelectedRefundId] = useState("");

  const [deleteReward] = useDeleteRewardEntryInLedgerMutation()
  const { page, rowsPerPage, searchValue, filterBy, items } = useSelector(
    (state: RootState) => state.tabRetailerReward
  );
  const { retailerId } = useParams();

  const { data, isLoading, isFetching } = useGetRewardListQuery({
    limit: rowsPerPage,
    searchValue: searchValue,
    params: paramList,
    page: page,
    filterBy: filterBy,
    dateFilter: {
      start_date: "",
      end_date: "",
    },
    orderBy: "createdAt",
    orderByValue: -1,
    isPaginationRequired: true,
  });

  // Setting Items
  useEffect(() => {
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
        filterBy.map((filter:any) => {
          if (filter.fieldName === "userId") {
            return {
              ...filter,
              value: [retailerId || ""],
            };
          } else {
            return filter;
          }
        })
      )
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [retailerId]);

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
      field: "date_and_time",
      headerName: "Date - Time",
      noAuthRequired: true,
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
      field: "applicationType",
      extraClasses:'py-2',
      headerName: "Application",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: RewardListResponse) => {
        return <span> {row.applicationType || "N/A"} </span>;
      },
    },
    {
      field: "points",
      headerName: "Points",
      extraClasses:'py-3',
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: RewardListResponse) => {
        switch (row.rewardTransactionType) {
          case "CREDIT":
            return (
              <div className="text-green-500 font-medium flex gap-1">
                + {row.points} <img alt='coinimage'  className="w-5 h-5" src="/sjbt-coin.svg"  />
              </div>
            );

          case "DEBIT":
            return (
              <div className="text-red-500  font-medium flex gap-1">
                - {row.points} <img alt='coinimage'  className="w-5 h-5" src="/sjbt-coin.svg"  />
              </div>
            );

          default:
            break;
        }
      },
    },
    {
      field: "logs",
      headerName: "Remark",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: RewardListResponse) => {
        return <span> {row.logs || "N/A"} </span>;
      },
    }, 

    { 
      field: "actions",
      extraClasses: "justify-center",
      headerName: "Actions",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: RewardListResponse) => {
        return userType?.type ==='SUPER_ADMIN' && <ATMMenu options={getActionOptions(row)} />;
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
      <RetailerTabRewardList columns={columns} rows={items}  onAddNew={() => setIsOpenAddForm(true)} />
      {isOpenAddFrom && (
        <AddRetailerRewardWrapper
          onClose={() => setIsOpenAddForm(false)}
        />
      )}
      {isOpenEditForm && (
        <EditRetailerRewardWrapper
          RewardId={selectedRefundId}
          onClose={() => setIsOpenEditForm(false)}
        />
      )}
    </>
  );
};

export default RetailerTabRewardListWrapper;
