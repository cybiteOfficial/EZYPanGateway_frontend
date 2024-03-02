import Tooltip from "@mui/material/Tooltip";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/TabPaymentDetailPanSlice";
import { AppDispatch, RootState } from "src/redux/store";
import { formatDateAndTime } from "src/utils/dateAndTime";
import { getColumns } from "src/utils/auth/getColumns";
import TabFailedPaymentPanApplicationListing from "./TabPaymentDetailPanApplicationListing";
import { useGetPANPaymentDetailQuery } from "src/services/TabFailedPaymentApplicationService";
import { PanPaymentDetailListResponse } from "src/models/PanPaymentDetailResponse.model";

const paramList = [
  "_id",
  "srn",
  "uniqueTransactionId",
  "createdAt",
  "updatedAt"
];

const TabPaymentDetailPanApplicationListingWrapper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const TabFailedPaymentPan: any = useSelector(
    (state: RootState) => state.TabPaymentDetailPanSlice
  );
  const {
    items,
    rowsPerPage,
    searchValue,
    page,
    filterBy,
    isTableLoading,
    dateFilter,
  } = TabFailedPaymentPan;

  const { data, isFetching, isLoading } = useGetPANPaymentDetailQuery({
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

 

  // Table Columns
  const columns: columnTypes[] = [
    {
      field: "createdAt",
      headerName: "Date - Time",
      noAuthRequired: true,
      flex: "flex-[1_1_0%]",
      renderCell: (row: PanPaymentDetailListResponse) => ( 
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
      field: "srn",
      headerName: "SRN",
      flex: "flex-[1.3_1.3_0%]",
      renderCell: (row: PanPaymentDetailListResponse) => {
        return (
          <Tooltip title={row.srn}>
            <span className="text-primary-main text-[13px] text-ellipsis overflow-hidden">
              {row.srn}
            </span>
          </Tooltip>
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      flex: "flex-[1_1_0%]",
      renderCell: (row: PanPaymentDetailListResponse) => (
        <Tooltip title={row.name}>
          <span className="text-ellipsis overflow-hidden"> {row.name} </span>
        </Tooltip>
      ),
    },
    {
      field: "uniqueTransactionId",
      headerName: "Order Id",
      flex: "flex-[1.4_1.4_0%]",
      renderCell: (row: PanPaymentDetailListResponse) => {
        return (
          <Tooltip title={row.uniqueTransactionId}>
            <span className="text-ellipsis overflow-hidden"> {row.uniqueTransactionId} </span>
          </Tooltip>
        );
      },
    },
    {
      field: "mobileNumber",
      headerName: "Mobile",
      flex: "flex-[1_1_0%]",
    },
   
  ];

 

  return (
    <>
      <TabFailedPaymentPanApplicationListing
        columns={getColumns(columns, "PAN_APPLICATIONS")}
        rows={items}
        isTableLoading={isTableLoading}
      />
    </>
  );
};

export default TabPaymentDetailPanApplicationListingWrapper;
