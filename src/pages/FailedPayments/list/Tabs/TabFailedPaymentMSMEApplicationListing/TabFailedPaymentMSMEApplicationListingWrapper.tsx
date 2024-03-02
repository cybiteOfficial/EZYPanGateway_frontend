import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/redux/store";
import { formatDateAndTime } from "src/utils/dateAndTime";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/TabFailedPaymentMSMESlice";
import { useExportHistoryMSMEDataMutation } from "src/services/MSMEService";

import moment from "moment";
import { getColumns } from "src/utils/auth/getColumns";
import TabFailedPaymentMSMEApplicationListing from "./TabFailedPaymentMSMEApplicationListing";
import { useGetMSMEFailedPaymentQuery } from "src/services/TabFailedPaymentApplicationService";
import { MSMEFailedPaymentListResponse } from "src/models/MSMEFailedPaymentResponse.model";

// Params List
const paramList = [
  "_id",
  "propritorName",
  "firmName",
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
  "appliedByNumber",
  "appliedFrom",
  "version",
  "status",
  "createdAt",
  "updatedAt"
];
const exportDataHeaders = [
  { label: "Date-Time", key: "createdAt" },
  { label: "Propritor Name", key: "propritorName" },
  { label: "Adhaar Number", key: "adhaarNumber" },
  { label: "Firm Name ", key: "firmName" },
  { label: "Address ", key: "Address" },
  { label: "Srn", key: "srn" },
  { label: "Mobile Number", key: "mobileNumber" },
  { label: "Email", key: "email" },
  { label: "OrderId", key: "orderId" },
  { label: "TxnId", key: "txnId" },
  { label: "Status", key: "status" },
];

const TabFailedPaymentMSMEApplicationListingWrapper = () => {
  const [isAllExporting, setIsAllExporting] = useState(false);
  const [isCurrentExporting, setIsCurrentExporting] = useState(false);
  const [dataToExport, setDataToExport] = useState([]);
  const [exportData] = useExportHistoryMSMEDataMutation();
  const dispatch = useDispatch<AppDispatch>();
  const msmeState: any = useSelector(
    (state: RootState) => state.TabFailedPaymentMSME
  );
  const {
    items,
    rowsPerPage,
    searchValue,
    page,
    isTableLoading,
    filterBy,
    dateFilter,
  } = msmeState;

  // Fetching Applications
  const { data, isFetching, isLoading } = useGetMSMEFailedPaymentQuery({
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

  const columns: columnTypes[] = [
    {
      field: "createdAt",
      headerName: "Date - Time",
      noAuthRequired: true,
      flex: "flex-[1_1_0%]",
      renderCell: (row: MSMEFailedPaymentListResponse) => (
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
      renderCell: (row: MSMEFailedPaymentListResponse) => {
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
      renderCell: (row: MSMEFailedPaymentListResponse) => {
        return (
          <span className="text-ellipsis overflow-hidden"> {row.email} </span>
        );
      },
    },
    {
      field: "uniqueTransactionId",
      headerName: "OrderId",
      flex: "flex-[1_1_0%]",
      renderCell: (row: MSMEFailedPaymentListResponse) => {
        return (
            <span className="text-ellipsis overflow-hidden"> {row.uniqueTransactionId} </span>
        );
      },
    },
    {
      field: "mobileNumber",
      headerName: "Mobile",
      flex: "flex-[1_1_0%]",
      renderCell: (row: MSMEFailedPaymentListResponse) => {
        return <span> {row.mobileNumber} </span>;
      },
    },
    {
      field: "adhaarNumber",
      headerName: "Aadhar Number",
      flex: "flex-[1_1_0%]",
      renderCell: (row: MSMEFailedPaymentListResponse) => {
        return <span> {row.adhaarNumber} </span>;
      },
    },

    {
      noAuthRequired: true,
      field: "status",
      headerName: "Status",
      flex: "flex-[1_1_0%]",
      renderCell: (row: MSMEFailedPaymentListResponse) => {
        return (
          <div className="flex flex-col gap-2 py-2">
            <span className="font-bold text-red-500">Failed</span>
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
        (data: MSMEFailedPaymentListResponse) => {
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
      <TabFailedPaymentMSMEApplicationListing
        columns={getColumns(columns, "MSME_APPLICATIONS")}
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

export default TabFailedPaymentMSMEApplicationListingWrapper;
