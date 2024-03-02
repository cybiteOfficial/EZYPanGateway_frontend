import React from "react";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { GumastaListResponse } from "src/models/Gumasta.model";
import GumastaVerifiedApplicationListing from "./GumastaVerifiedApplicationListing";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/redux/store";
import {
  useGetGumastaVerifiedApplicationsQuery,
} from "src/services/GumastaService";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/GumastaApplication/GumastaVerifiedApplicationSlice";
import { formatDateAndTime } from "src/utils/dateAndTime";
import { getColumns } from "src/utils/auth/getColumns";


const paramList = [
  "_id",
  "propritorName",
  "adhaarNumber",
  "mobileNumber",
  "email",
  "adhaarPhotoUrl",
  "firmName",
  "firmAddress",
  "propritorPhotoUrl",
  "shopOfficePhotoUrl",
  "addressProofPhotoUrl",
  "otherDocuments",
  "state",
  "district",
  "distributorCode",
  "appliedBy",
  "appliedAs",
  "txnId",
  "payementDetails",
  "srn",
  "appliedFrom",
  "version",
  "acknowledgementNumber",
  "status",
  "assignedTo",
  "assignedBy",
  "createdAt",
  "updatedAt",
];

const GumastaVerifiedApplicationListingWrapper = () => {
  const dispatch = useDispatch<AppDispatch>();
  // Slice
  const GumastaVerifiedApplicationState: any = useSelector(
    (state: RootState) => state.GumastaVerifiedApplication
  );
  const { page, rowsPerPage, items, searchValue, filterBy } =
    GumastaVerifiedApplicationState;
  // Get Data Query
  const { data, isFetching, isLoading } =
    useGetGumastaVerifiedApplicationsQuery({
      limit: rowsPerPage,
      searchValue: searchValue,
      params: paramList,
      page: page,
      filterBy: filterBy,
      dateFilter: {
        start_date: "",
        end_date: "",
        dateFilterKey: "",
      },
      orderBy: "appliedOnDate",
      orderByValue: 1,
      isPaginationRequired: true,
    });

  // Setting Retailer data
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
      renderCell: (row: GumastaListResponse) => (
        <div>
          <div className="text-slate-700 font-medium">
            {formatDateAndTime(row.appliedOnDate, "DD MMM yyyy")}
          </div>
          <div className="text-[13px] font-medium text-slate-400">
            {formatDateAndTime(row.appliedOnDate, "hh:mm A")}
          </div>
        </div>
      ),
    },
    {
      field: "srn",
      headerName: "SRN",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: GumastaListResponse) => {
        return (
          <span className="text-primary-main text-[13px] text-ellipsis overflow-hidden">
            {" "}
            {row.srn}{" "}
          </span>
        );
      },
    },
    {
      field: "propritorName",
      headerName: "Proprietor Name",
      flex: "flex-[1_1_0%]",
      renderCell: (row: GumastaListResponse) => (
        <span> {row.propritorName} </span>
      ),
    },

    {
      field: "adhaarNumber",
      headerName: "Aadhar Number",
      flex: "flex-[1_1_0%]",
      renderCell: (row: GumastaListResponse) => (
        <span> {row.adhaarNumber} </span>
      ),
    },
    {
      field: "firmName",
      headerName: "Firm Name",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: GumastaListResponse) => {
        return <span> {row.firmName} </span>;
      },
    },
    {
      field: "email",
      headerName: "Email",
      flex: "flex-[1_1_0%]",
      renderCell: (row: GumastaListResponse) => {
        return <span> {row.email} </span>;
      },
    },
    {
      field: "mobileNumber",
      headerName: "Mobile",
      flex: "flex-[1_1_0%]",
    },

    {
      field: "state",
      headerName: "State",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: GumastaListResponse) => {
        return <span> {row.state} </span>;
      },
    },
    {
      field: "district",
      headerName: "District",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: GumastaListResponse) => {
        return <span> {row.district} </span>;
      },
    },
    {
      noAuthRequired: true,
      field: "assignedTo",
      headerName: "Assignee",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: GumastaListResponse) => {
        return (
          <button type="button" className="text-primary-main py-[10px] ">
            {row?.assignedToName || "Not Assigned"}
          </button>
        );
      },
    },
  ];
  return (
    <>
      <GumastaVerifiedApplicationListing
        columns={getColumns(columns, "GUMASTA_APPLICATIONS")}
        rows={items}
      />
    </>
  );
};

export default GumastaVerifiedApplicationListingWrapper;
