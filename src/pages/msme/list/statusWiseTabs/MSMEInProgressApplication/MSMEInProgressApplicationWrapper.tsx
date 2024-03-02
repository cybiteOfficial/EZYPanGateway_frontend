import React, { useState } from "react";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { MSMEListResponse } from "src/models/MSME.model";
import MSMEInProgressApplication from "./MSMEInProgressApplication";
import { useGetMSMEInProgressApplicationsQuery } from "src/services/MSMEService";
import { AppDispatch, RootState } from "src/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/MSMEApplication/MSMEInProgressApplicationSlice";
import { formatDateAndTime } from "src/utils/dateAndTime";
import ChangeAssigneeDialogWrapper from "../../Dialogs/ChangeAssigneeDialogWrapper";
import { getColumns } from "src/utils/auth/getColumns";
import AuthHOC from "src/userAccess/AuthHOC";
import { AccessAction } from "src/utils/Enums/AccessAction";

const paramList = [
  "_id",
  "propritorName",
  "adhaarNumber",
  "firmName",
  "address",
  "srn",
  "email",
  "mobileNumber",
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

const MSMEInProgressApplicationWrapper = () => {
  const dispatch = useDispatch<AppDispatch>();
  // Slice
  const MSMEInProgressApplicationState: any = useSelector(
    (state: RootState) => state.MSMEInProgressApplication
  );
  const { page, rowsPerPage, items, searchValue, filterBy } =
    MSMEInProgressApplicationState;
  const [msmeId, setMSMEId] = useState("");
  const [currentAssignee, setCurrentAssignee] = useState("");
  const [isOpenChangeAssigneeDialog, setIsOpenChangeAssigneeDialog] =
    useState(false); // Get Data Query
  const { data, isFetching, isLoading } = useGetMSMEInProgressApplicationsQuery(
    {
      limit: rowsPerPage,
      searchValue: searchValue,
      params: paramList,
      page: page,
      filterBy: filterBy,
      dateFilter: {
        start_date: "",
        end_date: "",
        dateFilterKey: "",
      },
      orderBy: "appliedOnDate",
      orderByValue: 1,
      isPaginationRequired: true,
    }
  );

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
      renderCell: (row: MSMEListResponse) => (
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
      renderCell: (row: MSMEListResponse) => {
        return (
          <span className="text-primary-main text-[13px] text-ellipsis overflow-hidden">
            {" "}
            {row.srn}{" "}
          </span>
        );
      },
    },
    {
      field: "propritorName",
      headerName: "Propritor Name",
      flex: "flex-[1_1_0%]",
      renderCell: (row: MSMEListResponse) => {
        return (
          <span className="text-ellipsis overflow-hidden">
            {" "}
            {row.propritorName}{" "}
          </span>
        );
      },
    },
    {
      field: "firmName",
      headerName: "Firm Name",
      flex: "flex-[1_1_0%]",
      renderCell: (row: MSMEListResponse) => {
        return (
          <span className="text-ellipsis overflow-hidden">
            {" "}
            {row.firmName}{" "}
          </span>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: MSMEListResponse) => {
        return (
          <span className="text-ellipsis overflow-hidden"> {row.email} </span>
        );
      },
    },
    {
      field: "mobileNumber",
      headerName: "Mobile",
      flex: "flex-[1_1_0%]",
    },
    {
      field: "adhaarNumber",
      headerName: "Aadhar Number",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: MSMEListResponse) => {
        return <span> {row.adhaarNumber} </span>;
      },
    },
    {
      noAuthRequired: true,
      field: "assignedTo",
      headerName: "Assignee",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: MSMEListResponse) => {
        return (
          <button
            type="button"
            disabled={
              !AuthHOC({
                moduleName: "MSME_APPLICATIONS",
                action: AccessAction.CHANGE_ASSIGNEE,
                resultType: "BOOLEAN",
              })
            }
            onClick={(e) => {
              e.stopPropagation();
              setMSMEId(row._id || " ");
              setCurrentAssignee(row.assignedToId);
              setIsOpenChangeAssigneeDialog(true);
            }}
            className={`text-primary-main py-[10px]  ${
              AuthHOC({
                moduleName: "MSME_APPLICATIONS",
                action: AccessAction.CHANGE_ASSIGNEE,
                resultType: "BOOLEAN",
              }) && "hover:underline"
            }`}
          >
            {row.assignedToName || "Not Assigned"}
          </button>
        );
      },
    },
  ];

  return (
    <>
      <MSMEInProgressApplication
        columns={getColumns(columns, "MSME_APPLICATIONS")}
        rows={items}
      />
      {isOpenChangeAssigneeDialog && (
        <ChangeAssigneeDialogWrapper
          onClose={() => setIsOpenChangeAssigneeDialog(false)}
          assignee={currentAssignee}
          applicationId={msmeId}
        />
      )}
    </>
  );
};

export default MSMEInProgressApplicationWrapper;
