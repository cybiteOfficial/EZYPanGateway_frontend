import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { RxPencil1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { DownLoadFormListResponse } from "src/models/DownLoadForm.model";
import { showConfirmationDialog } from "src/utils/showConfirmationDialog";
import ATMMenu from "src/components/UI/atoms/ATMMenu/ATMMenu";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import {
  useDeleteFormMutation,
  useGetAllFormQuery,
} from "src/services/DownloadFormService";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/DownLoadFormSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import { showToast } from "src/utils/toaster/showToast";
import DownLoadFormListing from "./DownLoadFormListing";
import { getColumns } from "src/utils/auth/getColumns";
import { AccessAction } from "src/utils/Enums/AccessAction";

const paramList = [
  "_id",
  "fileTitle",
  "fileUrl",
  "description",
  "isDeleted",
  "isActive",
  "createdAt",
  "updatedAt",
];

const DownLoadsFormWrapper = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const downloadForm: any = useSelector(
    (state: RootState) => state.downloadForm
  );
  const { items, page, rowsPerPage, searchValue } = downloadForm;

  const { data, isLoading, isFetching } = useGetAllFormQuery({
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
  // Delete Operation
  const [deleteForm] = useDeleteFormMutation();
  const handleDelete = (id: string) => {
    showConfirmationDialog({
      title: "Delete Confirmation",
      text: "Are you sure you want to delete",
      icon: "question",
      showCancelButton: true,
      next: (result) => {
        if (result.isConfirmed) {
          deleteForm(id).then((res: any) => {
            if (res.error) {
              showToast("error", res?.error?.data?.message);
            } else {
              if (res?.data?.status) {
                showToast("success", res?.data?.message);
              } else {
                showToast("error", res?.data?.message);
              }
            }
          });
        }
      },
    });
  };

  const getActionOptions = (row: DownLoadFormListResponse) => {
    return [
      {
        accessAction: AccessAction.EDIT,
        label: (
          <div className="flex gap-2 items-center text-secondary-main">
            <RxPencil1 className="text-lg" /> Edit
          </div>
        ),
        onClick: () => {
          navigate(`/download-form/${row._id}/edit`);
        },
      },
      {
        accessAction:AccessAction.DELETE,
        label: (
          <div className="flex gap-2 items-center text-red-600 font-semibold">
            <MdDeleteOutline className="text-lg" /> Delete
          </div>
        ),
        onClick: () => {
          handleDelete(row._id);
        },
      },
    ];
  };

  // Table Columns
  const columns: columnTypes[] = [
    {
      field: "fileTitle",
      headerName: "Field Title",
      flex: "flex-[1_1_0%]",
    },

    {
      field: "description",
      headerName: "Description",
      flex: "flex-[1_1_0%]",
    },
    {
      field: "fileUrl",
      headerName: "File Url",
      flex: "flex-[1_1_0%]",
      renderCell: (row: DownLoadFormListResponse) => (
        <a
          rel="noreferrer"
          href={row.fileUrl}
          target="_blank"
          className="hover:underline"
        >
          View
        </a>
      ),
    },
    {
      noAuthRequired: true,
      field: "action",
      headerName: "Action",
      renderCell: (row: DownLoadFormListResponse) => {
        const options = getActionOptions(row);

        return <ATMMenu moduleName="DOWNLOAD_FILES" options={options} />;
      },
    },
  ];
  return (
    <>
      <SideNavLayout>
        <DownLoadFormListing
          columns={getColumns(columns, "DOWNLOAD_FILES")}
          rows={items}
        />
      </SideNavLayout>
    </>
  );
};

export default DownLoadsFormWrapper;
