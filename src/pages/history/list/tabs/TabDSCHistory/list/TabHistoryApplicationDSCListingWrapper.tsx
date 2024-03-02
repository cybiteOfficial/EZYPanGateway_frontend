import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/redux/store";
import { formatDateAndTime } from "src/utils/dateAndTime";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/TabHistoryDSCApplicationSlice";
import {
  useChangeDSCStatusMutation,
  useExportHistoryDSCDataMutation,
  useGetDscQuery,
  useGetDscFlowDataMutation
} from "src/services/DSCService";
import { DSCListResponse } from "src/models/DSC.model";
import TabHistoryApplicationDSCListing from "./TabHistoryApplicationDSCListing";
import { BsCircleFill } from "react-icons/bs";
import { applicationStatus } from "src/utils/history/applicationStatus";
import moment from "moment";
import { getColumns } from "src/utils/auth/getColumns";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import ReuploadAcknowledgementDialogWrapper from "src/components/ReuploadAcknowledgementDialog/ReuploadAcknowledgementDialogWrapper";
import { useReuploadAcknowledgmentMutation } from "src/services/UserServices";
import { showToast } from "src/utils/toaster/showToast";
import AuthHOC from "src/userAccess/AuthHOC";
import { showConfirmationDialog } from "src/utils/showConfirmationDialog";
import { useNavigate } from "react-router-dom";
import HistoryDialog from "../../../Dialog/HistoryDialog";
import { Tooltip } from "@mui/material";

// Params List
const paramList = [
  "_id",
  "propritorName",
  "email",
  "mobileNumber",
  "adhaarNumber",
  "address",
  "photoUrl",
  "adhaarCardPhotoUrl",
  "panCardPhotoUrl",
  "otherDocuments",
  "appliedBy",
  "appliedAs",
  "txnId",
  "payementDetails",
  "appliedFrom",
  "version",
  "srn",
  "status",
  "assignedTo",
  "assignedBy",
  "createdAt",
  "updatedAt",
];

const exportDataHeaders = [
  { label: "Date-Time", key: "appliedOnDate" },
  { label: "Proprietor Name", key: "propritorName" },
  { label: "Email", key: "email" },
  { label: "Adhaar Number", key: "adhaarNumber" },
  { label: "Mobile Number", key: "mobileNumber" },
  { label: "TXN Id", key: "txnId" },
  { label: "SRN", key: "srn" },
  { label: "Status", key: "status" },
  { label: "AcknowledgementNumber", key: "acknowledgementNumber" },
  {label:"Amount" , key :"applicationIndividualPrice"}
];

const TabHistoryApplicationDSCListingWrapper = () => {
  const navigate = useNavigate();
  const [changeStatus] = useChangeDSCStatusMutation();

  const dispatch = useDispatch<AppDispatch>();
  const [dscIdVerfiy, setDscIdVerfiy] = useState("");
  const [isOpenReuploadDialog, setIsOpenReuploadDialog] = useState(false);
  const [isShowFlowDialog, setIsShowFlowDialog] = useState(false);
  const [setFlowData, setSetFolwData] = useState<any>([]);
  const [reuploadAcknowledgment] = useReuploadAcknowledgmentMutation();
  const [isAllExporting, setIsAllExporting] = useState(false);
  const [isCurrentExporting, setIsCurrentExporting] = useState(false);
  const [dataToExport, setDataToExport] = useState([]);
  const dscState = useSelector(
    (state: RootState) => state.tabHistoryDSCApplication
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
  const [flowData, flowDataInfo] = useGetDscFlowDataMutation()

  // Fetching Applications
  const { data, isFetching, isLoading } = useGetDscQuery({
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

  const columns: columnTypes[] = [
    {
      hidden: !AuthHOC({
        resultType: "BOOLEAN",
        forApplicationStatus: true,
        applicationName: "DSC",
        applicationStatus: "PENDING",
      }),
      noAuthRequired: true,
      field: "",
      headerName: "Move To",
      flex: "flex-[1_1_0%]",
      renderCell: (row: DSCListResponse) => {
        return (
          <div>
            {row.status === "REJECT" ? (
              <button
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
                              navigate(`/dsc/${row._id}`);
                            } else {
                              showToast("error", res.data?.message);
                            }
                          }
                        });
                      }
                    },
                  });
                }}
              >
                Pending
              </button>
            ) : (
              <span>-</span>
            )}
          </div>
        );
      },
    },
    {
      field: "appliedOnDate",
      headerName: "Date - Time",
      noAuthRequired: true,
      flex: "flex-[1_1_0%]",
      renderCell: (row: DSCListResponse) => (
        <div>
          <div className="text-slate-700 font-medium">
            {formatDateAndTime(row.appliedOnDate, "DD MMM yyyy")}
          </div>
          <div className="text-[13px] font-medium text-slate-400">
            {formatDateAndTime(row.appliedOnDate, "hh:mm A")}
          </div>
        </div>
      ),
    },
    {
      field: "srn",
      headerName: "SRN",
      flex: "flex-[1_1_0%]",
      renderCell: (row: DSCListResponse) => {
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
      renderCell: (row: DSCListResponse) => (
        <span className="text-ellipsis overflow-hidden">
          {row.propritorName}
        </span>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: DSCListResponse) => {
        return (
          <span className="text-ellipsis overflow-hidden"> {row.email} </span>
        );
      },
    },
    {
      field: "mobileNumber",
      headerName: "Mobile",
      flex: "flex-[1_1_0%]",
      renderCell: (row: DSCListResponse) => {
        return <span> {row.mobileNumber} </span>;
      },
    },
    {
      field: "adhaarNumber",
      headerName: "Aadhar Number",
      flex: "flex-[1_1_0%]",
      renderCell: (row: DSCListResponse) => (
        <span className=" text-ellipsis overflow-hidden">
          {row.adhaarNumber}
        </span>
      ),
    },
    // {
    //   field: "acknowledgementNumber",
    //   headerName: "Acknowledgement Number",
    //   flex: "flex-[1_1_0%]",
    //   renderCell: (row: DSCListResponse) => {
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
      renderCell: (row: DSCListResponse) => {
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
      renderCell: (row: DSCListResponse) => {
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
      renderCell: (row: DSCListResponse) => {
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
      flex: "flex-[1_1_0%]",
      renderCell: (row: DSCListResponse) => {
        return (
          <div className="flex flex-col gap-2 py-2">
            <span
              className={`font-medium rounded-full flex gap-2 items-center bg-slate-100 px-2 py-1 text-[13px] mb-1 ${
                applicationStatus[row.status].className
              }`}
            >
              <BsCircleFill className="text-[10px]" />
              {applicationStatus[row.status].label || "N/A"}{" "}
            </span>
            {/* Reupload Acknowledge PDF */}
            {(row.status === "VERIFY") && (
              <ATMLoadingButton
                onClick={(e) => {
                  e.stopPropagation();
                  setDscIdVerfiy(row._id || "");
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
      flex: "flex-[1_1_0%]",
      renderCell: (row: DSCListResponse) => {
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
      let formattedData = res?.data?.data?.map((data: DSCListResponse) => {
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
      <TabHistoryApplicationDSCListing
        columns={getColumns(columns, "DSC_APPLICATIONS")}
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
          serviceName="DSC"
          onClose={() => setIsOpenReuploadDialog(false)}
          onSubmit={(formData, onComplete) => {
            reuploadAcknowledgment({
              id: dscIdVerfiy || "",
              body: formData,
            }).then((res: any) => {
              onComplete();
              if (res?.error) {
                showToast("error", res?.error?.data?.message);
              } else {
                if (res?.data?.status) {
                  showToast("success", res?.data?.message);
                  setIsOpenReuploadDialog(false);
                } else {
                  showToast("error", res?.data?.message);
                }
              }
            });
          }}
        />
      )}
       {isShowFlowDialog &&  !flowDataInfo?.isLoading && 
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

export default TabHistoryApplicationDSCListingWrapper;
