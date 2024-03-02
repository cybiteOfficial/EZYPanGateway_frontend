import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { ITRListResponse } from "src/models/ITR.model";
import {
  resetState,
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/ITRApplication/ITRDoneApplicationSlice";
import { AppDispatch, RootState } from "src/redux/store";
import { useGetItrDoneApplicationsQuery } from "src/services/ITRApplicationServices";
import { formatDateAndTime } from "src/utils/dateAndTime";
import ITRDoneApplicationListing from "./ITRDoneApplicationListing";
import { getColumns } from "src/utils/auth/getColumns";

const paramList = [
  "_id",
  "firstName",
  "middleName",
  "lastName",
  "adhaarNumber",
  "assesmentYear",
  "incomeSource",
  "fillingType",
  "mobileNumber",
  "emailId",
  "adhaarFrontPhotoUrl",
  "adhaarBackPhotoUrl",
  "panCardPhotoUrl",
  "banPassbookPhotoUrl",
  "otherDocuments",
  "distributorCode",
  "txnId",
  "srn",
  "paymentCategory",
  "appliedFrom",
  "version",
  "acknowledgementNumber",
  "status",
  "appliedByNumber",
  "createdAt",
  "updatedAt",
];

const ITRDoneApplicationListingWrapper = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Slice
  const ITRDoneApplicationState: any = useSelector(
    (state: RootState) => state.ITRDoneApplication
  );
  const { items, searchValue, rowsPerPage, page, filterBy, dateFilter } =
    ITRDoneApplicationState;

  React.useEffect(() => {
    dispatch(resetState());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Get Data Query
  const { data, isFetching, isLoading } = useGetItrDoneApplicationsQuery({
    limit: rowsPerPage,
    searchValue: searchValue,
    params: paramList,
    page: page,
    filterBy: filterBy,
    dateFilter: dateFilter,
    orderBy: "appliedOnDate",
    orderByValue: 1,
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
      renderCell: (row: ITRListResponse) => (
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
      renderCell: (row: ITRListResponse) => {
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
      renderCell: (row: ITRListResponse) => (
        <span className="text-ellipsis overflow-hidden">
          {" "}
          {`${row.firstName} ${row.middleName} ${row.lastName}`}{" "}
        </span>
      ),
    },
    {
      field: "emailId",
      headerName: "Email",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: ITRListResponse) => {
        return (
          <span className="text-ellipsis overflow-hidden"> {row.emailId} </span>
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
      renderCell: (row: ITRListResponse) => {
        return <span> {row.distributorCode || "N/A"} </span>;
      },
    },
    {
      noAuthRequired: true,
      field: "assignedTo",
      headerName: "Assignee",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: ITRListResponse) => {
        return (
          <button type="button" className="text-primary-main py-[10px]">
            {row.assignedToName || "Not Assigned"}
          </button>
        );
      },
    },

    {
      field: "appliedByNumber",
      headerName: "Applied By (Mob. No.)",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: ITRListResponse) => {
        return <span> {row.appliedByNumber || "N/A"} </span>;
      },
    },
    {
      field: "totalPrice",
      headerName: "Amount",
      flex: "flex-[1_1_0%]",
      renderCell: (row: ITRListResponse) => (
        <span>{row?.applicationIndividualPrice || "N/A"}</span>
      ),
    },
  ];

  return (
    <>
      <ITRDoneApplicationListing
        columns={getColumns(columns, "ITR_APPLICATIONS")}
        rows={items}
      />
    </>
  );
};

export default ITRDoneApplicationListingWrapper;
