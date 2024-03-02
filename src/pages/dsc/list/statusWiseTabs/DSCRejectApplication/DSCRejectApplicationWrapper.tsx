import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import {
  resetState,
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/DSCApplication/DSCRejectApplicationSlice";
import { AppDispatch, RootState } from "src/redux/store";

import { formatDateAndTime } from "src/utils/dateAndTime";
import { DSCListResponse } from "src/models/DSC.model";
import DSCRejectApplication from "./DSCRejectApplication";
import {
  useChangeDSCStatusMutation,
  useGetDSCRejectApplicationsQuery,
} from "src/services/DSCService";
import { showConfirmationDialog } from "src/utils/showConfirmationDialog";
import { showToast } from "src/utils/toaster/showToast";
import { useNavigate } from "react-router-dom";
import { getColumns } from "src/utils/auth/getColumns";
import AuthHOC from "src/userAccess/AuthHOC";

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

const DSCRejectApplicationWrapper = () => {
  const navigate = useNavigate();

  const [changeStatus] = useChangeDSCStatusMutation();

  // Dispatch Hook
  const dispatch = useDispatch<AppDispatch>();

  // Slice
  const DSCRejectApplicationState: any = useSelector(
    (state: RootState) => state.DSCRejectApplication
  );
  const { items, searchValue, rowsPerPage, page, filterBy, dateFilter } =
    DSCRejectApplicationState;

  React.useEffect(() => {
    dispatch(resetState());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Get Data Query
  const { data, isFetching, isLoading } = useGetDSCRejectApplicationsQuery({
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
      renderCell: (row: DSCListResponse) => (
        <div className="py-2">
          <button
            type="button"
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
            className="bg-green-400 text-white rounded px-2 py-1 font-medium"
          >
            {" "}
            PENDING
          </button>
        </div>
      ),
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
      noAuthRequired: true,
      field: "assignedTo",
      headerName: "Assignee",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: DSCListResponse) => {
        return (
          <button type="button" className="text-primary-main py-[10px] ">
            {row?.assignedToName || "Not Assigned"}
          </button>
        );
      },
    },
  ];

  return (
    <>
      <DSCRejectApplication
        columns={getColumns(columns, "DSC_APPLICATIONS")}
        rows={items}
      />
    </>
  );
};

export default DSCRejectApplicationWrapper;
