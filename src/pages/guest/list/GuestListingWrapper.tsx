import React from "react";
import { HiOutlineLockOpen } from "react-icons/hi";
import { TbLock } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import ATMMenu from "src/components/UI/atoms/ATMMenu/ATMMenu";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { GuestListResponse } from "src/models/Guest.model";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/GuestSlice";
import { AppDispatch, RootState } from "src/redux/store";
import {
  useChangeGuestStatusMutation,
  useGetGuestQuery,
} from "src/services/GuestServices";
import { showConfirmationDialog } from "src/utils/showConfirmationDialog";
import { showToast } from "src/utils/toaster/showToast";
import GuestListing from "./GuestListing";
import { getColumns } from "src/utils/auth/getColumns";
import { AccessAction } from "src/utils/Enums/AccessAction";
import Tooltip from "@mui/material/Tooltip";

const paramList = [
  "_id",
  "mobileNumber",
  "userType",
  "isDeleted",
  "isActive",
  "isVerified",
  "emailVerified",
  "mobileNumberVerified",
  "createdAt",
  "updatedAt",
];

const GuestListingWrapper = () => {
  const guestState: any = useSelector((state: RootState) => state.guest);

  const { page, rowsPerPage, items, searchValue } = guestState;

  const dispatch = useDispatch<AppDispatch>();
  const { data, isFetching, isLoading } = useGetGuestQuery({
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

  const [changeStatus] = useChangeGuestStatusMutation();

  // Table Columns
  const columns: columnTypes[] = [
    {
      noAuthRequired: true,
      field: "block",
      headerName: "",
      flex: "flex-[0.2_0.2_0%]",
      renderCell: (row: GuestListResponse) =>
        row.isBlocked && (
          <Tooltip title="This User is blocked">
            <div>
              <TbLock className="text-xl text-red-500" />
            </div>
          </Tooltip>
        ),
    },
    {
      field: "mobileNumber",
      headerName: "Mobile",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: GuestListResponse) => (
        <span> {row.mobileNumber || "-"} </span>
      ),
    },

    {
      noAuthRequired: true,
      field: "actions",
      headerName: "Actions",
      flex: "flex-[0.5_0.5_0%]",
      renderCell: (row: GuestListResponse) => (
        <ATMMenu
          moduleName="GUESTS"
          options={
            row.isBlocked
              ? [
                  {
                    accessAction: AccessAction.BLOCK,
                    label: (
                      <div className="text-green-500 flex items-center gap-2">
                        <HiOutlineLockOpen className="text-lg" /> Un-Block{" "}
                      </div>
                    ),
                    onClick: () => {
                      showConfirmationDialog({
                        title: "Heads Up",
                        text: "Are you sure you want to Un-Block User ?",
                        icon: "question",
                        showCancelButton: true,
                        next: (res) => {
                          if (res.isConfirmed) {
                            changeStatus({
                              body: {
                                requestedStatus: "UN_BLOCK",
                              },
                              guestId: row._id,
                            }).then((res: any) => {
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
                ]
              : [
                  {
                    accessAction: AccessAction.BLOCK,
                    label: (
                      <div className="text-red-500 flex items-center gap-2">
                        <TbLock className="text-lg" /> Block
                      </div>
                    ),
                    onClick: () => {
                      showConfirmationDialog({
                        title: "Heads Up",
                        text: "Are you sure you want to Block User ?",
                        icon: "question",
                        showCancelButton: true,
                        next: (res) => {
                          if (res.isConfirmed) {
                            changeStatus({
                              body: {
                                requestedStatus: "BLOCKED",
                              },
                              guestId: row._id,
                            }).then((res: any) => {
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
                ]
          }
        />
      ),
      align: "start",
    },
  ];

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

  return (
    <>
      <SideNavLayout>
        <div className="h-full">
          <GuestListing columns={getColumns(columns, "GUESTS")} rows={items} />
        </div>
      </SideNavLayout>
    </>
  );
};

export default GuestListingWrapper;
