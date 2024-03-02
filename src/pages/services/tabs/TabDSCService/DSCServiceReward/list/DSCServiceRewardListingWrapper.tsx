import React from "react";
import { useDispatch, useSelector } from 'react-redux';

import DSCServiceRewardListing from './DSCServiceRewardListing'
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { DSCRewardListResponse } from 'src/models/DSCServiceReward.model';
import { useGetDSCRewardServicePaginationQuery } from 'src/services/DSCRewardService';
import { formatDateAndTime } from "src/utils/dateAndTime";
import { RootState } from 'src/redux/store';
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/DSCServiceRewardSlice";

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

const DSCServiceRewardListingWrapper = () => {
  const dispatch = useDispatch();
  const statePagesState: any = useSelector(
    (state: RootState) => state.dscServiceReward
  );
  const { rowsPerPage, searchValue, page, items } = statePagesState;
  const { data, isLoading, isFetching } = useGetDSCRewardServicePaginationQuery(
    {
      limit: rowsPerPage,
      searchValue: searchValue,
      params: paramList,
      page: page,
      filterBy: [
        {
          fieldName: "serviceName",
          value: ["DSC"],
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
      renderCell: (row: DSCRewardListResponse) => (
        <span>{formatDateAndTime(row.updatedAt, "DD MMM yyyy")}</span>
      ),
    },
    {
      field: "updatedRewardForDistributor",
      headerName: "Reward For Distributor",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: DSCRewardListResponse) => (
        <span> {row.updatedRewardForDistributor} </span>
      ),
    },
    {
      field: "updatedRewardForRetailer",
      headerName: "Reward For Retailer",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: DSCRewardListResponse) => (
        <span> {row.updatedRewardForRetailer} </span>
      ),
    },{
      field: "updatedRewardForGuest",
      headerName: "Reward For Guest",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: DSCRewardListResponse) => (
        <span> {row.updatedRewardForGuest} </span>
      ),
    },
  ];

  return (
    <>
      <DSCServiceRewardListing columns={columns} rows={items} />
    </>
  );
};

export default DSCServiceRewardListingWrapper;
