import React from "react";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { RoleListResponse } from "src/models/Role.model";
import RolesListing from "./RolesListing";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/RoleSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/redux/store";
import { useGetRolesListQuery } from "src/services/RolesService";
import { useNavigate } from "react-router-dom";
import { RxPencil1 } from "react-icons/rx";
import ATMMenu from "src/components/UI/atoms/ATMMenu/ATMMenu";

const RolesListingWrapper = () => {
  const navigate = useNavigate();
  const getActionOptions = (row: RoleListResponse) => {
    return [
      {
        label: (
          <div className="flex gap-2 items-center text-secondary-main">
            <RxPencil1 className="text-lg" /> Edit
          </div>
        ),

        onClick: () => {
          navigate(`/roles/${row._id}/edit`);
        },
      },
    ];
  };

  const dispatch = useDispatch<AppDispatch>();

  const roleState: any = useSelector((state: RootState) => state.roles);
  const { items, rowsPerPage, page, searchValue } = roleState;

  const { data, isLoading, isFetching } = useGetRolesListQuery({
    limit: rowsPerPage,
    searchValue: searchValue,
    params: ["_id", "roleName", "module", "createdAt", "updatedAt"],
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
      field: "roleName",
      headerName: "Role",
      flex: "flex-[1_1_0%]",
      renderCell: (row: RoleListResponse) => <span> {row.roleName} </span>,
    },
    {
      field: "action",
      headerName: "Action",
      flex: "flex-[1_1_0%]",
      renderCell: (row: RoleListResponse) => {
        const options = getActionOptions(row);
        return <ATMMenu options={options} />;
      },
    },
  ];
  return (
    <>
      <SideNavLayout>
        <RolesListing columns={columns} rows={items} />
      </SideNavLayout>
    </>
  );
};

export default RolesListingWrapper;
