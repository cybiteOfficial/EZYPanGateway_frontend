import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import { useDispatch, useSelector } from "react-redux";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { AppVideoListResponse } from "src/models/AppVideo.model";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/AppVideoSlice";
import { AppDispatch, RootState } from "src/redux/store";
import {
  useDeleteAppVideoByIdMutation,
  useGetAppVideoQuery,
  useUpdateShowOnMobileAppVideoMutation,
} from "src/services/VideoService";
import TabAppVideoList from "./TabAppVideoList";
import { showToast } from "src/utils/toaster/showToast";
import { showConfirmationDialog } from "src/utils/showConfirmationDialog";
import ATMMenu from "src/components/UI/atoms/ATMMenu/ATMMenu";
import { useNavigate } from "react-router-dom";
import { RxPencil1 } from "react-icons/rx";
import { MdDeleteOutline } from "react-icons/md";
import { getColumns } from "src/utils/auth/getColumns";
import { AccessAction } from "src/utils/Enums/AccessAction";

const paramList = [
  "_id",
  "videoLink",
  "showOnMobile",
  "order",
  "isDeleted",
  "isActive",
  "createdAt",
  "updatedAt",
];

const TabAppVideoListWrapper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const appVideoState: any = useSelector((state: RootState) => state.appVideo);

  const { items, rowsPerPage, page, searchValue } = appVideoState;

  const [deleteBanner] = useDeleteAppVideoByIdMutation();
  const navigate = useNavigate();

  const getActionOptions = (row: AppVideoListResponse) => {
    return [
      {
        accessAction: AccessAction.EDIT,
        label: (
          <div className="flex gap-2 items-center text-secondary-main">
            <RxPencil1 className="text-lg" /> Edit
          </div>
        ),
        onClick: () => {
          navigate(`/videos/app-videos/${row._id}/edit`);
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
            text: "Are you sure want to Delete this App Video ?",
            icon: "question",
            showCancelButton: true,
            next: (result) => {
              if (result.isConfirmed) {
                deleteBanner(row._id).then((res: any) => {
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

  const { data, isLoading, isFetching } = useGetAppVideoQuery({
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

  const [statusUpdate, setStatusUpdate] = useState(false);
  const [changeShowOnMobileStatus] = useUpdateShowOnMobileAppVideoMutation();

  const columns: columnTypes[] = [
    {
      field: "videoLink",
      headerName: "Videos",
      flex: "flex-[1_1_0%]",
      renderCell: (row: AppVideoListResponse) => (
        <a href={`${row.videoLink}`} target="blank" className="underline">
          {" "}
          View Video{" "}
        </a>
      ),
    },
    {
      field: "showOnMobile",
      headerName: "Show On Mobile",
      flex: "flex-[1_1_0%]",
      renderCell: (row: AppVideoListResponse) => {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          e.stopPropagation();
          setStatusUpdate(true);

          showConfirmationDialog({
            title: "Heads up",
            text: `Are you sure you want to  ${
              row.showOnMobile ? "Hide" : "Show"
            } on mobile ?`,
            icon: "question",
            showCancelButton: true,
            next: (res) => {
              if (res.isConfirmed) {
                changeShowOnMobileStatus({
                  body: {
                    showOnMobile: e.target.checked,
                  },
                  id: row._id || "",
                })
                  .then((result: any) => {
                    if (result.error) {
                      showToast("error", result.error.data?.message);
                    } else {
                      showToast("success", result.data?.message);
                    }
                  })
                  .finally(() => {
                    setStatusUpdate(false);
                  });
              } else {
                setStatusUpdate(false);
              }
            },
          });
        };

        return (
          <Switch
            checked={row.showOnMobile}
            onChange={handleChange}
            disabled={statusUpdate}
          />
        );
      },
    },
    {
      field: "order",
      headerName: "Order",
      flex: "flex-[1_1_0%]",
      renderCell: (row: AppVideoListResponse) => <span> {row.order} </span>,
    },
    {
      noAuthRequired: true,
      field: "action",
      headerName: "Action",
      flex: "flex-[1_1_0%]",
      renderCell: (row: AppVideoListResponse) => {
        const options = getActionOptions(row);

        return <ATMMenu moduleName="VIDEOS" options={options} />;
      },
    },
  ];
  return (
    <>
      <TabAppVideoList columns={getColumns(columns, "VIDEOS")} rows={items} />
    </>
  );
};

export default TabAppVideoListWrapper;
