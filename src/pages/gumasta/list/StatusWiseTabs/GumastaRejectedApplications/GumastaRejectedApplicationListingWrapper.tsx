import React from "react";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { GumastaListResponse } from "src/models/Gumasta.model";
import { useNavigate } from "react-router-dom";
import GumastaRejectedApplicationListing from "./GumastaRejectedApplicationListing";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/redux/store";
import {
  useChangeGumastaStatusMutation,
  useGetGumastaRejectedApplicationsQuery,
} from "src/services/GumastaService";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/GumastaApplication/GumastaRejectedApplicationSlice";
import { showConfirmationDialog } from "src/utils/showConfirmationDialog";
import { showToast } from "src/utils/toaster/showToast";
import { formatDateAndTime } from "src/utils/dateAndTime";
import { getColumns } from "src/utils/auth/getColumns";
import AuthHOC from "src/userAccess/AuthHOC";


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

const GumastaRejectedApplicationListingWrapper = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  // Slice
  const GumastaRejectedApplicationState: any = useSelector(
    (state: RootState) => state.GumastaRejectedApplication
  );
  const { page, rowsPerPage, items, searchValue, filterBy } =
    GumastaRejectedApplicationState;
  const [changeStatus] = useChangeGumastaStatusMutation();

  // Get Data Query
  const { data, isFetching, isLoading } =
    useGetGumastaRejectedApplicationsQuery({
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

  // Setting Retailer data
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
        forApplicationStatus:true,
        applicationName:"GUMASTA",
        applicationStatus:"PENDING"
      }),
      noAuthRequired: true,
      field: "",
      headerName: "Move To",
      flex: "flex-[1_1_0%]",
      renderCell: (row: GumastaListResponse) => (
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
            {" "}
            {row.srn}{" "}
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
        <span> {row.adhaarNumber} </span>
      ),
    },
    {
      field: "firmName",
      headerName: "Firm Name",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: GumastaListResponse) => {
        return <span> {row.firmName} </span>;
      },
    },
    {
      field: "email",
      headerName: "Email",
      flex: "flex-[1_1_0%]",
      renderCell: (row: GumastaListResponse) => {
        return <span> {row.email} </span>;
      },
    },
    {
      field: "mobileNumber",
      headerName: "Mobile",
      flex: "flex-[1_1_0%]",
    },

    {
      field: "state",
      headerName: "State",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: GumastaListResponse) => {
        return <span> {row.state} </span>;
      },
    },
    {
      field: "district",
      headerName: "District",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: GumastaListResponse) => {
        return <span> {row.district} </span>;
      },
    },
    {
      noAuthRequired : true,
      field: "assignedTo",
      headerName: "Assignee",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: GumastaListResponse) => {
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
      <GumastaRejectedApplicationListing
        columns={getColumns(columns, "GUMASTA_APPLICATIONS")}
        rows={items}
      />
    </>
  );
};

export default GumastaRejectedApplicationListingWrapper;
