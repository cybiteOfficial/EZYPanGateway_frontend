import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { ITRCommissionListResponse } from "src/models/ITRCommission.model";
import ITRServiceCommissionListing from "./ITRServiceCommissionListing";
import { useGetServiceCommissionQuery } from "src/services/CommissionService";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/ITRCommissionSlice";
import { AppDispatch, RootState } from "src/redux/store";
import { formatDateAndTime } from "src/utils/dateAndTime";

const paramList = [
  "_id",
  "serviceName",
  "commissionName",
  "updatedById",
  "previousCommissionForDistributor",
  "updatedCommissionForDistributor",
  "minimumApplications",
  "commissionForRetailer",
  "commissionForGuest",
  "isActive",
  "isDeleted",
  "createdAt",
  "updatedAt"
];

const ITRServiceCommissionListingWrapper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const itrCommissionState: any = useSelector(
    (state: RootState) => state.itrCommission
  );
  const { items, rowsPerPage, page, searchValue } = itrCommissionState;

  const { data, isLoading, isFetching } = useGetServiceCommissionQuery({
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
      field: "updatedAt",
      headerName: "Date",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: ITRCommissionListResponse) => (
        <span>{formatDateAndTime(row.updatedAt, "DD MMM yyyy")}</span>
      ),
    },
    {
      field: "updatedCommissionForDistributor",
      headerName: "Commission",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: ITRCommissionListResponse) => (
        <span> {row.updatedCommissionForDistributor} </span>
      ),
    },
  ];

  return (
    <>
      <ITRServiceCommissionListing columns={columns} rows={items} />
    </>
  );
};

export default ITRServiceCommissionListingWrapper;
