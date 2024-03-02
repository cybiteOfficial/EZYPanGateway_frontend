import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { MSMEListResponse } from "src/models/MSME.model";
import { AppDispatch, RootState } from "src/redux/store";
import TabRetailerApplicationMSMEListing from "./TabRetailerApplicationMSMEListing";
import {
  setFilterBy,
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/TabRetailerMSMEApplicationSlice";
import { useGetMsmeQuery } from "src/services/MSMEService";
import { formatDateAndTime } from "src/utils/dateAndTime";
import { BsCircleFill } from "react-icons/bs";
import { applicationStatus } from "src/utils/history/applicationStatus";
import { getColumns } from "src/utils/auth/getColumns";

// Params List
const paramList = [
  "_id",
  "propritorName",
  "adhaarNumber",
  "firmName",
  "address",
  "srn",
  "email",
  "mobileNumber",
  "photoUrl",
  "adhaarCardPhotoUrl",
  "panCardPhotoUrl",
  "otherDocuments",
  "appliedBy",
  "appliedAs",
  "txnId",
  "payementDetails",
  "appliedFrom",
  "version",
  "status",
  "assignedTo",
  "assignedBy",
  "createdAt",
  "updatedAt",
];

const TabRetailerApplicationMSMEListingWrapper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const msmeState: any = useSelector(
    (state: RootState) => state.tabRetailerMSMEApplication
  );
  const { items, rowsPerPage, searchValue, page, filterBy, dateFilter } =
    msmeState;

  const { state } = useLocation();

  // Setting Distributor Cde
  useEffect(() => {
    dispatch(
      setFilterBy(
        filterBy.map((filter: any) => {
          if (filter.fieldName === "appliedByNumber") {
            return {
              ...filter,
              value: [state.retailer?.mobileNumber],
            };
          } else {
            return filter;
          }
        })
      )
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  // Fetching Applications
  const { data, isFetching, isLoading } = useGetMsmeQuery({
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
      field: "createdAt",
      headerName: "Date - Time",
      noAuthRequired: true,
      flex: "flex-[1_1_0%]",
      renderCell: (row: MSMEListResponse) => (
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
      flex: "flex-[1_1_0%]",
      renderCell: (row: MSMEListResponse) => {
        return (
          <span className="text-primary-main text-[13px] text-ellipsis overflow-hidden">
            {row.srn}
          </span>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      flex: "flex-[1_1_0%]",
      renderCell: (row: MSMEListResponse) => {
        return (
          <span className="text-ellipsis overflow-hidden"> {row.email} </span>
        );
      },
    },
    {
      field: "mobileNumber",
      headerName: "Mobile",
      flex: "flex-[1_1_0%]",
      renderCell: (row: MSMEListResponse) => {
        return <span> {row.mobileNumber} </span>;
      },
    },
    {
      field: "adhaarNumber",
      headerName: "Aadhar Number",
      flex: "flex-[1_1_0%]",
      renderCell: (row: MSMEListResponse) => {
        return <span> {row.adhaarNumber} </span>;
      },
    },
    {
      noAuthRequired: true,
      field: "status",
      headerName: "Status",
      flex: "flex-[1_1_0%]",
      renderCell: (row: MSMEListResponse) => {
        return (
          <span
            className={`font-medium rounded-full flex gap-2 items-center bg-slate-100 px-2 py-1 text-[13px]  ${
              applicationStatus[row.status].className
            }`}
          >
            <BsCircleFill className="text-[10px]" />
            {applicationStatus[row.status].label || "N/A"}{" "}
          </span>
        );
      },
    },
  ];

  return (
    <>
      <TabRetailerApplicationMSMEListing
        columns={getColumns(columns, "MSME_APPLICATIONS")}
        rows={items}
      />
    </>
  );
};

export default TabRetailerApplicationMSMEListingWrapper;
