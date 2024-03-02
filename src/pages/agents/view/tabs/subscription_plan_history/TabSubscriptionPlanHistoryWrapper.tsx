import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { DistributorSubscriptionListResponse } from "src/models/Subscription.model";
import {
  setFilterBy,
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/TabDistributorSubscriptionPlanHistorySlice";
import { AppDispatch, RootState } from "src/redux/store";
import { useGetDistributorSubscriptionQuery } from "src/services/DistributorServices";
import TabSubscriptionPlanHistory from "./TabSubscriptionPlanHistory";
import { formatDateAndTime } from "src/utils/dateAndTime";

const paramsList = [
  "_id",
  "sjbtCode",
  "subscriptionId",
  "subscriptionType",
  "subscriptionPlanExpiryDate",
  "subscriptionPayment",
  "isDeleted",
  "isActive",
  "createdAt",
  "updatedAt",
];

const TabSubscriptionPlanHistoryWrapper = () => {
  // Dispatch Hook
  const dispatch = useDispatch<AppDispatch>();
  const tabDistributorSubscriptionPlanHistoryState: any = useSelector(
    (state: RootState) => state.tabDistributorSubscriptionPlanHistory
  );
  const { page, rowsPerPage, items, searchValue, filterBy } =
    tabDistributorSubscriptionPlanHistoryState;
  const { state } = useLocation();

  // Setting Distributor Code
  useEffect(() => {
    dispatch(
      setFilterBy(
        filterBy.map((filter: any) => {
          if (filter.fieldName === "mobileNumber") {
            return {
              ...filter,
              value: [state?.distributor?.mobileNumber],
            };
          } else {
            return filter;
          }
        })
      )
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  // Get Data Query
  const { data, isFetching, isLoading } = useGetDistributorSubscriptionQuery({
    limit: rowsPerPage,
    searchValue: searchValue,
    params: paramsList,
    page: page,
    filterBy: filterBy,
    dateFilter: {
      start_date: "",
      end_date: "",
      dateFilterKey: "",
    },
    orderBy: "createdAt",
    orderByValue: -1,
    isPaginationRequired: true,
  });
  // Setting Retailer data
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
      field: "subscriptionType",
      headerName: "Plan",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: DistributorSubscriptionListResponse) => {
        return <span> {row.subscriptionType || "N/A"} </span>;
      },
    },
    {
      field: "subscriptionTxnDate",
      headerName: "Purchased On",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: DistributorSubscriptionListResponse) => {
        return <span>{formatDateAndTime(row.subscriptionTxnDate, "DD MMM yyyy")}</span>;
      },
    },
    {
      field: "subscriptionPlanExpiryDate",
      headerName: "Valid Till",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: DistributorSubscriptionListResponse) => {
        return (
          <span>
            {row.subscriptionPlanExpiryDate
              ? formatDateAndTime(row.subscriptionPlanExpiryDate, "DD MMM yyyy")
              : "-"}
          </span>
        );
      },
    },
    {
      field: "subcriptionAmount",
      headerName: "Amount",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: DistributorSubscriptionListResponse) => {
        return <span>{row.subcriptionAmount || "N/A"}</span>;
      },
    },
  ];

  return (
    <>
      <TabSubscriptionPlanHistory columns={columns} rows={items} />
    </>
  );
};

export default TabSubscriptionPlanHistoryWrapper;
