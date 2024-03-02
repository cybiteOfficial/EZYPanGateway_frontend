import React, { useEffect, useState } from "react";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { CommissionListResponse } from "src/models/Commission.model";
import { formatDateAndTime } from "src/utils/dateAndTime";
import DistributorTabCommissionList from "./DistributorTabCommissionList";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
  setFilterBy,
} from "src/redux/slices/TabDistributorComissionSlice";
import { AppDispatch, RootState } from "src/redux/store";
import {
  useDeleteCommissionEntryInLedgerMutation,
  useGetledgerCommissionQuery,
} from "src/services/CommissionService";
import { getColumns } from "src/utils/auth/getColumns";
import AddCommissionWrapper from "../component/Add/AddCommissionWrapper";
import EditCommissionWrapper from "../component/Edit/EditCommissionWrapper";
import { RxPencil1 } from "react-icons/rx";
import { MdDeleteOutline } from "react-icons/md";
import { showConfirmationDialog } from "src/utils/showConfirmationDialog";
import { showToast } from "src/utils/toaster/showToast";
import ATMMenu from "src/components/UI/atoms/ATMMenu/ATMMenu";
import { CircularProgress } from "@mui/material";
const paramList = [
  "_id",
  "appliedById",
  "appliedByName",
  "appliedByEmail",
  "appliedByMobileNumber",
  "amount",
  "applicationType",
  "applicationId",
  "commissionFor",
  "commissionTransactionType",
  "logs",
  "isActive",
  "createdAt",
  "updatedAt",
];

const DistributorTabCommissionListWrapper = () => {
  const [isOpenAddFrom, setIsOpenAddForm] = useState(false);
  const [isOpenEditForm, setIsOpenEditForm] = useState(false);
  const [selectedRefundId, setSelectedRefundId] = useState("");
  const [totalCommissionAmount, setTotalCommissionAmount] = useState<any>();

  const dispatch = useDispatch<AppDispatch>();
  const { page, filterBy, rowsPerPage, searchValue, items, dateFilter } =
    useSelector((state: RootState) => state.tabDistributorCommission);
  const { distributorId } = useParams();
  const [deleteCommisionEntry] = useDeleteCommissionEntryInLedgerMutation();

  const { data, isLoading, isFetching } = useGetledgerCommissionQuery({
    limit: rowsPerPage,
    searchValue: searchValue,
    params: paramList,
    page: page,
    filterBy: filterBy,
    dateFilter: dateFilter,
    orderBy: "createdAt",
    orderByValue: -1,
    isPaginationRequired: true,
  });

  React.useEffect(() => {
    if (!isFetching && !isLoading) {
      dispatch(setIsTableLoading(false));
      dispatch(setItems(data?.data || []));
      setTotalCommissionAmount(data);
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
          if (filter.fieldName === "appliedById") {
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
                deleteCommisionEntry(row._id).then((res: any) => {
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
      field: "dateAndTime",
      headerName: "Date - Time",
      flex: "flex-[1_1_0%]",
      renderCell: (row: CommissionListResponse) => (
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
      field: "appliedByName",
      headerName: "Name",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: CommissionListResponse) => {
        return <span> {row.appliedByName || "N/A"} </span>;
      },
    },
    {
      field: "applicationType",
      headerName: "Application",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: CommissionListResponse) => {
        return <span> {row.applicationType || "N/A"} </span>;
      },
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: CommissionListResponse) => {
        switch (row.commissionTransactionType) {
          case "CREDIT":
            return (
              <div className="text-green-500">
                <span className="font-bold">&#x20B9;</span>
                {row.amount}
              </div>
            );

          case "DEBIT":
            return (
              <div className="text-red-500">
                <span className="font-bold">&#x20B9;</span>
                {row.amount}
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
      renderCell: (row: CommissionListResponse) => {
        return <span className="py-2"> {row?.logs || "N/A"} </span>;
      },
    },
    {
      field: "actions",
      extraClasses: "justify-center",
      headerName: "Actions",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: CommissionListResponse) => {
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
      <DistributorTabCommissionList
        columns={getColumns(columns, "COMMISSIONS")}
        rows={items}
        onAddNew={() => setIsOpenAddForm(true)}
        totalCommissionAmount={totalCommissionAmount}
      />
      {isOpenAddFrom && (
        <AddCommissionWrapper onClose={() => setIsOpenAddForm(false)} />
      )}
      {isOpenEditForm && (
        <EditCommissionWrapper
          commissionId={selectedRefundId}
          onClose={() => setIsOpenEditForm(false)}
        />
      )}
    </>
  );
};

export default DistributorTabCommissionListWrapper;
