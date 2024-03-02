import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { PANListResponse } from "src/models/PAN.model";
import {
  resetState,
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/PANApplication/PANGenerateApplicationSlice";
import { AppDispatch, RootState } from "src/redux/store";
import { useGetPanGenerateApplicationsQuery } from "src/services/PANService";
import { formatDateAndTime } from "src/utils/dateAndTime";
import PANGenerateApplicationListing from "./PANGenerateApplicationListing";
import ChangeAssigneeDialogWrapper from "../../Dialogs/ChangeAssigneeDialogWrapper";
import { getColumns } from "src/utils/auth/getColumns";
import AuthHOC from "src/userAccess/AuthHOC";
import { AccessAction } from "src/utils/Enums/AccessAction";

const paramList = [
  "category",
  "name",
  "email",
  "dob",
  "adhaarNumber",
  "mobileNumber",
  "passportPhotoUrl",
  "signaturePhotoUrl",
  "panFormFrontPhotoUrl",
  "panFormBackPhotoUrl",
  "adhaarFrontPhotoUrl",
  "adhaarBackPhotoUrl",
  "otherDocuments",
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
  "assignedBy",
];

const PANGenerateApplicationListingWrapper = () => {
  // Dispatch Hook
  const dispatch = useDispatch<AppDispatch>();
  const [panId, setPANId] = useState("");
  const [currentAssignee, setCurrentAssignee] = useState("");
  const [isOpenChangeAssigneeDialog, setIsOpenChangeAssigneeDialog] =
    useState(false);
  // Slice
  const PANGenerateApplicationState: any = useSelector(
    (state: RootState) => state.PANGenerateApplication
  );
  const { items, searchValue, rowsPerPage, page, filterBy, dateFilter, orderByValue } =
    PANGenerateApplicationState;

  React.useEffect(() => {
    dispatch(resetState());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Get Data Query
  const { data, isFetching, isLoading } = useGetPanGenerateApplicationsQuery({
    limit: rowsPerPage,
    searchValue: searchValue,
    params: paramList,
    page: page,
    filterBy: filterBy,
    dateFilter: dateFilter,
    orderBy: "appliedOnDate",
    orderByValue: orderByValue,
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

  const columns: columnTypes[] = [
    {
      field: "appliedOnDate",
      headerName: "Date - Time",
      noAuthRequired: true,
      flex: "flex-[1_1_0%]",
      renderCell: (row: PANListResponse) => (
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
      renderCell: (row: PANListResponse) => {
        return (
          <span className="text-primary-main text-[13px] text-ellipsis overflow-hidden">
            {" "}
            {row.srn}{" "}
          </span>
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      flex: "flex-[1_1_0%]",
      renderCell: (row: PANListResponse) => (
        <span className="text-ellipsis overflow-hidden"> {row.name} </span>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: PANListResponse) => {
        return (
          <span className="text-ellipsis overflow-hidden">
            {" "}
            {row.email || "N/A"}{" "}
          </span>
        );
      },
    },
    {
      field: "mobileNumber",
      headerName: "Mobile",
      flex: "flex-[1_1_0%]",
    },
    {
      noAuthRequired : true,
      field: "distributorCode",
      headerName: "SJBT  Code",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: PANListResponse) => {
        return <span> {row.distributorCode || "N/A"} </span>;
      },
    },
    {
      noAuthRequired: true,
      field: "assignedTo",
      headerName: "Assignee",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: PANListResponse) => {
        return (
          <button
            type="button"
            disabled = {!AuthHOC({
              moduleName : "PAN_APPLICATIONS",
              action : AccessAction.CHANGE_ASSIGNEE,
              resultType : "BOOLEAN"
            })}
            onClick={(e) => {
              e.stopPropagation();
              setPANId(row._id || " ");
              setCurrentAssignee(row.assignedToId);
              setIsOpenChangeAssigneeDialog(true);
            }}
            className={`text-primary-main py-[10px] ${AuthHOC({
              moduleName : "PAN_APPLICATIONS",
              action : AccessAction.CHANGE_ASSIGNEE,
              resultType : "BOOLEAN"
            }) && "hover:underline"}`}
          >
            {row?.assignedToName || "Not Assigned"}
          </button>
        );
      },
    },
    {
      field: "appliedByNumber",
      headerName: "Applied By (Mob. No.)",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: PANListResponse) => {
        return <span> {row.appliedByNumber || "N/A"} </span>;
      },
    },
  ];

  return (
    <>
      <PANGenerateApplicationListing
        columns={getColumns(columns, "PAN_APPLICATIONS")}
        rows={items}
      />
      {isOpenChangeAssigneeDialog && (
        <ChangeAssigneeDialogWrapper
          onClose={() => setIsOpenChangeAssigneeDialog(false)}
          assignee={currentAssignee}
          applicationId={panId}
        />
      )}
    </>
  );
};

export default PANGenerateApplicationListingWrapper;
