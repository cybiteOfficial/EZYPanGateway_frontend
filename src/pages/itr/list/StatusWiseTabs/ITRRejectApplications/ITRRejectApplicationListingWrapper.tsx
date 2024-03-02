import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { ITRListResponse } from "src/models/ITR.model";
import {
  resetState,
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/ITRApplication/ITRRejectedApplicationSlice";
import { AppDispatch, RootState } from "src/redux/store";
import {
  useChangeITRStatusMutation,
  useGetItrRejectedApplicationsQuery,
} from "src/services/ITRApplicationServices";
import { formatDateAndTime } from "src/utils/dateAndTime";
import ITRRejectApplicationListing from "./ITRRejectApplicationListing";
import { showConfirmationDialog } from "src/utils/showConfirmationDialog";
import { showToast } from "src/utils/toaster/showToast";
import { useNavigate } from "react-router-dom";
import { getColumns } from "src/utils/auth/getColumns";
import AuthHOC from "src/userAccess/AuthHOC";

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
  "txnId",
  "srn",
  "paymentCategory",
  "appliedFrom",
  "version",
  "acknowledgementNumber",
  "status",
  "appliedByNumber",
  "createdAt",
  "updatedAt",
];

const ITRRejectApplicationListingWrapper = () => {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();
  const [changeStatus] = useChangeITRStatusMutation();
  // Slice
  const ITRRejectedApplicationState: any = useSelector(
    (state: RootState) => state.ITRRejectedApplication
  );
  const { items, searchValue, rowsPerPage, page, filterBy, dateFilter } =
    ITRRejectedApplicationState;

  React.useEffect(() => {
    dispatch(resetState());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Get Data Query
  const { data, isFetching, isLoading } = useGetItrRejectedApplicationsQuery({
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
      renderCell: (row: ITRListResponse) => (
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
      renderCell: (row: ITRListResponse) => (
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
      renderCell: (row: ITRListResponse) => {
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
      renderCell: (row: ITRListResponse) => (
        <span className="text-ellipsis overflow-hidden">
          {" "}
          {`${row.firstName} ${row.middleName} ${row.lastName}`}{" "}
        </span>
      ),
    },
    {
      field: "emailId",
      headerName: "Email",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: ITRListResponse) => {
        return (
          <span className="text-ellipsis overflow-hidden"> {row.emailId} </span>
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
      renderCell: (row: ITRListResponse) => {
        return <span> {row.distributorCode || "N/A"} </span>;
      },
    },
    {
      noAuthRequired : true, 
      field: "assignedTo",
      headerName: "Assignee",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: ITRListResponse) => {
        return (
          <button
            type="button"
            className= "text-primary-main py-[10px]"
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
      renderCell: (row: ITRListResponse) => {
        return <span> {row.appliedByNumber || "N/A"} </span>;
      },
    },
    {
      field: "totalPrice",
      headerName: "Amount",
      flex: "flex-[1_1_0%]",
      renderCell: (row: ITRListResponse) => (
        <span>{row?.applicationIndividualPrice || "N/A"}</span>
      ),
    },
  ];

  return (
    <>
      <ITRRejectApplicationListing columns={getColumns(columns, "ITR_APPLICATIONS")} rows={items} />
     
    </>
  );
};

export default ITRRejectApplicationListingWrapper;
