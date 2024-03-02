import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { RxPencil1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import ATMMenu from "src/components/UI/atoms/ATMMenu/ATMMenu";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { RejectionListResponse } from "src/models/RejectionList.model";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/RejectionListSlice";
import { AppDispatch, RootState } from "src/redux/store";
import {
  useDeleteRejectionListByIdMutation,
  useGetRejectionListQuery,
} from "src/services/RejectionListService";
import { showConfirmationDialog } from "src/utils/showConfirmationDialog";
import { showToast } from "src/utils/toaster/showToast";
import RejectionListing from "./RejectionListing";
import { getColumns } from "src/utils/auth/getColumns";
import { AccessAction } from "src/utils/Enums/AccessAction";

const paramList = ["_id", "isDeleted", "isActive", "createdAt", "updatedAt"];

const RejectionListingWrapper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const rejectionListState: any = useSelector(
    (state: RootState) => state.rejectionList
  );
  const { items, rowsPerPage, page, searchValue } = rejectionListState;

  const navigate = useNavigate();
  const [deleteRejectionList] = useDeleteRejectionListByIdMutation();
  const getActionOptions = (row: RejectionListResponse) => {
    return [
      {
        accessAction: AccessAction.EDIT,
        label: (
          <div className="flex gap-2 items-center text-secondary-main">
            <RxPencil1 className="text-lg" /> Edit
          </div>
        ),
        onClick: () => {
          navigate(`/rejection-list/${row._id}/edit`);
        },
      },
      {
        accessAction: AccessAction.DELETE,
        label: (
          <div className="flex gap-2 items-center text-red-600 font-semibold">
            <MdDeleteOutline className="text-lg" /> Delete
          </div>
        ),
        onClick: () => {
          showConfirmationDialog({
            title: "Heads Up",
            text: "Are you sure want to Delete this Rejection Reason ?",
            icon: "question",
            showCancelButton: true,
            next: (result) => {
              if (result.isConfirmed) {
                deleteRejectionList(row._id).then((res: any) => {
                  if (res.error) {
                    showToast("error", res?.error?.data?.message);
                  } else {
                    showToast("success", res?.data?.message);
                  }
                });
              }
            },
          });
        },
      },
    ];
  };
  const { data, isLoading, isFetching } = useGetRejectionListQuery({
    limit: rowsPerPage,
    searchValue: searchValue,
    params: paramList,
    page: page,
    filterBy: [
      {
        fieldName: "",
        value: [],
      },
    ],
    dateFilter: {
      start_date: "",
      end_date: "",
      dateFilterKey: "",
    },
    orderBy: "createdAt",
    orderByValue: -1,
    isPaginationRequired: true,
  });

  // Setting Items
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
      field: "rejectionMsg",
      headerName: "Rejection Message",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: RejectionListResponse) => (
        <span> {row.rejectionMsg} </span>
      ),
    },
    {
      noAuthRequired: true,
      field: "action",
      headerName: "Action",
      flex: "flex-[1_1_0%]",
      renderCell: (row: RejectionListResponse) => {
        const options = getActionOptions(row);
        return <ATMMenu moduleName="REJECTION_LISTS" options={options} />;
      },
    },
  ];

  return (
    <>
      <SideNavLayout>
        <RejectionListing
          columns={getColumns(columns, "REJECTION_LISTS")}
          rows={items}
        />
      </SideNavLayout>
    </>
  );
};

export default RejectionListingWrapper;
