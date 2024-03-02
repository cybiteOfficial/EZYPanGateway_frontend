import React ,{useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { CommissionListResponse } from "src/models/Commission.model";
import { formatDateAndTime } from "src/utils/dateAndTime";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/CommissionSlice";
import TabCommissionList from "./TabCommissionList";
import { AppDispatch, RootState } from "src/redux/store";
import { useGetledgerCommissionQuery , useExportledgerCommissionMutation } from "src/services/CommissionService";
import moment from "moment";


const paramList = [
  "_id",
  "appliedById",
  "appliedByName",
  "appliedByEmail",
  "appliedByMobileNumber",
  "amount",
  "applicationType",
  "applicationId",
  "commissionFor",
  "commissionTransactionType",
  "logs",
  "isActive",
  "createdAt",
  "updatedAt",
];


const exportDataHeaders = [
  { label: "Date", key: "createdAt" },
  { label: "Name", key: "appliedByName" },
  { label: "Email", key: "appliedByEmail" },
  { label: "Mobile Number", key: "appliedByMobileNumber" },
  { label: "Amount", key: "amount" },
  { label: "SRN", key: "srn" },
  { label: "Transcation Type", key: "rewardTransactionType" },
  { label: "Transaction Id", key: "uniqueTransactionId" },
  { label: "CommissionFor", key: "DISTRIBUTOR" },
  { label: "TransactionType", key: "commissionTransactionType" },
  { label: "Message", key: "logs" },
];

const TabComissionListWrapper = () => { 

  const [isAllExporting, setIsAllExporting] = useState(false);
  const [isCurrentExporting, setIsCurrentExporting] = useState(false);
  const [exportData] = useExportledgerCommissionMutation();
  const [dataToExport, setDataToExport] = useState([]);

  const dispatch = useDispatch<AppDispatch>();
  const commissionState: any = useSelector(
    (state: RootState) => state.commission
  );
  const { items, rowsPerPage, page, searchValue ,dateFilter } = commissionState;

  const { data, isLoading, isFetching } = useGetledgerCommissionQuery({
    limit: rowsPerPage,
    searchValue: searchValue,
    params: [
      "_id",
      "appliedById",
      "appliedByName",
      "appliedByEmail",
      "appliedByMobileNumber",
      "amount",
      "applicationType",
      "applicationId",
      "commissionFor",
      "commissionTransactionType",
      "logs",
      "isActive",
      "createdAt",
      "updatedAt"
    ],
    page: page,
    filterBy: [
      {
        fieldName: "",
        value: [],
      },
    ],
    dateFilter: dateFilter,
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
  const columns: columnTypes[] = [
    {
      field: "createdAt",
      headerName: "Date - Time",
      noAuthRequired: true,
      flex: "flex-[1_1_0%]",
      renderCell: (row: CommissionListResponse) => (
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
      renderCell: (row: CommissionListResponse) => {
        return <span> {row?.srn || "N/A"} </span>;
      },
    },
    {
      field: "sjbtCode",
      headerName: "SJBT-Code",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: CommissionListResponse) => {
        return <span> {row?.sjbtCode || "N/A"} </span>;
      },
    },
    {
      field: "appliedByName",
      headerName: "Name",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: CommissionListResponse) => {
        return <span> {row.appliedByName || "N/A"} </span>;
      },
    },
    {
      field: "applicationType",
      headerName: "Application",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: CommissionListResponse) => {
        return <span> {row.applicationType || "N/A"}</span>;
      },
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: CommissionListResponse) => {
        switch (row.commissionTransactionType) {
          case "CREDIT":
            return (
              <div className="text-green-500">
                <span className="font-bold">&#x20B9;</span>
                {row.amount}
              </div>
            );

          case "DEBIT":
            return (
              <div className="text-red-500">
                <span className="font-bold">&#x20B9;</span>
                {row.amount}
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
      renderCell: (row: CommissionListResponse) => {
        return <span className="py-2" > {row?.logs || "N/A"} </span>;
      },
    },
  ];

  // Export 
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
        (data: CommissionListResponse) => { 
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
      <TabCommissionList 
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

export default TabComissionListWrapper;
