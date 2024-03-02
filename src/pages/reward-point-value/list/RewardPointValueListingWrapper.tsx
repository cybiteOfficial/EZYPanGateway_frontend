import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { RewardPointValueListResponse } from "src/models/RewardPointValue.model";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/RewardPointValueSlice";
import { AppDispatch, RootState } from "src/redux/store";
import { useGetRewardPointValueQuery } from "src/services/RewardPointValueService";
import { formatDateAndTime } from "src/utils/dateAndTime";
import RewardPointValueListing from "./RewardPointValueListing";
import { getColumns } from "src/utils/auth/getColumns";
const paramList = [
  "_id",
  "previousRewardValue",
  "updatedRewardValue",
  "updatedById",
  "updatedByType",
  "updatedOnDate",
  "remark",
  "isDeleted",
  "isActive",
  "createdAt",
  "updatedAt",
];

const RewardPointValueListingWrapper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const rewardPointValueState: any = useSelector(
    (state: RootState) => state.rewardPointValue
  );
  const { items, rowsPerPage, page, searchValue } = rewardPointValueState;

  const { data, isLoading, isFetching } = useGetRewardPointValueQuery({
    limit: rowsPerPage,
    searchValue: searchValue,
    params: paramList,
    page: page,
    filterBy: [
      {
        fieldName: "",
        value: [],
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
  });
  // Setting Items
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
      renderCell: (row: RewardPointValueListResponse) => (
        <span>{formatDateAndTime(row.updatedOnDate, "DD MMM yyyy")}</span>
      ),
    },
    {
      field: "updatedRewardValue",
      headerName: "Reward Point Value",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: RewardPointValueListResponse) => (
        <span> {row.updatedRewardValue} </span>
      ),
    },
  ];

  return (
    <>
      <RewardPointValueListing
        columns={getColumns(columns, "REWARD_POINTS")}
        rows={items}
      />
    </>
  );
};

export default RewardPointValueListingWrapper;
