import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/redux/store";
import { formatDateAndTime } from "src/utils/dateAndTime";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/TabFailedPaymentDSCSlice";
import { useExportHistoryDSCDataMutation } from "src/services/DSCService";
import moment from "moment";
import { getColumns } from "src/utils/auth/getColumns";
import TabFailedPaymentDSCApplicationListing from "./TabFailedPaymentDSCApplicationListing";
import { useGetDSCFailedPaymentQuery } from "src/services/TabFailedPaymentApplicationService";
import { DSCFailedPaymentListResponse } from "src/models/DSCFailedPaymentResponse.model";

// Params List
const paramList = [
  "_id",
  "propritorName",
  "srn",
  "email",
  "mobileNumber",
  "adhaarNumber",
  "address",
  "photoUrl",
  "adhaarCardPhotoUrl",
  "panCardPhotoUrl",
  "otherDocuments",
  "txnId",
  "payementDetails",
  "paymentCategory",
  "appliedFrom",
  "version",
  "status",
  "appliedByNumber",
  "createdAt",
  "updatedAt",
];

const exportDataHeaders = [
  { label: "Date-Time", key: "createdAt" },
  { label: "Proprietor Name", key: "propritorName" },
  { label: "Email", key: "email" },
  { label: "OrderId", key: "orderId" },
  { label: "Adhaar Number", key: "adhaarNumber" },
  { label: "Mobile Number", key: "mobileNumber" },
  { label: "TXN Id", key: "txnId" },
  { label: "SRN", key: "srn" },
  { label: "Status", key: "status" },
];

const TabFailedPaymentDSCApplicationListingWrapper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isAllExporting, setIsAllExporting] = useState(false);
  const [isCurrentExporting, setIsCurrentExporting] = useState(false);
  const [dataToExport, setDataToExport] = useState([]);
  const dscState: any = useSelector(
    (state: RootState) => state.TabFailedPaymentDSC
  );
  const {
    items,
    rowsPerPage,
    searchValue,
    page,
    isTableLoading,
    filterBy,
    dateFilter,
  } = dscState;
  const [exportData] = useExportHistoryDSCDataMutation();

  // Fetching Applications
  const { data, isFetching, isLoading } = useGetDSCFailedPaymentQuery({
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
      renderCell: (row: DSCFailedPaymentListResponse) => (
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
      renderCell: (row: DSCFailedPaymentListResponse) => {
        return (
          <span className="text-primary-main text-[13px] text-ellipsis overflow-hidden">
            {row.srn}
          </span>
        );
      },
    },
    {
      field: "propritorName",
      headerName: "Propritor Name",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: DSCFailedPaymentListResponse) => (
        <span className="text-ellipsis overflow-hidden">
          {row.propritorName}
        </span>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: DSCFailedPaymentListResponse) => {
        return (
          <span className="text-ellipsis overflow-hidden"> {row.email} </span>
        );
      },
    },
    {
      field: "uniqueTransactionId",
      headerName: "OrderId",
      flex: "flex-[1.4_1.4_0%]",
      renderCell: (row: DSCFailedPaymentListResponse) => {
        return (
            <span className="text-ellipsis overflow-hidden"> {row.uniqueTransactionId} </span>
        );
      },
    },
    {
      field: "mobileNumber",
      headerName: "Mobile",
      flex: "flex-[1_1_0%]",
      renderCell: (row: DSCFailedPaymentListResponse) => {
        return <span> {row.mobileNumber} </span>;
      },
    },
    {
      field: "adhaarNumber",
      headerName: "Aadhar Number",
      flex: "flex-[1_1_0%]",
      renderCell: (row: DSCFailedPaymentListResponse) => (
        <span className=" text-ellipsis overflow-hidden">
          {row.adhaarNumber}
        </span>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: "flex-[1_1_0%]",
      renderCell: (row: DSCFailedPaymentListResponse) => {
        return <div className="font-bold text-red-500">Failed</div>;
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
        (data: DSCFailedPaymentListResponse) => {
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
      <TabFailedPaymentDSCApplicationListing
        columns={getColumns(columns, "DSC_APPLICATIONS")}
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

export default TabFailedPaymentDSCApplicationListingWrapper;
