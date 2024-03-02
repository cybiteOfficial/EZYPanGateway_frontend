import React, { useEffect } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { CommissionListResponse } from "src/models/Commission.model";
import { formatDateAndTime } from "src/utils/dateAndTime";

import RetailerTabCommissionList from "./RetailerTabCommissionList";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/redux/store";
import { useGetledgerCommissionQuery } from "src/services/CommissionService";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
  setFilterBy,
} from "src/redux/slices/TabRetailerComissionSlice";
import { useParams } from "react-router-dom";

const paramList = [
  "_id",
  "appliedById",
  "amount",
  "applicationType",
  "applicationId",
  "commissionFor",
  "commissionTransactionType",
  "logs",
  "isActive",
  "createdAt",
  "updatedAt",
];
const RetailerTabCommissionListWrapper = () => {
  const { retailerId } = useParams();

  const dispatch = useDispatch<AppDispatch>();

  const tabRetailerSlice: any = useSelector(
    (state: RootState) => state.tabRetailerComission
  );
  const { page, rowsPerPage, items, searchValue, filterBy } = tabRetailerSlice;
  const { data, isLoading, isFetching } = useGetledgerCommissionQuery({
    limit: rowsPerPage,
    searchValue: searchValue,
    params: paramList,
    page: page,
    filterBy: filterBy,
    dateFilter: {
      start_date: "",
      end_date: "",
    },
    orderBy: "createdAt",
    orderByValue: -1,
    isPaginationRequired: true,
  });
  // Setting Items
  useEffect(() => {
    if (!isFetching && !isLoading) {
      dispatch(setIsTableLoading(false));
      dispatch(setItems([...items, ...(data?.data || [])]));
      dispatch(setTotalItems(data?.totalItem || 0));
    } else {
      dispatch(setIsTableLoading(true));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isFetching, data]);

  useEffect(() => {
    dispatch(
      setFilterBy(
        filterBy.map((filter: any) => {
          if (filter.fieldName === "userId") {
            return {
              ...filter,
              value: [retailerId || ""],
            };
          } else {
            return filter;
          }
        })
      )
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [retailerId]);
  const columns: columnTypes[] = [
    {
      field: "date_and_time",
      headerName: "Date - Time",
      noAuthRequired: true,
      flex: "flex-[1_1_0%]",
      renderCell: (row: CommissionListResponse) => (
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
      field: "appliedByName",
      headerName: "Name",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: CommissionListResponse) => {
        return <span> {row.appliedByName || "N/A"} </span>;
      },
    },
    {
      field: "applicationType",
      headerName: "Application",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: CommissionListResponse) => {
        return <span> {row.applicationType || "N/A"} </span>;
      },
    },

    {
      field: "amount",
      headerName: "Amount",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: CommissionListResponse) => {
        return (
          <span>
            {" "}
            &#8377;
            {row.applicationType === "CREDIT" ? (
              <div className="text-green-600 font-bold">{row.amount}</div>
            ) : (
              <div className="text-red-700 font-bold">{row.amount}</div>
            )}
          </span>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: "flex-[1_1_0%]",
      renderCell: (row: any) => (
        <button className="text-slate-600 font-bold  transition-all duration-[600ms] hover:bg-slate-100 p-2 rounded-full">
          {" "}
          <HiDotsVertical className="text-xl text-slate-600 font-bold " />{" "}
        </button>
      ),
      align: "start",
    },
  ];

  return (
    <>
      <RetailerTabCommissionList columns={columns} rows={items} />
    </>
  );
};

export default RetailerTabCommissionListWrapper;
