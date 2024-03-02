import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { GumastaCommissionListResponse } from "src/models/GumastaCommission.model";
import GumastaServiceCommissionListing from "./GumastaServiceCommissionListing";
import { useGetServiceCommissionQuery } from "src/services/CommissionService";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/GumastaCommissionSlice";
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

const GumastaServiceCommissionListingWrapper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const gumastaCommissionState: any = useSelector(
    (state: RootState) => state.gumastaCommission
  );
  const { items, rowsPerPage, page, searchValue } = gumastaCommissionState;

  const { data, isLoading, isFetching } = useGetServiceCommissionQuery({
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
      renderCell: (row: GumastaCommissionListResponse) => (
        <span>{formatDateAndTime(row.updatedAt, "DD MMM yyyy")}</span>
      ),
    },
    {
      field: "updatedCommissionForDistributor",
      headerName: "Commission",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: GumastaCommissionListResponse) => (
        <span> {row.updatedCommissionForDistributor} </span>
      ),
    },
  ];

  return (
    <>
      <GumastaServiceCommissionListing columns={columns} rows={items} />
    </>
  );
};

export default GumastaServiceCommissionListingWrapper;
