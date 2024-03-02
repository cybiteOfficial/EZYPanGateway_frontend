import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/redux/store";
import { formatDateAndTime } from "src/utils/dateAndTime";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/TabFailedPaymentGumastaSlice";
import {
  useExportHistoryGumastaDataMutation,
} from "src/services/GumastaService";

import moment from "moment";
import { getColumns } from "src/utils/auth/getColumns";
import TabFailedPaymentGumastaApplicationListing from "./TabFailedPaymentGumastaApplicationListing";
import { GumastaFailedPaymentListResponse } from "src/models/GumastaFailedPaymentResponse.model";
import { useGetGumastaFailedPaymentQuery } from "src/services/TabFailedPaymentApplicationService";

// Params List
const paramList = [
  "_id",
  "propritorName",
  "adhaarNumber",
  "appliedByNumber",
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
  "txnId",
  "payementDetails",
  "srn",
  "appliedFrom",
  "version",
  "status",
  "createdAt",
  "updatedAt",
];

const exportDataHeaders = [
  { label: "Date-Time", key: "createdAt" },
  { label: "Propritor Name", key: "propritorName" },
  { label: "Adhaar Number", key: "adhaarNumber" },
  { label: "Mobile Number", key: "mobileNumber" },
  { label: "Email", key: "email" },
  { label: "OrderId", key: "orderId" },
  { label: "Firm Name ", key: "firmName" },
  { label: "Firm Address ", key: "firmAddress" },
  { label: "State", key: "state" },
  { label: "District", key: "district" },
  { label: "DstributorCode", key: "distributorCode" },
  { label: "TxnId", key: "txnId" },
  { label: "Srn", key: "srn" },
  { label: "Status", key: "status" },
  { label: "AcknowledgementNumber", key: "acknowledgementNumber" },
];

const TabFailedPaymentGumastaApplicationListingWrapper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isAllExporting, setIsAllExporting] = useState(false);
  const [isCurrentExporting, setIsCurrentExporting] = useState(false);
  const [dataToExport, setDataToExport] = useState([]);

  const gumastaState:any = useSelector(
    (state: RootState) => state.TabFailedPaymentGumasta
  );
  const {
    items,
    rowsPerPage,
    searchValue,
    isTableLoading,
    page,
    filterBy,
    dateFilter,
  } = gumastaState;

  // Fetching Applications
  const { data, isFetching, isLoading } = useGetGumastaFailedPaymentQuery({
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
  const [exportData] = useExportHistoryGumastaDataMutation();

  // Setting data
  useEffect(() => {
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
      renderCell: (row: GumastaFailedPaymentListResponse) => (
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
      renderCell: (row: GumastaFailedPaymentListResponse) => {
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
      renderCell: (row: GumastaFailedPaymentListResponse) => (
        <span> {row.propritorName} </span>
      ),
    },
    {
      field: "adhaarNumber",
      headerName: "Aadhar Number",
      flex: "flex-[1.1_1.1_0%]",
      renderCell: (row: GumastaFailedPaymentListResponse) => (
        <span className="text-[13px] text-ellipsis overflow-hidden">
          {" "}
          {row.adhaarNumber}{" "}
        </span>
      ),
    },
    {
      field: "firmName",
      headerName: "Firm Name",
      flex: "flex-[1_1_0%]",
      renderCell: (row: GumastaFailedPaymentListResponse) => {
        return (
          <span className="text-ellipsis overflow-hidden">{row.firmName}</span>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      flex: "flex-[1.2_1.2_0%]",
      renderCell: (row: GumastaFailedPaymentListResponse) => {
        return (
          <span className="text-ellipsis overflow-hidden"> {row.email} </span>
        );
      },
    },
    {
      field: "uniqueTransactionId",
      headerName: "OrderId",
      flex: "flex-[1.4_1.4_0%]",
      renderCell: (row:GumastaFailedPaymentListResponse ) => {
        return   <span className="text-ellipsis overflow-hidden"> {row.uniqueTransactionId} </span>
           
        ;
      },
    },
    {
      field: "mobileNumber",
      headerName: "Mobile",
      flex: "flex-[1_1_0%]",
      renderCell: (row: GumastaFailedPaymentListResponse) => {
        return <span> {row.mobileNumber} </span>;
      },
    },

    {
      field: "state",
      headerName: "State",
      flex: "flex-[1_1_0%]",
      renderCell: (row: GumastaFailedPaymentListResponse) => {
        return <span> {row.state} </span>;
      },
    },
    {
      field: "district",
      headerName: "District",
      flex: "flex-[1_1_0%]",
      renderCell: (row: GumastaFailedPaymentListResponse) => {
        return <span> {row.district} </span>;
      },
    },
    {
      field: "status",
      headerName: "Status",
      flex: "flex-[1_1_0%]",
      renderCell: (row: GumastaFailedPaymentListResponse) => {
        return (
          <div className="flex flex-col gap-2 py-2">
            <span className="text-red-500 font-bold">Failed</span>
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
      let formattedData = res?.data?.data?.map((data: GumastaFailedPaymentListResponse) => {
        return {
          ...data,
          createdAt: moment(data?.createdAt).format("DD-MM-yyyy hh:mm A"),
        };
      });
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
      <TabFailedPaymentGumastaApplicationListing
        columns={getColumns(columns, "GUMASTA_APPLICATIONS")}
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

export default TabFailedPaymentGumastaApplicationListingWrapper;
