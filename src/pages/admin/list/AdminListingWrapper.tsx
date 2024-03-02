import React, { useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { RxPencil1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import ATMMenu from "src/components/UI/atoms/ATMMenu/ATMMenu";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { AdminListResponse } from "src/models/Admin.model";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
  setSelectedAdminId
} from "src/redux/slices/AdminSlice";
import { AppDispatch, RootState } from "src/redux/store";
import {
  useDeleteAdminByIdMutation,
  useGetAdminListQuery,
} from "src/services/AdminServices";
import { showConfirmationDialog } from "src/utils/showConfirmationDialog";
import { showToast } from "src/utils/toaster/showToast";
import AdminListing from "./AdminListing";
import { AccessAction } from "src/utils/Enums/AccessAction";
import { getColumns } from "src/utils/auth/getColumns";
import {FaEyeSlash} from 'react-icons/fa'

const paramList = [
  "_id",
  "userName",
  "email",
  "mobile",
  "role",
  "printWaitTime",
  "createdAt",
  "updatedAt",
];

const AdminListingWrapper = () => {
  const adminState: any = useSelector((state: RootState) => state.admin);
  const [deleteAdmin] = useDeleteAdminByIdMutation();
  const { page, rowsPerPage, items, searchValue } = adminState;

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { data, isFetching, isLoading } = useGetAdminListQuery({
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

  useEffect(() => {
    if (!isFetching && !isLoading) {
      dispatch(setIsTableLoading(false));
      dispatch(setItems(data?.data || []));
      dispatch(setTotalItems(data?.totalItem || 0));
    } else {
      dispatch(setIsTableLoading(true));
    }  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isFetching, data]);



  const getActionOptions = (row: AdminListResponse) => {
    return [ 
      {
        accessAction: AccessAction.EDIT,
        label: (
          <div className="flex gap-2 items-center text-primary-main">
            <FaEyeSlash className="text-lg" />Change Password
          </div>
        ),
        onClick: () => {
          navigate(`/admins/${row._id}/change-password`); 
          dispatch(setSelectedAdminId(row?._id))
        },
      },
      {
        accessAction: AccessAction.EDIT,
        label: (
          <div className="flex gap-2 items-center text-secondary-main">
            <RxPencil1 className="text-lg" /> Edit
          </div>
        ),
        onClick: () => {
          navigate(`/admins/${row._id}/edit`);
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
            text: "Are you sure want to Delete this Admin ?",
            icon: "question",
            showCancelButton: true,
            next: (result) => {
              if (result.isConfirmed) {
                deleteAdmin(row._id).then((res: any) => {
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

  //   Table Columns
  const columns: columnTypes[] = [
    {
      field: "userName",
      headerName: "User Name",
      flex: "flex-[1_1_0%]",
    },
    {
      field: "email",
      headerName: "Email",
      flex: "flex-[1.5_1.5_0%]",
    },
    {
      field: "mobile",
      headerName: "Mobile",
      flex: "flex-[1_1_0%]",
    },
    {
      field: "adminRoleGroupName",
      headerName: "Role",
      flex: "flex-[1_1_0%]",
      renderCell: (row: AdminListResponse) => (
        <span> {row.adminRoleGroupName} </span>
      ),
    },
    {
      field: "printWaitTime",
      headerName: "Print Wait Time",
      flex: "flex-[1_1_0%]",
      renderCell: (row: AdminListResponse) => (
        <span> {row.printWaitTime} </span>
      ),
    },
    {
      noAuthRequired: true,
      field: "actions",
      headerName: "Actions",
      flex: "flex-[0.5_0.5_0%]",
      renderCell: (row: any) => (
        <ATMMenu moduleName="ADMINS" options={getActionOptions(row)} />
      ),
      align: "start",
    },
  ];

  return (
    <>
      <SideNavLayout>
        <AdminListing
          columns={getColumns(columns, "ADMINS")}
          rows={items}
        />
      </SideNavLayout>
    </>
  );
};

export default AdminListingWrapper;
