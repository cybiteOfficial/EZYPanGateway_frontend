import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { PANListResponse } from "src/models/PAN.model";
import {
  resetState,
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/PANApplication/PANPendingApplicationSlice";
import { AppDispatch, RootState } from "src/redux/store";
import {
  useChangePANStatusMutation,
  useGetPanPendingApplicationsQuery,
} from "src/services/PANService";
import { formatDateAndTime } from "src/utils/dateAndTime";
import { showConfirmationDialog } from "src/utils/showConfirmationDialog";
import { showToast } from "src/utils/toaster/showToast";
import PANPendingApplicationListing from "./PANPendingApplicationListing";
import { getColumns } from "src/utils/auth/getColumns";
import AuthHOC from "src/userAccess/AuthHOC";

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

const PANPendingApplicationListingWrapper = () => {
  const navigate = useNavigate();
  // Dispatch Hook
  const dispatch = useDispatch<AppDispatch>();

  // Slice
  const PANPendingApplicationState: any = useSelector(
    (state: RootState) => state.PANPendingApplication
  );
  const { items, searchValue, rowsPerPage, page, filterBy, dateFilter , orderByValue } =
    PANPendingApplicationState;
  const [changeStatus] = useChangePANStatusMutation();
  React.useEffect(() => {
    dispatch(resetState());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Get Data Query
  const { data, isFetching, isLoading } = useGetPanPendingApplicationsQuery({
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
      hidden:!AuthHOC({
        resultType:"BOOLEAN",
        forApplicationStatus :true,
        applicationName :"PAN",
        applicationStatus :"IN_PROGRESS",
      }),
      field: "",
      noAuthRequired:true,
      headerName: "Move To",
      flex: "flex-[1_1_0%]",
      renderCell: (row: PANListResponse) => (
        <div className={"py-2"}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showConfirmationDialog({
                title: "Heads Up",
                text: "Are you sure want to move Application to In Progress ?",
                icon: "question",
                showCancelButton: true,
                next: (result) => {
                  if (result.isConfirmed) {
                    const formData = new FormData();
                    formData.append("requestedStatus", "IN_PROGRESS");

                    changeStatus({
                      id: row._id,
                      body: formData,
                    }).then((res: any) => {
                      if (res.error) {
                        showToast("error", res.error.data?.message);
                      } else {
                        if (res.data?.status) {
                          showToast("success", res.data?.message);
                          navigate(`/pan/PENDING`);
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
            In Progress
          </button>
        </div>
      ),
    },

    {
      field: "appliedOnDate", 
      noAuthRequired: true,
      headerName: "Date - Time",
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
      noAuthRequired: true,
      field: "distributorCode",
      headerName: "SJBT  Code",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: PANListResponse) => {
        return <span> {row.distributorCode || "N/A"} </span>;
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
      <PANPendingApplicationListing
        columns={getColumns(columns, "PAN_APPLICATIONS")}
        rows={items}
      />
    </>
  );
};

export default PANPendingApplicationListingWrapper;
