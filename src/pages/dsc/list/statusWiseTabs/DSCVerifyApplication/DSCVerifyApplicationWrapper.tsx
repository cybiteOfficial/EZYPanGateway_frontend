import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import {
  resetState,
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/DSCApplication/DSCVerifyApplicationSlice";
import { AppDispatch, RootState } from "src/redux/store";

import { formatDateAndTime } from "src/utils/dateAndTime";
import { DSCListResponse } from "src/models/DSC.model";
import ChangeAssigneeDialogWrapper from "../../Dialogs/ChangeAssigneeDialogWrapper";
import {
  useGetDSCVerifyApplicationsQuery,
} from "src/services/DSCService";
import DSCVerifyApplication from "./DSCVerifyApplication";
import { getColumns } from "src/utils/auth/getColumns";
import AuthHOC from "src/userAccess/AuthHOC";
import { AccessAction } from "src/utils/Enums/AccessAction";

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
  "appliedBy",
  "appliedAs",
  "txnId",
  "payementDetails",
  "appliedFrom",
  "version",
  "status",
  "assignedTo",
  "assignedBy",
  "createdAt",
  "updatedAt",
];

const DSCVerifyApplicationWrapper = () => {
  const [isOpenChangeAssigneeDialog, setIsOpenChangeAssigneeDialog] =
    useState(false);
  const [currentAssignee, setCurrentAssignee] = useState("");
  const [dscId, setDscId] = useState("");

  // Dispatch Hook
  const dispatch = useDispatch<AppDispatch>();

  // Slice
  const DSCVerifyApplicationState: any = useSelector(
    (state: RootState) => state.DSCVerifyApplication
  );
  const { items, searchValue, rowsPerPage, page, filterBy, dateFilter } =
    DSCVerifyApplicationState;

  React.useEffect(() => {
    dispatch(resetState());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Get Data Query
  const { data, isFetching, isLoading } = useGetDSCVerifyApplicationsQuery({
    limit: rowsPerPage,
    searchValue: searchValue,
    params: paramList,
    page: page,
    filterBy: filterBy,
    dateFilter: dateFilter,
    orderBy: "appliedOnDate",
    orderByValue: 1,
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
      field: "propritorName",
      headerName: "Propritor Name",
      flex: "flex-[1_1_0%]",
      renderCell: (row: DSCListResponse) => (
        <span className="text-ellipsis overflow-hidden">
          {" "}
          {row.propritorName}{" "}
        </span>
      ),
    },
    {
      field: "srn",
      headerName: "SRN",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: DSCListResponse) => {
        return (
          <span className="text-primary-main text-[13px] text-ellipsis overflow-hidden">
            {" "}
            {row.srn}{" "}
          </span>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      flex: "flex-[1_1_0%]",
      renderCell: (row: DSCListResponse) => {
        return (
          <span className="text-ellipsis overflow-hidden"> {row.email} </span>
        );
      },
    },
    {
      field: "mobileNumber",
      headerName: "Mobile",
      renderCell: (row: DSCListResponse) => <span> {row.mobileNumber} </span>,
      flex: "flex-[1_1_0%]",
    },
    {
      field: "adhaarNumber",
      headerName: "Aadhar Number",
      flex: "flex-[1_1_0%]",
      renderCell: (row: DSCListResponse) => <span> {row.adhaarNumber} </span>,
    },
    {
      hidden: !AuthHOC({
        type: "ACTION",
        moduleName: "DSC_APPLICATIONS",
        action: AccessAction.CHANGE_ASSIGNEE,
        resultType: "BOOLEAN",
      }),
      noAuthRequired: true,
      field: "assignedTo",
      headerName: "Assignee",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: DSCListResponse) => {
        return (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setDscId(row._id || " ");
              setCurrentAssignee(row.assignedToId);
              setIsOpenChangeAssigneeDialog(true);
            }}
            className={`text-primary-main py-[10px] ${"hover:underline"}`}
          >
            {row?.assignedToName || "Not Assigned"}
          </button>
        );
      },
    },
  ];

  return (
    <>
      <DSCVerifyApplication
        columns={getColumns(columns, "DSC_APPLICATIONS")}
        rows={items}
      />
      {isOpenChangeAssigneeDialog && (
        <ChangeAssigneeDialogWrapper
          onClose={() => setIsOpenChangeAssigneeDialog(false)}
          assignee={currentAssignee}
          applicationId={dscId}
        />
      )}
    </>
  );
};

export default DSCVerifyApplicationWrapper;
