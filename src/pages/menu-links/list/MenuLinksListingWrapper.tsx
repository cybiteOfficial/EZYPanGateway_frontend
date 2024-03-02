import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { RxPencil1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import ATMMenu from "src/components/UI/atoms/ATMMenu/ATMMenu";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { MenuLinksListResponse } from "src/models/MenuLinks.model";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/MenuLinksSlice";
import { AppDispatch, RootState } from "src/redux/store";
import {
  useDeleteMenuLinkByIdMutation,
  useGetMenuLinksQuery,
} from "src/services/MenulinksServices";
import { showConfirmationDialog } from "src/utils/showConfirmationDialog";
import { showToast } from "src/utils/toaster/showToast";
import MenuLinksListing from "./MenuLinksListing";
import { getColumns } from "src/utils/auth/getColumns";
import { AccessAction } from "src/utils/Enums/AccessAction";

const MenuLinksListingWrapper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const menuLinkState: any = useSelector((state: RootState) => state.menuLinks);

  const [deleteBanner] = useDeleteMenuLinkByIdMutation();
  const navigate = useNavigate();

  const getActionOptions = (row: MenuLinksListResponse) => {
    return [
      {
        accessAction: AccessAction.EDIT,
        label: (
          <div className="flex gap-2 items-center text-secondary-main">
            <RxPencil1 className="text-lg" /> Edit
          </div>
        ),
        onClick: () => {
          navigate(`/menu-links/${row._id}/edit`);
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
            text: "Are you sure want to Delete this Menu Link ?",
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

  const { items, rowsPerPage, page, searchValue } = menuLinkState;

  const { data, isLoading, isFetching } = useGetMenuLinksQuery({
    limit: rowsPerPage,
    searchValue: searchValue,
    params: [
      "_id",
      "menuName",
      "link",
      "order",
      "isDeleted",
      "isActive",
      "createdAt",
      "updatedAt",
    ],
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
      field: "menuName",
      headerName: "Menu Name",
      flex: "flex-[1_1_0%]",
    },
    {
      field: "link",
      headerName: "Link",
      flex: "flex-[1_1_0%]",
    },
    {
      field: "order",
      headerName: "Order",
      flex: "flex-[1_1_0%]",
      align: "center",

    },
    {
      noAuthRequired:true,
      field: "action",
      headerName: "Action",
      flex: "flex-[1_1_0%]",
      renderCell: (row: MenuLinksListResponse) => {
        const options = getActionOptions(row);

        return <ATMMenu 
        moduleName="MENU_LINKS"
        options={options} />;
      },
    },
  ];

  return (
    <>
      <SideNavLayout>
        <MenuLinksListing 
        columns={getColumns(columns, "MENU_LINKS")}
        rows={items} />
      </SideNavLayout>
    </>
  );
};

export default MenuLinksListingWrapper;
