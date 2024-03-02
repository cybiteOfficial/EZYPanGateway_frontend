import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/TabPaymentDetailITRSlice";
import { AppDispatch, RootState } from "src/redux/store";
import { formatDateAndTime } from "src/utils/dateAndTime";
import { getColumns } from "src/utils/auth/getColumns";
import { useGetITRPaymentDetailQuery } from "src/services/TabFailedPaymentApplicationService";
import { ITRPaymentDetailListResponse } from "src/models/ITRPaymentDetailResponse.model";
import TabPaymentDetailITRApplicationListing from "./TabPaymentDetailITRApplicationListing";

// Params
const paramList = [
  "_id",
  "srn",
  "uniqueTransactionId",
  "createdAt",
  "updatedAt"
];

const TabPaymentDetailITRApplicationListingWrapper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const itrState:any = useSelector(
    (state: RootState) => state.TabPaymentDetailITRSlice
  );
  const {
    items,
    rowsPerPage,
    searchValue,
    page,
    isTableLoading,
    filterBy,
    dateFilter,
  } = itrState;

  const { data, isFetching, isLoading } = useGetITRPaymentDetailQuery({
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
  // Table Columns
  const columns: columnTypes[] = [
    {
      field: "createdAt",
      headerName: "Date - Time",
      noAuthRequired: true,
      flex: "flex-[1_1_0%]",
      renderCell: (row: ITRPaymentDetailListResponse) => (
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
      renderCell: (row: ITRPaymentDetailListResponse) => (
        <span className="text-primary-main text-[13px] text-ellipsis overflow-hidden">
          {row.srn}
        </span>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      flex: "flex-[1_1_0%]",
      renderCell: (row: ITRPaymentDetailListResponse) => (
        <span> {`${row.firstName} ${row.middleName} ${row.lastName}`} </span>
      ),
    },
   
    {
      field: "uniqueTransactionId",
      headerName: "Order Id",
      flex: "flex-[1.4_1.4_0%]",
      renderCell: (row:ITRPaymentDetailListResponse ) => {
        return   <span className="text-ellipsis overflow-hidden"> {row.uniqueTransactionId} </span>
           
        ;
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
      <TabPaymentDetailITRApplicationListing
        columns={getColumns(columns, "ITR_APPLICATIONS")}
        rows={items}
        isTableLoading={isTableLoading}
       
      />
    </>
  );
};

export default TabPaymentDetailITRApplicationListingWrapper;
