import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/TabFailedPaymentITRSlice";
import { AppDispatch, RootState } from "src/redux/store";
import {
  useExportHistoryITRDataMutation,
} from "src/services/ITRApplicationServices";
import { formatDateAndTime } from "src/utils/dateAndTime";
import { getColumns } from "src/utils/auth/getColumns";
import TabFailedPaymentITRApplicationListing from "./TabFailedPaymentITRApplicationListing";
import { useGetITRFailedPaymentQuery } from "src/services/TabFailedPaymentApplicationService";
import { ITRFailedPaymentListResponse } from "src/models/ITRFailedPayment.model";

// Params
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
  "updatedAt"
];

const exportDataHeaders = [
  { label: "Date-Time", key: "createdAt" },
  { label: "First Name", key: "firstName" },
  { label: "Middle Name", key: "middleName" },
  { label: "Last Name", key: "lastName" },
  { label: "Adhaar Number", key: "adhaarNumber" },
  { label: "Assesment Year", key: "assesmentYear" },
  { label: "Income Source", key: "incomeSource" },
  { label: "Filling Type", key: "fillingType" },
  { label: "Mobile Number", key: "mobileNumber" },
  { label: "Email Id ", key: "emailId" },
  { label: "OrderId", key: "orderId" },
  { label: "Distributor Code", key: "distributorCode" },
  { label: "Txn Id", key: "txnId" },
  { label: "SRN", key: "srn" },
  { label: "Payment Category", key: "paymentCategory" },
  { label: "Status", key: "status" },
];

const TabFailedPaymentITRApplicationListingWrapper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const itrState:any = useSelector(
    (state: RootState) => state.TabFailedPaymentITR
  );
  const {
    items,
    rowsPerPage,
    searchValue,
    page,
    isTableLoading,
    filterBy,
    dateFilter,
  } = itrState;
  const [exportData] = useExportHistoryITRDataMutation();
  const [isAllExporting, setIsAllExporting] = useState(false);
  const [isCurrentExporting, setIsCurrentExporting] = useState(false);
  const [dataToExport, setDataToExport] = useState([]);

  const { data, isFetching, isLoading } = useGetITRFailedPaymentQuery({
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

  // Table Columns
  const columns: columnTypes[] = [
    {
      field: "createdAt",
      headerName: "Date - Time",
      noAuthRequired: true,
      flex: "flex-[1_1_0%]",
      renderCell: (row: ITRFailedPaymentListResponse) => (
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
      renderCell: (row: ITRFailedPaymentListResponse) => (
        <span className="text-primary-main text-[13px] text-ellipsis overflow-hidden">
          {row.srn}
        </span>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      flex: "flex-[1_1_0%]",
      renderCell: (row: ITRFailedPaymentListResponse) => (
        <span> {`${row.firstName} ${row.middleName} ${row.lastName}`} </span>
      ),
    },
    {
      field: "emailId",
      headerName: "Email",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: ITRFailedPaymentListResponse) => {
        return <span> {row.emailId} </span>;
      },
    }, 
    {
      field: "uniqueTransactionId",
      headerName: "OrderId",
      flex: "flex-[1.4_1.4_0%]",
      renderCell: (row:ITRFailedPaymentListResponse ) => {
        return   <span className="text-ellipsis overflow-hidden"> {row.uniqueTransactionId} </span>
           
        ;
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
      headerName: "SJBT Code",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: ITRFailedPaymentListResponse) => {
        return <span> {row.distributorCode} </span>;
      },
    },
    {
      field: "appliedByNumber",
      headerName: "Applied By (Mob. No.)",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: ITRFailedPaymentListResponse) => {
        return <span> {row.appliedByNumber || "N/A"} </span>;
      },
    },
    {
      field: "status",
      headerName: "Status",
      flex: "flex-[1_1_0%]",
      renderCell: (row: ITRFailedPaymentListResponse) => {
        return (
          <div className="text-red-500 font-bold">
            <span>Failed</span>
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
      let formattedData = res?.data?.data?.map((data: ITRFailedPaymentListResponse) => {
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
      <TabFailedPaymentITRApplicationListing
        columns={getColumns(columns, "ITR_APPLICATIONS")}
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

export default TabFailedPaymentITRApplicationListingWrapper;
