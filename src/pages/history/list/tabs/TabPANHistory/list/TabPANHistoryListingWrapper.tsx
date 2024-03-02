import Tooltip from "@mui/material/Tooltip";
import moment from "moment";
import React, { useState } from "react";
import { BsCircleFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { PANListResponse } from "src/models/PAN.model";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/TabHistoryPanApplicationSlice";
import { AppDispatch, RootState } from "src/redux/store";
import {
  useChangePANStatusMutation,
  useExportHistoryPanDataMutation,
  useGetPanQuery,
  useGetPanApplicationFlowMutation,
} from "src/services/PANService";
import { formatDateAndTime } from "src/utils/dateAndTime";
import { applicationStatus } from "src/utils/history/applicationStatus";
import TabHistoryApplicationPANListing from "./TabHistoryApplicationPANListing";
import { getColumns } from "src/utils/auth/getColumns";
import { useReuploadAcknowledgmentMutation } from "src/services/UserServices";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import ReuploadAcknowledgementDialogWrapper from "src/components/ReuploadAcknowledgementDialog/ReuploadAcknowledgementDialogWrapper";
import { showToast } from "src/utils/toaster/showToast";
import { showConfirmationDialog } from "src/utils/showConfirmationDialog";
import { useNavigate } from "react-router-dom";
import AuthHOC from "src/userAccess/AuthHOC";
import HistoryDialog from "../../../Dialog/HistoryDialog";

const paramList = [
  "category",
  "name",
  "email",
  "dob",
  "parentName",
  "adhaarNumber",
  "mobileNumber",
  "passportPhotoUrl",
  "signaturePhotoUrl",
  "panFormFrontPhotoUrl",
  "panFormBackPhotoUrl",
  "adhaarFrontPhotoUrl",
  "adhaarBackPhotoUrl",
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
  "otherDocuments",
  "assignedBy",
  "appliedById"
];
const exportDataHeaders = [
  { label: "Date-Time", key: "appliedOnDate" },
  { label: "SRN", key: "srn" },
  { label: "Name", key: "name" },
  { label: "Email", key: "email" },
  { label: "DOB", key: "dob" },
  { label: "Parent Name", key: "parentName" },
  { label: "Adhaar Number", key: "adhaarNumber" },
  { label: "Mobile Number", key: "mobileNumber" },
  { label: "AcknowledgementNumber", key: "acknowledgementNumber" },
  { label: "Category", key: "category" },
  { label: "TxnId", key: "txnId" },
  { label: "Payement Details", key: "payementDetails" },
  { label: "Pan Number", key: "panNumber" },
  { label: "Payment Category", key: "paymentCategory" },
  { label: "Status", key: "status" },
  { label: "DistributorCode", key: "distributorCode" },
  { label: "Comment", key: "comment" },
  {label:"Amount" , key :"applicationIndividualPrice"}
];

const TabHistoryApplicationPANListingWrapper = () => {
  const [PanIdVerfiy, setPanIdVerfiy] = useState("");
  const [changeStatus] = useChangePANStatusMutation();
  const navigate = useNavigate();

  const [isOpenReuploadDialog, setIsOpenReuploadDialog] = useState(false);
  const [isShowFlowDialog, setIsShowFlowDialog] = useState(false);
  const [setFlowData, setSetFolwData] = useState<any>([]);
  const [reuploadAcknowledgment] = useReuploadAcknowledgmentMutation();
  const dispatch = useDispatch<AppDispatch>();
  const [isAllExporting, setIsAllExporting] = useState(false);
  const [isCurrentExporting, setIsCurrentExporting] = useState(false);
  const [dataToExport, setDataToExport] = useState([]);
  const panApplicationState: any = useSelector(
    (state: RootState) => state.tabHistoryPanApplication
  );
  const {
    items,
    rowsPerPage,
    searchValue,
    page,
    filterBy,
    isTableLoading,
    dateFilter,
  } = panApplicationState;
  const [exportData] = useExportHistoryPanDataMutation();
  const [flowData, flowDataInfo] = useGetPanApplicationFlowMutation();
  const { data, isFetching, isLoading } = useGetPanQuery({
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
      hidden: !AuthHOC({
        resultType: "BOOLEAN",
        forApplicationStatus: true,
        applicationName: "PAN",
        applicationStatus: "PENDING",
      }),
      noAuthRequired: true,
      field: "",
      headerName: "Move To",
      flex: "flex-[1_1_0%]",
      renderCell: (row: PANListResponse) => {
        return (
          <div>
            {row.status === "REJECT" ? (
              <button
                className="bg-green-400 text-white rounded px-2 py-1 font-medium"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showConfirmationDialog({
                    title: "Heads Up",
                    text: "Are you sure want to move Application to Pending ?",
                    icon: "question",
                    showCancelButton: true,
                    next: (result: any) => {
                      if (result.isConfirmed) {
                        const formData = new FormData();
                        formData.append("requestedStatus", "PENDING");
                        changeStatus({ body: formData, id: row._id }).then(
                          (res: any) => {
                            if (res.error) {
                              showToast("error", res.error.data?.message);
                            } else {
                              if (res.data?.status) {
                                showToast("success", res.data?.message);
                                navigate(`/pan/${row._id}`);
                              } else {
                                showToast("error", res.data?.message);
                              }
                            }
                          }
                        );
                      }
                    },
                  });
                }}
              >
                Pending
              </button>
            ) : (
              <div>-</div>
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
      renderCell: (row: PANListResponse) => (
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
      renderCell: (row: PANListResponse) => {
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
      renderCell: (row: PANListResponse) => (
        <Tooltip title={row.name}>
          <span className="text-ellipsis overflow-hidden"> {row.name} </span>
        </Tooltip>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: PANListResponse) => {
        return (
          <Tooltip title={row.email}>
            <span className="text-ellipsis overflow-hidden"> {row.email} </span>
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
      renderCell: (row: PANListResponse) => {
        return <span> {row.distributorCode || "N/A"} </span>;
      },
    },
    {
      field: "appliedByNumber",
      headerName: "Applied By (Mob. No.)",
      flex: "flex-[1_1_0%]",
      renderCell: (row: PANListResponse) => {
        return <span> {row.appliedByNumber || "N/A"} </span>;
      },
    },
    {
      field: "acknowledgementNumber",
      headerName: "Acknowledgement Number",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: PANListResponse) => {
        return (
          <Tooltip title={row.acknowledgementNumber}>
            <span className="text-primary-main text-[13px] text-ellipsis overflow-hidden">
               {row.acknowledgementNumber || "-"}
            </span>
          </Tooltip>
        );
      },
    },
    {
      field: "applicationIndividualPrice",
      headerName: "Amount",
      flex: "flex-[1_1_0%]",
      renderCell: (row: PANListResponse) => {
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
      renderCell: (row: PANListResponse) => {
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
      renderCell: (row: PANListResponse) => {
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
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: PANListResponse) => {
        return (
          <div className="flex flex-col gap-2 py-2">
            <span
              className={`font-medium rounded-full flex gap-2 items-center bg-slate-100 px-2 py-1 text-[13px]  ${
                applicationStatus?.[row.status]?.className
              }`}
            >
              <BsCircleFill className="text-[10px]" />
              {applicationStatus[row.status]?.label || "N/A"}{" "}
            </span>
            {(row?.status !== "REJECT" && row?.status !== "PENDING" && row?.status !== "CANCELLED" &&  row?.status !== "IN_PROGRESS"  ) && (
              <ATMLoadingButton
                onClick={(e) => {
                  e.stopPropagation();
                  setPanIdVerfiy(row._id || "");
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
      renderCell: (row: PANListResponse) => {
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
      let formattedData = res?.data?.data?.map((data: PANListResponse) => {
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
      <TabHistoryApplicationPANListing
        columns={getColumns(columns, "PAN_APPLICATIONS")}
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
          serviceName="PAN"
          onClose={() => setIsOpenReuploadDialog(false)}
          onSubmit={(formData, onComplete) => {
            reuploadAcknowledgment({
              id: PanIdVerfiy || "",
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

export default TabHistoryApplicationPANListingWrapper;
