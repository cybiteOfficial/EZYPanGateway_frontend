import React from "react";
import { useNavigate } from "react-router-dom";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { MSMEListResponse } from "src/models/MSME.model";
import MSMEPendingApplication from "./MSMEPendingApplication";
import { showToast } from "src/utils/toaster/showToast";
import { showConfirmationDialog } from "src/utils/showConfirmationDialog";
import {
  useChangeMSMEStatusMutation,
  useGetMSMEPendingApplicationsQuery,
} from "src/services/MSMEService";
import { AppDispatch, RootState } from "src/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/MSMEApplication/MSMEPendingApplicationSlice";
import { formatDateAndTime } from "src/utils/dateAndTime";
import { getColumns } from "src/utils/auth/getColumns";
import AuthHOC from "src/userAccess/AuthHOC";


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

const MSMEPendingApplicationWrapper = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  // Slice
  const MSMEPendingApplicationState: any = useSelector(
    (state: RootState) => state.MSMEPendingApplication
  );
  const { page, rowsPerPage, items, searchValue, filterBy } =
    MSMEPendingApplicationState;
  const [changeStatus] = useChangeMSMEStatusMutation();
  // Get Data Query
  const { data, isFetching, isLoading } = useGetMSMEPendingApplicationsQuery({
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
      hidden :!AuthHOC({
        resultType :"BOOLEAN",
        forApplicationStatus :true,
        applicationName :"MSME",
        applicationStatus :"IN_PROGRESS"
      }),
      noAuthRequired: true,    
      field: "",
      headerName: "Move To",
      flex: "flex-[1_1_0%]",
      renderCell: (row: MSMEListResponse) => (
        <div className="py-2">
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
                          navigate(`/msme/${row._id}`);
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
  ];

  return (
    <>
      <MSMEPendingApplication
        columns={getColumns(columns, "MSME_APPLICATIONS")}
        rows={items}
      />
    </>
  );
};

export default MSMEPendingApplicationWrapper;
