import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/redux/store";
import { formatDateAndTime } from "src/utils/dateAndTime";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/TabHistoryGumastaApplicationSlice";
import { GumastaListResponse } from "src/models/Gumasta.model";
import {
  useChangeGumastaStatusMutation,
  useExportHistoryGumastaDataMutation,
  useGetGumastaQuery,
  useGetGumastaFlowDataMutation
} from "src/services/GumastaService";
import TabHistoryApplicationGumastaListing from "./TabHistoryApplicationGumastaListing";
import { applicationStatus } from "src/utils/history/applicationStatus";
import { BsCircleFill } from "react-icons/bs";
import moment from "moment";
import { getColumns } from "src/utils/auth/getColumns";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import ReuploadAcknowledgementDialogWrapper from "src/components/ReuploadAcknowledgementDialog/ReuploadAcknowledgementDialogWrapper";
import { showToast } from "src/utils/toaster/showToast";
import { useReuploadAcknowledgmentMutation } from "src/services/UserServices";
import AuthHOC from "src/userAccess/AuthHOC";
import { useNavigate } from "react-router-dom";
import { showConfirmationDialog } from "src/utils/showConfirmationDialog";
import HistoryDialog from "../../../Dialog/HistoryDialog";
import { Tooltip } from "@mui/material";

// Params List
const paramList = [
  "_id",
  "propritorName",
  "adhaarNumber",
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
  "appliedBy",
  "appliedAs",
  "txnId",
  "payementDetails",
  "srn",
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
  { label: "Propritor Name", key: "propritorName" },
  { label: "SRN", key: "srn" },
  { label: "Adhaar Number", key: "adhaarNumber" },
  { label: "Mobile Number", key: "mobileNumber" },
  { label: "Email", key: "email" },
  { label: "Firm Name ", key: "firmName" },
  { label: "Firm Address ", key: "firmAddress" },
  { label: "State", key: "state" },
  { label: "District", key: "district" },
  { label: "DstributorCode", key: "distributorCode" },
  { label: "TxnId", key: "txnId" },
  { label: "AcknowledgementNumber", key: "acknowledgementNumber" },
  { label: "Status", key: "status" },
  { label: "AcknowledgementNumber", key: "acknowledgementNumber" },
  {label:"Amount" , key :"applicationIndividualPrice"}
];

const TabHistoryApplicationGumastaListingWrapper = () => {
  const navigate = useNavigate();
  const [changeStatus] = useChangeGumastaStatusMutation();

  const dispatch = useDispatch<AppDispatch>();
  const [isAllExporting, setIsAllExporting] = useState(false);
  const [isCurrentExporting, setIsCurrentExporting] = useState(false);
  const [isShowFlowDialog, setIsShowFlowDialog] = useState(false);
  const [setFlowData, setSetFolwData] = useState<any>([]);
  const [dataToExport, setDataToExport] = useState([]);
  const [GumastaIdVerfiy, setGumastaIdVerfiy] = useState("");
  const [isOpenReuploadDialog, setIsOpenReuploadDialog] = useState(false);
  const [reuploadAcknowledgment] = useReuploadAcknowledgmentMutation();

  const gumastaState = useSelector(
    (state: RootState) => state.tabHistoryGumastaApplication
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
  const { data, isFetching, isLoading } = useGetGumastaQuery({
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
  const [exportData] = useExportHistoryGumastaDataMutation();
  const [flowData, flowDataInfo] = useGetGumastaFlowDataMutation()

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
      hidden: !AuthHOC({
        resultType: "BOOLEAN",
        forApplicationStatus: true,
        applicationName: "GUMASTA",
        applicationStatus: "PENDING",
      }),
      noAuthRequired: true,
      field: "",
      headerName: "Move To",
      flex: "flex-[1_1_0%]",
      renderCell: (row: GumastaListResponse) => {
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
                              navigate(`/gumasta/${row._id}`);
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
      renderCell: (row: GumastaListResponse) => (
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
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: GumastaListResponse) => {
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
      renderCell: (row: GumastaListResponse) => (
        <span> {row.propritorName} </span>
      ),
    },
    {
      field: "adhaarNumber",
      headerName: "Aadhar Number",
      flex: "flex-[1_1_0%]",
      renderCell: (row: GumastaListResponse) => (
        <span className="text-[13px] text-ellipsis overflow-hidden">
          {" "}
          {row.adhaarNumber}{" "}
        </span>
      ),
    },
    {
      field: "firmName",
      headerName: "Firm Name",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: GumastaListResponse) => {
        return (
          <span className="text-ellipsis overflow-hidden">{row.firmName}</span>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: GumastaListResponse) => {
        return (
          <span className="text-ellipsis overflow-hidden"> {row.email} </span>
        );
      },
    },
    {
      field: "mobileNumber",
      headerName: "Mobile",
      flex: "flex-[1_1_0%]",
      renderCell: (row: GumastaListResponse) => {
        return <span> {row.mobileNumber} </span>;
      },
    },

    {
      field: "state",
      headerName: "State",
      flex: "flex-[1_1_0%]",
      renderCell: (row: GumastaListResponse) => {
        return <span> {row.state} </span>;
      },
    },
    {
      field: "district",
      headerName: "District",
      flex: "flex-[1_1_0%]",
      renderCell: (row: GumastaListResponse) => {
        return <span> {row.district} </span>;
      },
    },
    // {
    //   field: "acknowledgementNumber",
    //   headerName: "Acknowledgement Number",
    //   flex: "flex-[1.5_1.5_0%]",
    //   renderCell: (row: GumastaListResponse) => {
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
      renderCell: (row: GumastaListResponse) => {
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
      renderCell: (row: GumastaListResponse) => {
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
      renderCell: (row: GumastaListResponse) => {
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
      renderCell: (row: GumastaListResponse) => {
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
            {(row.status === "VERIFY") && (
              <ATMLoadingButton
                onClick={(e) => {
                  e.stopPropagation();
                  setGumastaIdVerfiy(row._id || "");
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
      flex: "flex-[1.3_1.3_0%]",
      renderCell: (row: GumastaListResponse) => {
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
      let formattedData = res?.data?.data?.map((data: GumastaListResponse) => {
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
      <TabHistoryApplicationGumastaListing
        columns={getColumns(columns, "GUMASTA_APPLICATIONS")}
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
          serviceName="GUMASTA"
          onClose={() => setIsOpenReuploadDialog(false)}
          onSubmit={(formData, onComplete) => {
            reuploadAcknowledgment({
              id: GumastaIdVerfiy || "",
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

export default TabHistoryApplicationGumastaListingWrapper;
