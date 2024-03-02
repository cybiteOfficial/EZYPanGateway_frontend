import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { PANListResponse } from "src/models/PAN.model";
import { useGetPanQuery } from "src/services/PANService";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/redux/store";
import {
  setFilterBy,
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/TabRetailerPanApplicationSlice";
import { formatDateAndTime } from "src/utils/dateAndTime";
import { BsCircleFill } from "react-icons/bs";
import { applicationStatus } from "src/utils/history/applicationStatus";
import { getColumns } from "src/utils/auth/getColumns";
import TabRetailerApplicationDigitalPANListing from "./TabRetailerApplicationDigitalPANListing";

const paramList = [
  "category",
  "name",
  "email",
  "dob",
  "parentName",
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

const TabRetailerApplicationDigitalPANListingWrapper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const panApplicationState: any = useSelector(
    (state: RootState) => state.tabRetailerPanApplication
  );
  const { items, rowsPerPage, searchValue, page, filterBy, dateFilter } =
    panApplicationState;

  const { state } = useLocation();

  // Setting Distributor Cde
  useEffect(() => {
    dispatch(
      setFilterBy(
        filterBy.map((filter: any) => {
          if (filter.fieldName === "appliedByNumber") {
            return {
              ...filter,
              value: [state?.retailer?.mobileNumber],
            };
          } else {
            return filter;
          }
        })
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const { data, isFetching, isLoading } = useGetPanQuery({
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
      renderCell: (row: PANListResponse) => (
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
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: PANListResponse) => {
        return (
          <span className="text-primary-main text-[13px] text-ellipsis overflow-hidden">
            {row.srn}
          </span>
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      flex: "flex-[1_1_0%]",
      renderCell: (row: PANListResponse) => <span> {row.name} </span>,
    },
    {
      field: "email",
      headerName: "Email",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: PANListResponse) => {
        return <span> {row.email} </span>;
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
        return <span> {row.distributorCode} </span>;
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
    {
      field: "status",
      headerName: "Status",
      flex: "flex-[1_1_0%]",
      renderCell: (row: PANListResponse) => {
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
      <TabRetailerApplicationDigitalPANListing
        columns={getColumns(columns, "PAN_APPLICATIONS")}
        rows={items}
      />
    </>
  );
};

export default TabRetailerApplicationDigitalPANListingWrapper;


