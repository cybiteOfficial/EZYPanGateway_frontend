import Tooltip from "@mui/material/Tooltip";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/TabFailedPaymentPanSlice";
import { AppDispatch, RootState } from "src/redux/store";
import { useExportHistoryPanDataMutation } from "src/services/PANService";
import { formatDateAndTime } from "src/utils/dateAndTime";
import { getColumns } from "src/utils/auth/getColumns";
import TabFailedPaymentPanApplicationListing from "./TabFailedPaymentPanApplicationListing";
import { useGetPanFailedPaymentQuery } from "src/services/TabFailedPaymentApplicationService";
import { PanFailedPaymentListResponse } from "src/models/PanFailedPaymentResponse.model";

const paramList = [
  "_id",
  "category",
  "name",
  "email",
  "appliedByNumber",
  "dob",
  "adhaarNumber",
  "mobileNumber",
  "panCardFront",
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
  "createdAt",
  "updatedAt",
];
const exportDataHeaders = [
  { label: "Date-Time", key: "createdAt" },
  { label: "Name", key: "name" },
  { label: "Email", key: "email" },
  { label: "OrderId", key: "orderId" },
  { label: "DOB", key: "dob" },
  { label: "Parent Name", key: "parentName" },
  { label: "Adhaar Number", key: "adhaarNumber" },
  { label: "Mobile Number", key: "mobileNumber" },
  { label: "Category", key: "category" },
  { label: "TxnId", key: "txnId" },
  { label: "Payement Details", key: "payementDetails" },
  { label: "Pan Number", key: "panNumber" },
  { label: "Payment Category", key: "paymentCategory" },
  { label: "Status", key: "status" },
  { label: "DistributorCode", key: "distributorCode" },
  { label: "Comment", key: "comment" },
];

const TabFailedPaymentPanApplicationListingWrapper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isAllExporting, setIsAllExporting] = useState(false);
  const [isCurrentExporting, setIsCurrentExporting] = useState(false);
  const [dataToExport, setDataToExport] = useState([]);
  const TabFailedPaymentPan: any = useSelector(
    (state: RootState) => state.TabFailedPaymentPan
  );
  const {
    items,
    rowsPerPage,
    searchValue,
    page,
    filterBy,
    isTableLoading,
    dateFilter,
  } = TabFailedPaymentPan;
  const [exportData] = useExportHistoryPanDataMutation();

  const { data, isFetching, isLoading } = useGetPanFailedPaymentQuery({
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
      renderCell: (row: PanFailedPaymentListResponse) => ( 
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
      renderCell: (row: PanFailedPaymentListResponse) => {
        return (
          <Tooltip title={row.srn}>
            <span className="text-primary-main text-[13px] text-ellipsis overflow-hidden">
              {row.srn}
            </span>
          </Tooltip>
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      flex: "flex-[1_1_0%]",
      renderCell: (row: PanFailedPaymentListResponse) => (
        <Tooltip title={row.name}>
          <span className="text-ellipsis overflow-hidden"> {row.name} </span>
        </Tooltip>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      flex: "flex-[1.6_1.6_0%]",
      renderCell: (row: PanFailedPaymentListResponse) => {
        return (
          <Tooltip title={row.email}>
            <span className="text-ellipsis overflow-hidden"> {row.email} </span>
          </Tooltip>
        );
      },
    },
    {
      field: "uniqueTransactionId",
      headerName: "OrderId",
      flex: "flex-[1.4_1.4_0%]",
      renderCell: (row: PanFailedPaymentListResponse) => {
        return (
          <Tooltip title={row.uniqueTransactionId}>
            <span className="text-ellipsis overflow-hidden"> {row.uniqueTransactionId} </span>
          </Tooltip>
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
      flex: "flex-[1.2_1.2_0%]",
      renderCell: (row: PanFailedPaymentListResponse) => {
        return <span> {row.distributorCode || "N/A"} </span>;
      },
    },
    {
      field: "appliedByNumber",
      headerName: "Applied By (Mob. No.)",
      flex: "flex-[1_1_0%]",
      renderCell: (row: PanFailedPaymentListResponse) => {
        return <span> {row.appliedByNumber || "N/A"} </span>;
      },
    },
    {
      field: "status",
      headerName: "Status",
      flex: "flex-[1_1_0%]",
      renderCell: (row: PanFailedPaymentListResponse) => {
        return (
          <div className="flex flex-col gap-2 py-2">
            <span className=" text-red-500 font-bold">Failed</span>
          </div>
        );
      },
    },
  ];

  // Handle Export
  const handleExport = (done: () => void, isAllExport: boolean) => {
    isAllExport ? setIsAllExporting(true) : setIsCurrentExporting(true);
    exportData({
      limit: rowsPerPage,
      searchValue: searchValue,
      params: paramList,
      page: page,
      filterBy: filterBy,
      dateFilter: dateFilter,
      orderBy: "createdAt",
      orderByValue: -1,
      isPaginationRequired: !isAllExport,
    }).then((res: any) => {
      let formattedData = res?.data?.data?.map(
        (data: PanFailedPaymentListResponse) => {
          return {
            ...data,
            createdAt: moment(data?.createdAt).format("DD-MM-yyyy hh:mm A"),
          };
        }
      );
      setDataToExport(formattedData);
      setTimeout(() => {
        done();
        isAllExport ? setIsAllExporting(false) : setIsCurrentExporting(false);
        document.body.click();
      }, 800);
    });
  };

  return (
    <>
      <TabFailedPaymentPanApplicationListing
        columns={getColumns(columns, "PAN_APPLICATIONS")}
        rows={items}
        onExport={handleExport}
        isAllExporting={isAllExporting}
        isCurrentExporting={isCurrentExporting}
        isTableLoading={isTableLoading}
        exportDataHeaders={exportDataHeaders}
        exportData={dataToExport}
      />
    </>
  );
};

export default TabFailedPaymentPanApplicationListingWrapper;
