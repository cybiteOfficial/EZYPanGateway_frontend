import React from "react";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { formatDateAndTime } from "src/utils/dateAndTime";
import ITRServiceRewardListing from "./ITRServiceRewardListing";

import {
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/ITRServiceRewardSlice";
import { ITRRewardListResponse } from "src/models/ITRServiceReward.model";
import { useGetITRRewardServicePaginationQuery } from "src/services/ITRRewardService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/redux/store";
const paramList = [
  "_id",
  "serviceName",
  "updatedById",
  "previousRewardForDistributor",
  "previousRewardForRetailer",
  "previousRewardForGuest",
  "updatedRewardForDistributor",
  "updatedRewardForRetailer",
  "updatedRewardForGuest",
  "isDeleted",
  "isActive",
  "createdAt",
  "updatedAt",
];

const ITRServiceRewardListingWrapper = () => {
  const dispatch = useDispatch();
  const statePagesState: any = useSelector(
    (state: RootState) => state.itrServiceReward
  );
  const { rowsPerPage, searchValue, page, items } = statePagesState;
  const { data, isLoading, isFetching } = useGetITRRewardServicePaginationQuery(
    {
      limit: rowsPerPage,
      searchValue: searchValue,
      params: paramList,
      page: page,
      filterBy: [
        {
          fieldName: "serviceName",
          value: ["ITR"],
        },
      ],
      dateFilter: {
        start_date: "",
        end_date: "",
        dateFilterKey: "",
      },
      orderBy: "createdAt",
      orderByValue: -1,
      isPaginationRequired: true,
    }
  );
  // Setting Data in slice
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
      field: "updatedOnDate",
      headerName: "Date",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: ITRRewardListResponse) => (
        <span>{formatDateAndTime(row.updatedAt, "DD MMM yyyy")}</span>
      ),
    },
    {
      field: "updatedRewardForDistributor",
      headerName: "Reward For Distributor",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: ITRRewardListResponse) => (
        <span> {row.updatedRewardForDistributor} </span>
      ),
    },
    {
      field: "updatedRewardForRetailer",
      headerName: "Reward For Retailer",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: ITRRewardListResponse) => (
        <span> {row.updatedRewardForRetailer} </span>
      ),
    },
    {
      field: "updatedRewardForGuest",
      headerName: "Reward For Guest",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: ITRRewardListResponse) => (
        <span> {row.updatedRewardForGuest} </span>
      ),
    },
  ];

 
  return (
    <>
      <ITRServiceRewardListing columns={columns} rows={items} />
    </>
  );
};

export default ITRServiceRewardListingWrapper;
