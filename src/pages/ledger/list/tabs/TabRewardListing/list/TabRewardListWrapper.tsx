import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { RewardListResponse } from "src/models/Reward.model";
import { formatDateAndTime } from "src/utils/dateAndTime";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/RewardSlice";
import TabRewardList from "./TabRewardList";
import { AppDispatch, RootState } from "src/redux/store";
import {
  useGetRewardListQuery,
  useExportRewardListMutation,
} from "src/services/RewardService";
import moment from "moment";

const paramList = [
  "_id",
  "userId",
  "points",
  "applicationType",
  "logs",
  "isDeleted",
  "isActive",
  "createdAt",
  "updatedAt",
];

const exportDataHeaders = [
  { label: "Date", key: "createdAt" },
  { label: "Name", key: "userName" },
  { label: "Email", key: "email" },
  { label: "Mobile Number", key: "mobileNumber" },
  { label: "Amount", key: "points" },
  { label: "SRN", key: "srn" },
  { label: "Transcation Type", key: "rewardTransactionType" },
  { label: "Transaction Id", key: "uniqueTransactionId" },
  { label: "RewardFor", key: "rewardFor" },
  { label: "RewardPointValue", key: "rewardPointValue" },
  { label: "Message", key: "logs" },
];

const TabRewardListWrapper = () => {
  const [isAllExporting, setIsAllExporting] = useState(false);
  const [isCurrentExporting, setIsCurrentExporting] = useState(false);
  const [exportData] = useExportRewardListMutation();
  const [dataToExport, setDataToExport] = useState([]);
  const dispatch = useDispatch<AppDispatch>();
  const rewardState: any = useSelector((state: RootState) => state.reward);
  const { items, rowsPerPage, page, searchValue, dateFilter } = rewardState;

  const { data, isLoading, isFetching } = useGetRewardListQuery({
    limit: rowsPerPage,
    searchValue: searchValue,
    params: [
      "_id",
      "userId",
      "points",
      "applicationType",
      "logs",
      "isDeleted",
      "isActive",
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
      field: "date_and_time",
      headerName: "Date - Time",
      noAuthRequired: true,
      flex: "flex-[1_1_0%]",
      renderCell: (row: RewardListResponse) => (
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
      field: "SJBTCode",
      headerName: "SJBT-Code",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: RewardListResponse) => {
        return <span> {row?.sjbtCode || "N/A"} </span>;
      },
    },
    {
      field: "srn",
      headerName: "SRN",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: RewardListResponse) => {
        return <span> {row?.srn || "N/A"} </span>;
      },
    },
    {
      field: "Mobile",
      headerName: "Mobile",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: RewardListResponse) => {
        return <span> {row?.mobileNumber || "N/A"} </span>;
      },
    },
    {
      field: "userName",
      headerName: "Name",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: RewardListResponse) => {
        return <span> {row?.userName || "N/A"} </span>;
      },
    },
    {
      field: "applicationType",
      headerName: "Application",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: RewardListResponse) => {
        return <span> {row?.applicationType || "N/A"}</span>;
      },
    },
    {
      field: "points",
      headerName: "Points",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: RewardListResponse) => {
        return (
          <div
            className={`${
              row?.rewardTransactionType === "CREDIT"
                ? "text-green-500"
                : "text-black"
            } ${
              row?.rewardTransactionType === "DEBIT"
                ? "text-red-700"
                : "text-black"
            } text-center flex gap-1 items-center text-[15px] font-medium`}
          >
            <span className="font-bold mr-[1px] ">
              {row?.rewardTransactionType === "CREDIT" ? "+" : "-"}
            </span>
            {row.points} <img alt='coinimage'  className="w-5 h-5" src="/sjbt-coin.svg"  />
          </div>
        );
      },
    },
    {
      field: "remark",
      headerName: "Remark",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: RewardListResponse) => {
        return <span className="py-2"> {row?.logs || "N/A"} </span>;
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
      filterBy: [
        {
          fieldName: "",
          value: [],
        },
      ],
      dateFilter: dateFilter,
      orderBy: "createdAt",
      orderByValue: -1,
      isPaginationRequired: !isAllExport,
    }).then((res: any) => {
      let formattedData = res?.data?.data?.map((data: RewardListResponse) => {
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
      <TabRewardList
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

export default TabRewardListWrapper;
