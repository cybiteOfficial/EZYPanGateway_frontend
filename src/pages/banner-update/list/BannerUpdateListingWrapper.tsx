import Switch from "@mui/material/Switch";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/BannerUpdateSlice";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import BannerUpdateListing from "./BannerUpdateListing";
import { AppDispatch, RootState } from "src/redux/store";
import {
  useChangeBannerShowOnWebStatusMutation,
  useDeleteBannerByIdMutation,
  useGetBannerListQuery,
} from "src/services/BannerServices";
import { BannerUpdateListResponse } from "src/models/BannerUpdate.model";
import { showConfirmationDialog } from "src/utils/showConfirmationDialog";
import { showToast } from "src/utils/toaster/showToast";
import ATMMenu from "src/components/UI/atoms/ATMMenu/ATMMenu";
import { useNavigate } from "react-router-dom";
import { RxPencil1 } from "react-icons/rx";
import { MdDeleteOutline } from "react-icons/md";
import { getColumns } from "src/utils/auth/getColumns";
import { AccessAction } from "src/utils/Enums/AccessAction";
import AuthHOC from "src/userAccess/AuthHOC";

const paramList = [
  "_id",
  "image",
  "showOnMobile",
  "showOnWeb",
  "isDeleted",
  "isActive",
  "createdAt",
  "updatedAt",
];
const BannerUpdateListingWrapper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const bannerState: any = useSelector(
    (state: RootState) => state.bannerUpdate
  );
  const { items, page, rowsPerPage, searchValue } = bannerState;
  const [deleteBanner] = useDeleteBannerByIdMutation();
  const navigate = useNavigate();

  const getActionOptions = (row: BannerUpdateListResponse) => {
    return [
      {
        accessAction: AccessAction.EDIT,
        label: (
          <div className="flex gap-2 items-center text-secondary-main">
            <RxPencil1 className="text-lg" /> Edit
          </div>
        ),
        onClick: () => {
          navigate(`/banner/${row._id}/edit`);
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
            text: "Are you sure want to Delete this Banner ?",
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
  //Fetching Data through RTK Query
  const { data, isLoading, isFetching } = useGetBannerListQuery({
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
  // Change Show On Web Mutation
  const [changeWebShowStatus] = useChangeBannerShowOnWebStatusMutation();

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

  // Table Columns
  const columns: columnTypes[] = [
    {
      field: "image",
      headerName: "Banner Image",
      flex: "flex-[1_1_0%]",
      renderCell: (row: BannerUpdateListResponse) => {
        return (
          <img
            width={"150px"}
            style={{ height: "100px" }}
            alt="Error"
            src={row.image}
          />
        );
      },
    },

    {
      field: "showOnWeb",
      headerName: "Show On Website",
      flex: "flex-[1_1_0%]",
      renderCell: (row: BannerUpdateListResponse) => (
        <span>
          <Switch
            checked={row.showOnWeb}
            disabled = {!AuthHOC({
              moduleName : "BANNERS",
              action : AccessAction.SHOW_ON_WEB,
              resultType : "BOOLEAN"
            })}
            onChange={() =>
              showConfirmationDialog({
                title: "Heads UP",
                text: "Are you sure you want to change to show on web",
                icon: "question",
                showCancelButton: true,
                next: (res) => {
                  if (res.isConfirmed) {
                    changeWebShowStatus(row._id)
                      .then((res: any) => {
                        if (res.error) {
                          showToast("error", res.error.data.message);
                        } else {
                          showToast("success", res.data.message);
                        }
                      })
                      .catch((err) => {});
                  }
                },
              })
            }
          />
        </span>
      ),
    },
    {
      noAuthRequired: true,
      field: "action",
      headerName: "Action",
      flex: "flex-[0_0_100px]",
      renderCell: (row: BannerUpdateListResponse) => {
        const options = getActionOptions(row);

        return <ATMMenu moduleName="BANNERS" options={options} />;
      },
    },
  ];

  return (
    <>
      <SideNavLayout>
        <BannerUpdateListing
          columns={getColumns(columns, "BANNERS")}
          rows={items}
        />
      </SideNavLayout>
    </>
  );
};

export default BannerUpdateListingWrapper;
