import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { RefundBalanceListResponse } from "src/models/LedgerRefundBalance.model";
import { formatDateAndTime } from "src/utils/dateAndTime";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
  setFilterBy,
} from "src/redux/slices/TabRetailerRefundBalanceSlice";
import { AppDispatch, RootState } from "src/redux/store";
import RetailerTabRefundBalanceList from "./RetailerTabRefundBalanceList";
import { useParams } from "react-router-dom";
import { useDeleteRefundEntryInLedgerMutation, useGetRefundBalanceListQuery  } from "src/services/RefundBalanceService";
import ATMMenu from "src/components/UI/atoms/ATMMenu/ATMMenu";
import { MdDeleteOutline } from "react-icons/md";
import { RxPencil1 } from "react-icons/rx";
import { showConfirmationDialog } from "src/utils/showConfirmationDialog";
import { showToast } from "src/utils/toaster/showToast";
import AddRetailerRefundBalanceWrapper from "../component/Add/AddRetailerRefundBalanceWrapper";
import EditRetalierRefundBalanceWrapper from "../component/Edit/EditRetalierRefundBalanceWrapper";
import { CircularProgress } from "@mui/material";

const paramList = [
  "_id",
  "walletType",
  "walletAmount",
  "walletId",
  "userId",
  "applicationType",
  "applicationId",
  "transactionType",
  "debitedAmount",
  "creditedAmount",
  "createdByType",
  "createdById",
  "paymentStatus",
  "dateAndTime",
  "remark",
  "userName",
  "email",
  "mobileNumber",
  "uuid",
  "createdAt",
  "updatedAt",
];

const RetailerTabRefundBalanceListWrapper = () => {
  const [isOpenAddFrom, setIsOpenAddForm] = useState(false);
  const [isOpenEditForm, setIsOpenEditForm] = useState(false);
  const [selectedRefundId, setSelectedRefundId] = useState("");

  const userType = JSON.parse(localStorage.getItem("userData") || "{}");


  const dispatch = useDispatch<AppDispatch>();
  const { page, rowsPerPage, searchValue, filterBy, items } = useSelector(
    (state: RootState) => state.tabRetailerRefundBalance
  );
  const { retailerId } = useParams(); 
  const [deleteRefundEntry] = useDeleteRefundEntryInLedgerMutation();

  const { data, isLoading, isFetching } = useGetRefundBalanceListQuery({
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
        filterBy.map((filter) => {
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
                deleteRefundEntry(row._id).then((res: any) => {
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
      field: "dateAndTime",
      headerName: "Date - Time",
      noAuthRequired: true,
      flex: "flex-[1_1_0%]",
      renderCell: (row: RefundBalanceListResponse) => (
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
      renderCell: (row: RefundBalanceListResponse) => {
        return <span> {row.userName || "N/A"} </span>;
      },
    },
    {
      field: "applicationType",
      headerName: "Application",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: RefundBalanceListResponse) => {
        return <span> {row.applicationType || "N/A"} </span>;
      },
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: RefundBalanceListResponse) => {
        switch (row.transactionType) {
          case "CREDIT":
            return (
              <div className="text-green-500">
                <span className="font-bold">&#x20B9;</span>
                {row.creditedAmount}
              </div>
            );

          case "DEBIT":
            return (
              <div className="text-red-500">
                <span className="font-bold">&#x20B9;</span>
                {row.debitedAmount}
              </div>
            );

          default:
            break;
        }
      },
    },
    {
      field: "remark",
      headerName: "Remark",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: RefundBalanceListResponse) => {
        return <span> {row.remark || "N/A"} </span>;
      },
    }, 
    {
      field: "actions",
      extraClasses: "justify-center",
      headerName: "Actions",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: RefundBalanceListResponse) => {
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
      <RetailerTabRefundBalanceList columns={columns} rows={items}  onAddNew={() => setIsOpenAddForm(true)} /> 
      {isOpenAddFrom && (
        <AddRetailerRefundBalanceWrapper
          onClose={() => setIsOpenAddForm(false)}
        />
      )}
      {isOpenEditForm && (
        <EditRetalierRefundBalanceWrapper
          RefundId={selectedRefundId}
          onClose={() => setIsOpenEditForm(false)}
        />
      )}
    </>
  );
};

export default RetailerTabRefundBalanceListWrapper;
