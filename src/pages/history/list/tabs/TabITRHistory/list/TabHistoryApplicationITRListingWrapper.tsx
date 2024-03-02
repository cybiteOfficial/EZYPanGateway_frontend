import moment from "moment";
import React, { useEffect, useState } from "react";
import { BsCircleFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { ITRListResponse } from "src/models/ITR.model";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/TabHistoryITRApplicationSlice";
import { AppDispatch, RootState } from "src/redux/store";
import {
  useChangeITRStatusMutation,
  useExportHistoryITRDataMutation,
  useGetITRApplicationQuery,
  useGetITRflowDataMutation
} from "src/services/ITRApplicationServices";
import { formatDateAndTime } from "src/utils/dateAndTime";
import { applicationStatus } from "src/utils/history/applicationStatus";

import TabHistoryApplicationITRListing from "./TabHistoryApplicationITRListing";
import { getColumns } from "src/utils/auth/getColumns";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import { useReuploadAcknowledgmentMutation } from "src/services/UserServices";
import ReuploadAcknowledgementDialogWrapper from "src/components/ReuploadAcknowledgementDialog/ReuploadAcknowledgementDialogWrapper";
import { showToast } from "src/utils/toaster/showToast";
import AuthHOC from "src/userAccess/AuthHOC";
import { showConfirmationDialog } from "src/utils/showConfirmationDialog";
import { useNavigate } from "react-router-dom";
import HistoryDialog from "../../../Dialog/HistoryDialog";
import { Tooltip } from "@mui/material";

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
  "appliedBy",
  "appliedAs",
  "txnId",
  "payementDetails",
  "srn",
  "paymentCategory",
  "appliedFrom",
  "version",
  "acknowledgementNumber",
  "status",
  "assignedTo",
  "assignedBy",
  "createdAt",
  "updatedAt",
];

const exportDataHeaders = [
  { label: "Date-Time", key: "appliedOnDate" },
  { label: "First Name", key: "firstName" },
  { label: "Middle Name", key: "middleName" },
  { label: "SRN", key: "srn" },
  { label: "Last Name", key: "lastName" },
  { label: "Adhaar Number", key: "adhaarNumber" },
  { label: "Assesment Year", key: "assesmentYear" },
  { label: "Income Source", key: "incomeSource" },
  { label: "Filling Type", key: "fillingType" },
  { label: "Mobile Number", key: "mobileNumber" },
  { label: "Email Id ", key: "emailId" },
  { label: "Distributor Code", key: "distributorCode" },
  { label: "AcknowledgementNumber", key: "acknowledgementNumber" },
  { label: "Txn Id", key: "txnId" },
  { label: "SRN", key: "srn" },
  { label: "Payment Category", key: "paymentCategory" },
  { label: "Status", key: "status" },
  {label:"Amount" , key :"applicationIndividualPrice"}
];

const TabHistoryApplicationITRListingWrapper = () => {
  const navigate = useNavigate();
  const [changeStatus] = useChangeITRStatusMutation();

  const dispatch = useDispatch<AppDispatch>();
  const itrState = useSelector(
    (state: RootState) => state.tabHistoryITRApplication
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
  const [flowData, flowDataInfo] = useGetITRflowDataMutation();
  const [isAllExporting, setIsAllExporting] = useState(false);
  const [isShowFlowDialog, setIsShowFlowDialog] = useState(false);
  const [setFlowData, setSetFolwData] = useState<any>([]);
  const [isCurrentExporting, setIsCurrentExporting] = useState(false);
  const [dataToExport, setDataToExport] = useState([]);
  const [ITRIdVerfiy, setITRIdVerfiy] = useState("");
  const [isOpenReuploadDialog, setIsOpenReuploadDialog] = useState(false);
  const [reuploadAcknowledgment] =
    useReuploadAcknowledgmentMutation();
  const { data, isFetching, isLoading } = useGetITRApplicationQuery({
    limit: rowsPerPage,
    searchValue: searchValue,
    params: paramList,
    page: page,
    filterBy: filterBy,
    dateFilter: dateFilter,
    orderBy: "appliedOnDate",
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

  const handleFolwData = (id: string) => {
    flowData(id).then((res: any) => {
      if (res?.data?.status) {
        setSetFolwData(res?.data);
        showToast("success", "Flow Data found");
      } else {
        setSetFolwData([]);
        showToast("error", "Flow Data not found");
      }
    });
  };

  // Table Columns
  const columns: columnTypes[] = [
    {
      hidden :!AuthHOC({
        resultType:"BOOLEAN",
        forApplicationStatus:true,
        applicationName:"ITR",
        applicationStatus :"PENDING"
      }),
      noAuthRequired: true,
      field: "",
      headerName: "Move To",
      flex: "flex-[1_1_0%]",
      renderCell :(row:ITRListResponse)=>{
        return (
          <div>
            {
        row.status === "REJECT" ? <button 
        className="bg-green-400 text-white rounded px-2 py-1 font-medium"
        onClick={(e) => {
          e.stopPropagation();
          showConfirmationDialog({
            title: "Heads Up",
            text: "Are you sure want to move Application to Pending ?",
            icon: "question",
            showCancelButton: true,
            next: (result) => {
              if (result.isConfirmed) {
                const formData = new FormData();
                formData.append("requestedStatus", "PENDING");

                changeStatus({
                  id: row._id,
                  body: formData,
                }).then((res: any) => {
                  if (res.error) {
                    showToast("error", res.error.data?.message);
                  } else {
                    if (res.data?.status) {
                      showToast("success", res.data?.message);
                      navigate(`/itr/${row._id}`);
                    } else {
                      showToast("error", res.data?.message);
                    }
                  }
                });
              }
            },
          });
        }}
        >Pending</button> : <span >-</span>
            }
          </div>
          
        )
      }
    },
    {
      field: "appliedOnDate",
      headerName: "Date - Time",
      noAuthRequired: true,
      flex: "flex-[1_1_0%]",
      renderCell: (row: ITRListResponse) => (
        <div>
          <div className="text-slate-700 font-medium">
            {formatDateAndTime(row?.appliedOnDate, "DD MMM yyyy")}
          </div>
          <div className="text-[13px] font-medium text-slate-400">
            {formatDateAndTime(row?.appliedOnDate, "hh:mm A")}
          </div>
        </div>
      ),
    },
    {
      field: "srn",
      headerName: "SRN",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: ITRListResponse) => (
        <span className="text-primary-main text-[13px] text-ellipsis overflow-hidden">
          {row.srn}
        </span>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      flex: "flex-[1_1_0%]",
      renderCell: (row: ITRListResponse) => (
        <span> {`${row.firstName} ${row.middleName} ${row.lastName}`} </span>
      ),
    },
    {
      field: "emailId",
      headerName: "Email",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: ITRListResponse) => {
        return <span> {row.emailId} </span>;
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
      renderCell: (row: ITRListResponse) => {
        return <span> {row.distributorCode} </span>;
      },
    },
    {
      field: "appliedByNumber",
      headerName: "Applied By (Mob. No.)",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: ITRListResponse) => {
        return <span> {row.appliedByNumber || "N/A"} </span>;
      },
    },
   
    // {
    //   field: "acknowledgementNumber",
    //   headerName: "Acknowledgement Number",
    //   flex: "flex-[1.5_1.5_0%]",
    //   renderCell: (row: ITRListResponse) => {
    //     return (
    //       <Tooltip title={row.acknowledgementNumber}>
    //         <span className="text-primary-main text-[13px] text-ellipsis overflow-hidden">
    //           {row.acknowledgementNumber || "-"}
    //         </span>
    //       </Tooltip>
    //     );
    //   },
    // },

    {
      field: "applicationIndividualPrice",
      headerName: "Amount",
      flex: "flex-[1_1_0%]",
      renderCell: (row: ITRListResponse) => {
        return (
          <Tooltip title={row?.applicationIndividualPrice}>
            <span className="text-green-500 text-[13px] text-ellipsis overflow-hidden font-semibold">
            &#8377; {row?.applicationIndividualPrice || "-"}
            </span>
          </Tooltip>
        );
      },
    },
    {
      field: "verifiedByName",
      headerName: "Verified By",
      flex: "flex-[1_1_0%]",
      renderCell: (row: ITRListResponse) => {
        return (
          <Tooltip title={row?.verifiedByName}>
            <span className="text-primary-main text-[13px] text-ellipsis overflow-hidden font-semibold">
             {row?.verifiedByName || "-"}
            </span>
          </Tooltip>
        );
      },
    },
    {
      field: "rejectedByName",
      headerName: "Rejected By",
      flex: "flex-[1_1_0%]",
      renderCell: (row: ITRListResponse) => {
        return (
          <Tooltip title={row?.rejectedByName}>
            <span className="text-primary-main text-[13px] text-ellipsis overflow-hidden font-semibold">
             {row?.rejectedByName || "-"}
            </span>
          </Tooltip>
        );
      },
    },

    {
      field: "status",
      headerName: "Status",
      flex:  "flex-[1.5_1.5_0%]",
      renderCell: (row: ITRListResponse) => {
        return (
          <div className="flex flex-col gap-2 py-2">
          <span
            className={`font-medium rounded-full flex gap-2 items-center bg-slate-100 px-2 py-1 text-[13px]  ${
              applicationStatus[row.status].className
            }`}
          >
            <BsCircleFill className="text-[10px]" />
            {applicationStatus[row.status].label || "N/A"}{" "}
          </span>
          {(row?.status !== "REJECT" && row?.status !== "PENDING" && row?.status !== "CANCELLED" &&  row?.status !== "IN_PROGRESS" ) && (
              <ATMLoadingButton
                onClick={(e) => {
                  e.stopPropagation();
                  setITRIdVerfiy(row._id || "");
                  setIsOpenReuploadDialog(true);
                }}
                className="py-0 rounded-full text-sky-600  bg-white hover:bg-sky-600 hover:text-white transition-all"
              >
                <div className="text-[12px] py-1 ">
                  Reupload Acknowledgement
                </div>
              </ATMLoadingButton>
            )}
          </div>
        );
      },
    },
    {
      field: "application_flow",
      headerName: "Application Flow",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: ITRListResponse) => {
        return (
          <div className="flex flex-col gap-2 py-2">
            <ATMLoadingButton
              onClick={(e) => {
                e.stopPropagation();
                setIsShowFlowDialog(true);
                handleFolwData(row?._id);
              }}
              isLoading={
                flowDataInfo?.originalArgs === row?._id
                  ? flowDataInfo?.isLoading
                  : false
              }
              loadingText="flow"
            >
              flow
            </ATMLoadingButton>
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
      orderBy: "appliedOnDate",
      orderByValue: -1,
      isPaginationRequired: !isAllExport,
    }).then((res: any) => {
      let formattedData = res?.data?.data?.map((data: ITRListResponse) => {
        return {
          ...data,
          createdAt: moment(data?.appliedOnDate).format("DD-MM-yyyy hh:mm A"),
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
      <TabHistoryApplicationITRListing
        columns={getColumns(columns, "ITR_APPLICATIONS")}
        rows={items}
        onExport={handleExport}
        isAllExporting={isAllExporting}
        isCurrentExporting={isCurrentExporting}
        isTableLoading={isTableLoading}
        exportDataHeaders={exportDataHeaders}
        exportData={dataToExport}
      />
      {isOpenReuploadDialog && (
        <ReuploadAcknowledgementDialogWrapper
          serviceName="ITR"
          onClose={() => setIsOpenReuploadDialog(false)}
          onSubmit={(formData,onComplete) => {
            reuploadAcknowledgment({
              id: ITRIdVerfiy || "",
              body: formData,
            }).then((res: any) => {
              onComplete()
              if (res?.error) {
                showToast("error", res?.error?.data?.message);
              } else {
                if (res?.data?.status) {
                  showToast("success", res?.data?.message);
                  setIsOpenReuploadDialog(false)
                } else {
                  showToast("error", res?.data?.message);
                }
              }
            });
          }}
        />
      )}
      {isShowFlowDialog && !flowDataInfo?.isLoading && 
        <HistoryDialog
          data={setFlowData}
          onClose={() => {
            setIsShowFlowDialog(false);
          }}
        />
      }
    </>
  );
};

export default TabHistoryApplicationITRListingWrapper;
