import React, { useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { RxPencil1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { StaticPagesListResponse } from "src/models/StaticPages.model";
import { showConfirmationDialog } from "src/utils/showConfirmationDialog";
import ATMMenu from "src/components/UI/atoms/ATMMenu/ATMMenu";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";

import {
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/StaticPagesSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import { showToast } from "src/utils/toaster/showToast";
import StaticPageListing from "./StaticPagesListing";
import {
  useDeleteStaticPageMutation,
  useGetAllStaticPagesQuery,
} from "src/services/StaticPagesService";
import StaticPageDialogWrapper from "./StaticPageDialogWrapper";
import { getColumns } from "src/utils/auth/getColumns";
import { AccessAction } from "src/utils/Enums/AccessAction";

const paramList = [
  "_id",
  "name",
  "pageContent",
  "url",
  "isDeleted",
  "isActive",
  "createdAt",
  "updatedAt",
];

const StaicPagesWrapper = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const statePagesState: any = useSelector(
    (state: RootState) => state.staticPages
  );
  const [isopenDialog, setIsOpenDialog] = useState(false);
  const [pageContent, setPageContent] = useState("");
  const { items, rowsPerPage, searchValue, page } = statePagesState;
  const { data, isLoading, isFetching } = useGetAllStaticPagesQuery({
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
  const [deleteStaticPage] = useDeleteStaticPageMutation();

  const handleDelete = (id: string) => {
    showConfirmationDialog({
      title: "Delete Confirmation",
      text: "Are you sure you want to delete",
      icon: "question",
      showCancelButton: true,
      next: (result) => {
        if (result.isConfirmed) {
          deleteStaticPage(id).then((res: any) => {
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

  const getActionOptions = (row: StaticPagesListResponse) => {
    return [
      {
        accessAction: AccessAction.EDIT,
        label: (
          <div className="flex gap-2 items-center text-secondary-main">
            <RxPencil1 className="text-lg" /> Edit
          </div>
        ),
        onClick: () => {
          navigate(`/static-page/${row.url}/edit`);
        },
      },
      {
        accessAction: AccessAction.DELETE,

        label: (
          <div className="flex gap-2 items-center text-red-600 font-semibold">
            <MdOutlineDeleteOutline className="text-lg" /> Delete
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
      field: "name",
      headerName: "Name",
      flex: "flex-[1_1_0%]",
    },
    {
      field: "pageContent",
      headerName: "Page Content",
      flex: "flex-[1_1_0%]",
      renderCell: (row: StaticPagesListResponse) => {
        return (
          <button
            onClick={() => {
              setIsOpenDialog(true);
              setPageContent(row.pageContent);
            }}
          >
            View
          </button>
        );
      },
    },
    {
      field: "url",
      headerName: "URL",
      flex: "flex-[1_1_0%]",
    },

    {
      noAuthRequired: true,
      field: "action",
      headerName: "Action",
      renderCell: (row: StaticPagesListResponse) => {
        const options = getActionOptions(row);
        return <ATMMenu moduleName="STATIC_PAGES" options={options} />;
      },
    },
  ];

  return (
    <>
      <SideNavLayout>
        <StaticPageListing
          columns={getColumns(columns, "STATIC_PAGES")}
          rows={items}
        />
      </SideNavLayout>
      {isopenDialog && (
        <StaticPageDialogWrapper
          onClose={() => setIsOpenDialog(false)}
          pageContent={pageContent}
        />
      )}
    </>
  );
};

export default StaicPagesWrapper;
