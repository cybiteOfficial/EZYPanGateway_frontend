import React, { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import { MdCancel, MdOutlineDownloadDone } from "react-icons/md";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { RefundRequestListResponse } from "src/models/RefundRequest.model";
import { formatDateAndTime } from "src/utils/dateAndTime";
import RefundRequestListing from "./RefundRequestListing";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/redux/store";
import { useGetRefundRequestListQuery } from "src/services/RefundRequestService";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/RefundRequestSlice";
import CompleteDialogBoxWrapper from "./DialogBox/ConfirmDialogBox/CompleteDialogBoxWrapper";
import RejectDialogBoxWrapper from "./DialogBox/RejectDialogBox/RejectDialogBoxWrapper";
import { getColumns } from "src/utils/auth/getColumns";
import AuthHOC from "src/userAccess/AuthHOC";
import { AccessAction } from "src/utils/Enums/AccessAction";

const paramList = [
  "_id",
  "accountHolderName",
  "refundedAmount",
  "accountNumber",
  "ifscCode",
  "bankName",
  "isDeleted",
  "isActive",
  "createdAt",
  "updatedAt",
];

const RefundRequestListingWrapper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const refundRequestState: any = useSelector(
    (state: RootState) => state.refundRequest
  );
  const [isOpenCompleteDialog, setIsOpenCompleteDialog] = useState(false);
  const [isOpenRejectDialog, setIsOpenRejectDialog] = useState(false);

  const [refundRequestId, setRefundRequestId] = useState("");
  const { items, rowsPerPage, searchValue, page, filterBy, dateFilter } =
    refundRequestState;

  const { data, isFetching, isLoading } = useGetRefundRequestListQuery({
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

  // Setting data
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

  const columns: columnTypes[] = [
    {
      noAuthRequired: true,
      field: "createdAt",
      headerName: "Date - Time",
      flex: "flex-[1_1_0%]",
      renderCell: (row: RefundRequestListResponse) => (
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
      flex: "flex-[1_1_0%]",
      renderCell: (row: RefundRequestListResponse) => (
        <Tooltip title={row.userName}>
          <span className="overflow-hidden text-ellipsis">{row.userName}</span>
        </Tooltip>
      ),
    },
    {
      field: "Payable Amount",
      headerName: "PayableAmount",
      flex: "flex-[1_1_0%]",
      renderCell: (row: RefundRequestListResponse) => {
        return <span className="text-red-700 font-semibold" > &#8377; {row.refundRecieveAmt} </span>;
      },
    },
    {
      field: "refundedAmount",
      headerName: "RefundAmount",
      flex: "flex-[1_1_0%]",
      renderCell: (row: RefundRequestListResponse) => {
        return <span> &#8377; {row.refundedAmount} </span>;
      },
    },
    {
      field: "refundRequestAmount",
      headerName: "RequestAmount",
      flex: "flex-[1_1_0%]",
      renderCell: (row: RefundRequestListResponse) => {
        return <span> &#8377; {row.refundRequestedAmount} </span>;
      },
    },
    {
      field: "bankName",
      headerName: "Bank Name",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: RefundRequestListResponse) => {
        return (
          <Tooltip title={row.bankName}>
            <span className="overflow-hidden text-ellipsis">
              {row.bankName}
            </span>
          </Tooltip>
        );
      },
    },
    {
      field: "accountHolderName",
      headerName: "A/C Holder Name",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: RefundRequestListResponse) => (
        <Tooltip title={row.accountHolderName}>
          <span className="overflow-hidden text-ellipsis">
            {row.accountHolderName}
          </span>
        </Tooltip>
      ),
    },
    {
      field: "accountNumber",
      headerName: "A/C No.",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: RefundRequestListResponse) => {
        return (
          <Tooltip title={row.accountNumber}>
            <span className="overflow-hidden text-ellipsis">
              {row.accountNumber}
            </span>
          </Tooltip>
        );
      },
    },
    {
      field: "ifscCode",
      headerName: "IFSC Code",
      flex: "flex-[1_1_0%]",
      renderCell: (row: RefundRequestListResponse) => {
        return <span> {row.ifscCode} </span>;
      },
    },
    {
      noAuthRequired: true,
      field: "actions",
      headerName: "Actions",
      flex: "flex-[2_2_0%]",
      renderCell: (row: any) => {
        if (row.status === "PENDING") {
          // if status is empty, show the buttons
          return (
            <div className="py-1 inline-flex gap-4">
              <AuthHOC moduleName="REFUND_REQUESTS" action={AccessAction.CHANGE_APP_STATUS} >
                <ATMLoadingButton
                  onClick={() => {
                    setIsOpenRejectDialog(true);
                    setRefundRequestId(row._id);
                  }}
                  className="bg-red-500 hover:bg-red-600 py-1 flex gap-1"
                >
                  <div className="flex gap-1 items-center text-[12px]">
                    <MdCancel className="text-[14px]" /> Reject
                  </div>
                </ATMLoadingButton>
              </AuthHOC>
              <AuthHOC moduleName="REFUND_REQUESTS" action={AccessAction.CHANGE_APP_STATUS} alt= "-">
              <ATMLoadingButton
                onClick={() => {
                  setIsOpenCompleteDialog(true);
                  setRefundRequestId(row._id);
                }}
                className="bg-green-500 hover:bg-green-600 py-1 flex gap-1"
              >
                <div className="flex gap-1 items-center text-[12px]">
                  <MdOutlineDownloadDone className="text-[14px]" /> Complete
                </div>
              </ATMLoadingButton>
              </AuthHOC>
            </div>
          );
        } else {
          const statusColor =
            row.status === "COMPLETE" ? "text-green-500" : "text-red-500";
          return (
            <div className="py-1">
              <span
                className={`px-2 py-1 font-medium rounded text-xs ${statusColor}`}
              >
                {row.status}
              </span>
            </div>
          );
        }
      },
      align: "center",
    },
  ];

  return (
    <>
      <SideNavLayout>
        <RefundRequestListing
          columns={getColumns(columns, "REFUND_REQUESTS")}
          rows={items}
        />
      </SideNavLayout>

      {isOpenCompleteDialog && (
        <CompleteDialogBoxWrapper
          onClose={() => setIsOpenCompleteDialog(false)}
          refundRequestId={refundRequestId}
        />
      )}
      {isOpenRejectDialog && (
        <RejectDialogBoxWrapper
          onClose={() => setIsOpenRejectDialog(false)}
          refundRequestId={refundRequestId}
        />
      )}
    </>
  );
};

export default RefundRequestListingWrapper;
