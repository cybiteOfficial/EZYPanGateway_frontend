import React,{useState} from "react";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { RefundBalanceListResponse } from "src/models/LedgerRefundBalance.model";
import { formatDateAndTime } from "src/utils/dateAndTime";
import TabRefundBalanceList from "./TabRefundBalanceList";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/RefundBalanceSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/redux/store";
import { useGetRefundBalanceListQuery , useExportRefundBalanceListMutation } from "src/services/RefundBalanceService";
import moment from "moment";
import { Tooltip } from "@mui/material";


const paramList = [
  "_id",
      "walletType",
      "walletAmount",
      "walletId",
      "userId",
      "applicationType",
      "applicationId",
      "transactionType",
      "debitedAmount",
      "creditedAmount",
      "createdByType",
      "createdById",
      "paymentStatus",
      "dateAndTime",
      "remark",
      "userName",
      "email",
      "mobileNumber",
      "uuid",
      "createdAt",
      "updatedAt",
];

const exportDataHeaders = [
  { label: "Date", key: "createdAt" },
  { label: "Name", key: "userName" },
  { label: "Email", key: "email" },
  { label: "Mobile Number", key: "mobileNumber" },
  { label: "DebitedAmount", key: "debitedAmount" },
  { label: "CreditedAmount", key: "creditedAmount" },
  { label: "Transcation Type", key: "transactionType" },
  { label: "Transaction Id", key: "transactionId" },
  { label: "RefundedBy", key: "createdByType" },
  { label: "Message", key: "remark" },
];


const TabRefundBalanceListWrapper = () => { 

  const [isAllExporting, setIsAllExporting] = useState(false);
  const [isCurrentExporting, setIsCurrentExporting] = useState(false);
  const [exportData] = useExportRefundBalanceListMutation();
  const [dataToExport, setDataToExport] = useState([]);
  const dispatch = useDispatch<AppDispatch>();
  const refundBalanceState: any = useSelector(
    (state: RootState) => state.refundBalance
  );
  const { items, rowsPerPage, page, searchValue , dateFilter } = refundBalanceState;

  const { data, isLoading, isFetching } = useGetRefundBalanceListQuery({
    limit: rowsPerPage,
    searchValue: searchValue,
    params: [
      "_id",
      "walletType",
      "walletAmount",
      "walletId",
      "userId",
      "applicationType",
      "applicationId",
      "transactionType",
      "debitedAmount",
      "creditedAmount",
      "createdByType",
      "createdById",
      "paymentStatus",
      "dateAndTime",
      "remark",
      "userName",
      "email",
      "mobileNumber",
      "uuid",
      "createdAt",
      "updatedAt",
    ],
    page: page,
    filterBy: [
      {
        fieldName: "",
        value: [],
      },
    ],
    dateFilter:dateFilter,
    orderBy: "createdAt",
    orderByValue: -1,
    isPaginationRequired: true,
  });

  // Setting Items
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
 
   // Handle Export
   const handleExport = (done: () => void, isAllExport: boolean) => {
    isAllExport ? setIsAllExporting(true) : setIsCurrentExporting(true);
    exportData({
      limit: rowsPerPage,
      searchValue: searchValue,
      params: paramList,
      page: page,
      filterBy: [
        {
          fieldName: "",
          value: [],
        },
      ],
      dateFilter:dateFilter,
      orderBy: "createdAt",
      orderByValue: -1,
      isPaginationRequired: !isAllExport,
    }).then((res: any) => {
      let formattedData = res?.data?.data?.map(
        (data: RefundBalanceListResponse) => { 
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
  const columns: columnTypes[] = [
    {
      field: "dateAndTime",
      headerName: "Date - Time",
      noAuthRequired: true,
      flex: "flex-[1_1_0%]",
      renderCell: (row: RefundBalanceListResponse) => (
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
      renderCell: (row: RefundBalanceListResponse) => {
        return (
          <Tooltip title={row?.srn}>
            <span className="text-ellipsis overflow-hidden cursor-pointer"> {row?.srn  || "N/A"} </span>
          </Tooltip>
        )
      },
    },
    {
      field: "sjbtCode",
      headerName: "SJBT-Code",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: RefundBalanceListResponse) => {
        return <span> {row?.sjbtCode || "N/A"} </span>;
      },
    },
    {
      field: "userName",
      headerName: "Name",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: RefundBalanceListResponse) => {
        return <span> {row.userName || "N/A"} </span>;
      },
    },
    {
      field: "applicationType",
      headerName: "Application",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: RefundBalanceListResponse) => {
        return <span> {row.applicationType || "N/A"} </span>;
      },
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: RefundBalanceListResponse) => {
        switch (row.transactionType) {
          case "CREDIT":
            return (
              <div className="text-green-500">
                <span className="font-bold">&#x20B9;</span>
                {row.creditedAmount}
              </div>
            );

          case "DEBIT":
            return (
              <div className="text-red-500">
                <span className="font-bold">&#x20B9;</span>
                {row.debitedAmount}
              </div>
            );

          default:
            break;
        }
      },
    },
    {
      field: "remark",
      headerName: "Remark",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: RefundBalanceListResponse) => {
        return(
          <Tooltip title={row?.remark}>
 <span className="py-2 cursor-pointer text-ellipsis overflow-hidden" > {row?.remark || "N/A"} </span>
          </Tooltip>
        ) 
      },
    },
  ];

  return (
    <>
      <TabRefundBalanceList 
      columns={columns}
      rows={items} 
      onExport={handleExport}
      isAllExporting={isAllExporting}
      isCurrentExporting={isCurrentExporting}
      exportDataHeaders={exportDataHeaders}
      exportData={dataToExport}
      />
    </>
  );
};

export default TabRefundBalanceListWrapper;
