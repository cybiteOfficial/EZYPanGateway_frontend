import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { PANListResponse } from "src/models/PAN.model";
import {
  resetState,
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/PANApplication/PANDoneApplicationSlice";
import { AppDispatch, RootState } from "src/redux/store";
import { useGetPanDoneApplicationsQuery } from "src/services/PANService";
import { formatDateAndTime } from "src/utils/dateAndTime";
import PANDoneApplicationListing from "./PANDoneApplicationListing";
import { getColumns } from "src/utils/auth/getColumns";

const paramList = [
  "category",
  "name",
  "email",
  "dob",
  "adhaarNumber",
  "mobileNumber",
  "passportPhotoUrl",
  "signaturePhotoUrl",
  "panFormFrontPhotoUrl",
  "panFormBackPhotoUrl",
  "adhaarFrontPhotoUrl",
  "adhaarBackPhotoUrl",
  "otherDocuments",
  "comment",
  "distributorCode",
  "appliedBy",
  "appliedAs",
  "txnId",
  "payementDetails",
  "appliedFrom",
  "paymentCategory",
  "version",
  "panNumber",
  "acknowledgementNumber",
  "status",
  "assignedTo",
  "assignedBy",
];

const PANDoneApplicationListingWrapper = () => {
  // Dispatch Hook
  const dispatch = useDispatch<AppDispatch>();
  // Slice
  const PANDoneApplicationState: any = useSelector(
    (state: RootState) => state.PANDoneApplication
  );
  const { items, searchValue, rowsPerPage, page, filterBy, dateFilter , orderByValue } =
    PANDoneApplicationState;

  React.useEffect(() => {
    dispatch(resetState());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Get Data Query
  const { data, isFetching, isLoading } = useGetPanDoneApplicationsQuery({
    limit: rowsPerPage,
    searchValue: searchValue,
    params: paramList,
    page: page,
    filterBy: filterBy,
    dateFilter: dateFilter,
    orderBy: "appliedOnDate",
    orderByValue: orderByValue,
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
      field: "appliedOnDate",
      headerName: "Date - Time",
      noAuthRequired: true,
      flex: "flex-[1_1_0%]",
      renderCell: (row: PANListResponse) => (
        <div>
          <div className="text-slate-700 font-medium">
            {formatDateAndTime(row?.appliedOnDate, "DD MMM yyyy")}
          </div>
          <div className="text-[13px] font-medium text-slate-400">
            {formatDateAndTime(row?.appliedOnDate, "hh:mm A")}
          </div>
        </div>
      ),
    },
    {
      field: "srn",
      headerName: "SRN",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: PANListResponse) => {
        return (
          <span className="text-primary-main text-[13px] text-ellipsis overflow-hidden">
            {" "}
            {row.srn}{" "}
          </span>
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      flex: "flex-[1_1_0%]",
      renderCell: (row: PANListResponse) => (
        <span className="text-ellipsis overflow-hidden"> {row.name} </span>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: PANListResponse) => {
        return (
          <span className="text-ellipsis overflow-hidden">
            {" "}
            {row.email || "N/A"}{" "}
          </span>
        );
      },
    },
    {
      field: "mobileNumber",
      headerName: "Mobile",
      flex: "flex-[1_1_0%]",
    },
    {
      noAuthRequired: true,
      field: "distributorCode",
      headerName: "SJBT  Code",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: PANListResponse) => {
        return <span> {row.distributorCode || "N/A"} </span>;
      },
    },
    {
      noAuthRequired: true,
      field: "assignedTo",
      headerName: "Assignee",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: PANListResponse) => {
        return (
          <div className="text-primary-main py-[10px] ">
            {row.assignedToName || "Not Assigned"}
          </div>
        );
      },
    },
    {
      field: "appliedByNumber",
      headerName: "Applied By (Mob. No.)",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: PANListResponse) => {
        return <span> {row.appliedByNumber || "N/A"} </span>;
      },
    },
  ];

  return (
    <>
      <PANDoneApplicationListing
        columns={getColumns(columns, "PAN_APPLICATIONS")}
        rows={items}
      />
    </>
  );
};

export default PANDoneApplicationListingWrapper;
