import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { PanCommissionListResponse } from "src/models/PANCommission.model";
import PanServiceCommissionListing from "./PANServiceComissionListing";
import {  useGetServiceCommissionQuery } from "src/services/CommissionService";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/PANCommissionSlice";
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

const PanServiceCommissionListingWrapper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const panCommissionState: any = useSelector(
    (state: RootState) => state.panCommission
  );
  const { items, rowsPerPage, page, searchValue } = panCommissionState;

  const { data, isLoading, isFetching } = useGetServiceCommissionQuery({
    limit: rowsPerPage,
    searchValue: searchValue,
    params: paramList,
    page: page,
    filterBy: [
      {
        fieldName: "serviceName",
        value: ["PAN"],
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
      renderCell: (row: PanCommissionListResponse) => (
        <span>{formatDateAndTime(row.updatedAt, "DD MMM yyyy")}</span>
      ),
    },
    {
      field: "CategoryType",
      headerName: "Category-Type",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: PanCommissionListResponse) => (
        <span> {row.categoryType === 'BASIC_SERVICE' ? 'Without-Category' :  row.categoryType} </span>
      ),
    },
    {
      field: "Minimum_Application",
      headerName: "Minimum-Application",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: PanCommissionListResponse) => (
        <span> {row.categoryType === 'BASIC_SERVICE' ? 'N/A' : row.minimumApplications} </span>
      ),
    },
    {
      field: "updatedCommissionForDistributor",
      headerName: "Commission",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: PanCommissionListResponse) => (
        <span> {row.updatedCommissionForDistributor} </span>
      ),
    },
  ];

  return (
    <>
      <PanServiceCommissionListing columns={columns} rows={items} />
    </>
  );
};

export default PanServiceCommissionListingWrapper;
