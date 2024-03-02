import React from 'react'
import GumastaServiceRewardListing from './GumastaServiceRewardListing'

import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { formatDateAndTime } from "src/utils/dateAndTime";
import { GumastaRewardListResponse } from 'src/models/GumastaServiceReward.model';
import { useGetGumastaRewardServicePaginationQuery } from 'src/services/GumastaRewardService';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/GumastaServiceRewardSlice";
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

const GumastaServiceRewardListingWrapper = () => {
   const dispatch = useDispatch();
  const statePagesState: any = useSelector(
    (state: RootState) => state.GumastaServiceReward
  );
  const { rowsPerPage, searchValue, page, items } = statePagesState;
  const { data, isLoading, isFetching } = useGetGumastaRewardServicePaginationQuery(
    {
      limit: rowsPerPage,
      searchValue: searchValue,
      params: paramList,
      page: page,
      filterBy: [
        {
          fieldName: "serviceName",
          value: ["GUMASTA"],
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
      renderCell: (row: GumastaRewardListResponse) => (
        <span>{formatDateAndTime(row.updatedAt, "DD MMM yyyy")}</span>
      ),
    },
    {
      field: "updatedRewardForDistributor",
      headerName: "Reward For Distributor",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: GumastaRewardListResponse) => (
        <span> {row.updatedRewardForDistributor} </span>
      ),
    },
    {
      field: "updatedRewardForRetailer",
      headerName: "Reward For Retailer",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: GumastaRewardListResponse) => (
        <span> {row.updatedRewardForRetailer} </span>
      ),
    },
    {
      field: "updatedRewardForGuest",
      headerName: "Reward For Guest",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: GumastaRewardListResponse) => (
        <span> {row.updatedRewardForGuest} </span>
      ),
    },
  ];

  return (
    <>
      <GumastaServiceRewardListing columns={columns} rows={items} />
    </>
  );
};

export default GumastaServiceRewardListingWrapper;
