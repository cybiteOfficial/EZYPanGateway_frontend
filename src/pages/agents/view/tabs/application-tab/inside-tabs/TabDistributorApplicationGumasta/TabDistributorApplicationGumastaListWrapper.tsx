import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { AppDispatch, RootState } from "src/redux/store";
import { formatDateAndTime } from "src/utils/dateAndTime";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import {
  setFilterBy,
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/TabDistributorGumastaApplicationSlice";
import { GumastaListResponse } from "src/models/Gumasta.model";
import { useGetGumastaQuery } from "src/services/GumastaService";
import TabDistributorApplicationGumastaList from "./TabDistributorApplicationGumastaList";
import { BsCircleFill } from "react-icons/bs";
import { applicationStatus } from "src/utils/history/applicationStatus";
import { getColumns } from "src/utils/auth/getColumns";

// Params List
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

const TabDistributorApplicationGumastaListWrapper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const gumastaState: any = useSelector(
    (state: RootState) => state.tabDistributorGumastaApplication
  );
  const { items, rowsPerPage, searchValue, page, filterBy, dateFilter } =
    gumastaState;

  const { state } = useLocation();

  // Setting Distributor Cde
  useEffect(() => {
    dispatch(
      setFilterBy(
        filterBy.map((filter: any) => {
          if (filter.fieldName === "appliedById") {
            return {
              ...filter,
              value: [state.distributor?._id],
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
  const { data, isFetching, isLoading } = useGetGumastaQuery({
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

  // Table Columns
  const columns: columnTypes[] = [
    {
      field: "createdAt",
      headerName: "Date - Time",
      noAuthRequired: true,
      flex: "flex-[1_1_0%]",
      renderCell: (row: GumastaListResponse) => (
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
      noAuthRequired: true,
      field: "srn",
      headerName: "SRN",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: GumastaListResponse) => {
        return (
          <span className="text-primary-main text-[13px] text-ellipsis overflow-hidden">
            {row.srn}
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
        <span className="text-[13px] text-ellipsis overflow-hidden">
          {" "}
          {row.adhaarNumber}{" "}
        </span>
      ),
    },
    {
      field: "firmName",
      headerName: "Firm Name",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: GumastaListResponse) => {
        return (
          <span className="text-ellipsis overflow-hidden">{row.firmName}</span>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: GumastaListResponse) => {
        return (
          <span className="text-ellipsis overflow-hidden"> {row.email} </span>
        );
      },
    },
    {
      field: "mobileNumber",
      headerName: "Mobile",
      flex: "flex-[1_1_0%]",
      renderCell: (row: GumastaListResponse) => {
        return <span> {row.mobileNumber} </span>;
      },
    },

    {
      field: "state",
      headerName: "State",
      flex: "flex-[1_1_0%]",
      renderCell: (row: GumastaListResponse) => {
        return <span> {row.state} </span>;
      },
    },
    {
      field: "district",
      headerName: "District",
      flex: "flex-[1_1_0%]",
      renderCell: (row: GumastaListResponse) => {
        return <span> {row.district} </span>;
      },
    },
    {
      field: "status",
      headerName: "Status",
      flex: "flex-[1_1_0%]",
      renderCell: (row: GumastaListResponse) => {
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
      <TabDistributorApplicationGumastaList
        columns={getColumns(columns, "GUMASTA_APPLICATIONS")}
        rows={items}
      />
    </>
  );
};

export default TabDistributorApplicationGumastaListWrapper;
