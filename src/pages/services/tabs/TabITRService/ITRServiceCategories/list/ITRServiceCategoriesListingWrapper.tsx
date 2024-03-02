import Switch from "@mui/material/Switch";
import React, { useState } from "react";
import { RxPencil1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import ATMMenu from "src/components/UI/atoms/ATMMenu/ATMMenu";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { ITRCategoriesListResponse } from "src/models/ITRCategories.model";
import {
  setIsTableLoading,
  setItems,
} from "src/redux/slices/ITRCategoriesSlice";
import { AppDispatch, RootState } from "src/redux/store";
import {
  useChangeItrCategoryApplicableToMinorMutation,
  useChangeItrCategoryIsActiveStatusMutation,
  useChangeItrCategoryShowToGuestMutation,
  useGetAllITRCategoriesListQuery,
} from "src/services/CategoryDialogServices";
import { showConfirmationDialog } from "src/utils/showConfirmationDialog";
import { showToast } from "src/utils/toaster/showToast";
import EditCategoriesITRServiceDialogWrapper from "./EditCategoriesITRService/EditCategoriesITRServiceDialogWrapper";
import ITRServiceCategoriesListing from "./ITRServiceCategoriesListing";
import { getColumns } from "src/utils/auth/getColumns";
import AuthHOC from "src/userAccess/AuthHOC";
import { AccessAction } from "src/utils/Enums/AccessAction";

const ITRServiceCategoriesWrapperListing = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [changeItrCategoryShowToGuest] =
    useChangeItrCategoryShowToGuestMutation();
  const [selectedCategory, setSelectedCategory] =
    useState<ITRCategoriesListResponse | null>(null);
  const { data, isLoading, isFetching } = useGetAllITRCategoriesListQuery("");
  const [isOpenEditCategoriesDialog, setIsOpenEditCategoriesDialog] =
    useState(false);
  const itrCategoryState: any = useSelector(
    (state: RootState) => state.itrCategory
  );
  const [changeItrCategoryIsActiveStatus] =
    useChangeItrCategoryIsActiveStatusMutation();

  const { items } = itrCategoryState;
  const [changeItrCategoryApplicableToMinor] =
    useChangeItrCategoryApplicableToMinorMutation();
  const getActionOptions = (row: ITRCategoriesListResponse) => {
    return [
      {
        accessAction : AccessAction.EDIT,
        label: (
          <div className="flex gap-2 items-center text-secondary-main">
            <RxPencil1 className="text-lg" /> Edit
          </div>
        ),
        onClick: () => {
          setSelectedCategory(row);
          setIsOpenEditCategoriesDialog(true);
        },
      },
    ];
  };
  React.useEffect(() => {
    if (!isFetching && !isLoading) {
      dispatch(setItems(data?.data || []));
      dispatch(setIsTableLoading(false));
    } else {
      dispatch(setIsTableLoading(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching, isLoading, data]);

  const columns: columnTypes[] = [
    {
      field: "categoryCode",
      headerName: "Category Code",
      flex: "flex-[1_1_0%]",
      renderCell: (row: ITRCategoriesListResponse) => (
        <span> {row.categoryCode} </span>
      ),
    },
    {
      field: "categoryName",
      headerName: "Category Name",
      flex: "flex-[1_1_0%]",
      renderCell: (row: ITRCategoriesListResponse) => (
        <span> {row.categoryName} </span>
      ),
    },
    {
      field: "price",
      headerName: "Price",
      flex: "flex-[1_1_0%]",
      renderCell: (row: ITRCategoriesListResponse) => (
        <span> &#8377; {row.price} </span>
      ),
    },
    {
      field: "applicableForMinor",
      headerName: "Applicable To Minor",
      flex: "flex-[1_1_0%]",
      renderCell: (row: ITRCategoriesListResponse) => {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          e.stopPropagation();
          showConfirmationDialog({
            title: "Heads up",
            text: `Are you sure you want to apply for ${
              row.applicableForMinor ? "not" : ""
            } applicable to minor`,
            icon: "question",
            showCancelButton: true,
            next: (result) => {
              if (result.isConfirmed) {
                changeItrCategoryApplicableToMinor(row._id).then((res: any) => {
                  if (res.error) {
                    showToast("error", res.error.data.message);
                  } else {
                    showToast("success", res.data.message);
                  }
                });
              }
            },
          });
        };
        return (
          <span>
            <Switch
              checked={row.applicableForMinor}
              onChange={handleChange}
              disabled={
                !AuthHOC({
                  moduleName: "ITR_CATEGORIES",
                  action: AccessAction.APPLICABLE_FOR_MINOR,
                  resultType: "BOOLEAN",
                })
              }
            />
          </span>
        );
      },
    },
    {
      field: "showToGuest",
      headerName: "Show To Guest",
      flex: "flex-[1_1_0%]",
      renderCell: (row: ITRCategoriesListResponse) => {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          e.stopPropagation();
          showConfirmationDialog({
            title: "Heads up",
            text: `Are you sure you want to apply for ${
              row.showForGuest ? "not" : ""
            }show For Guest`,
            icon: "question",
            showCancelButton: true,
            next: (result) => {
              if (result.isConfirmed) {
                changeItrCategoryShowToGuest(row._id).then((res: any) => {
                  if (res.error) {
                    showToast("error", res.error.data.message);
                  } else {
                    showToast("success", res.data.message);
                  }
                });
              }
            },
          });
        };
        return (
          <span>
            <Switch
              onChange={handleChange}
              checked={row.showForGuest}
              disabled={
                !AuthHOC({
                  moduleName: "ITR_CATEGORIES",
                  action: AccessAction.SHOW_FOR_GUEST,
                  resultType: "BOOLEAN",
                })
              }
            />
          </span>
        );
      },
    },
    {
      field: "isActive",
      headerName: "Is Active",
      flex: "flex-[1_1_0%]",
      renderCell: (row: ITRCategoriesListResponse) => {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          e.stopPropagation();

          showConfirmationDialog({
            title: "Heads up",
            text: `Are you sure you want to  ${
              row.isActive ? "Deactivate" : "Activate"
            }`,
            icon: "question",
            showCancelButton: true,
            next: (result) => {
              if (result.isConfirmed) {
                changeItrCategoryIsActiveStatus(row._id).then((res: any) => {
                  if (res.error) {
                    showToast("error", res.error.data.message);
                  } else {
                    showToast("success", res.data.message);
                  }
                });
              }
            },
          });
        };
        return (
          <span>
            <Switch
              checked={row.isActive}
              onChange={handleChange}
              disabled={
                !AuthHOC({
                  moduleName: "ITR_CATEGORIES",
                  action: AccessAction.ACTIVE_DEACTIVE,
                  resultType: "BOOLEAN",
                })
              }
            />
          </span>
        );
      },
    },
    {
      noAuthRequired: true,
      field: "actions",
      headerName: "Actions",
      renderCell: (row: ITRCategoriesListResponse) => {
        return <ATMMenu moduleName="ITR_CATEGORIES" options={getActionOptions(row)} />;
      },
      align: "start",
    },
  ];

  return (
    <>
      <ITRServiceCategoriesListing
        columns={getColumns(columns, "ITR_CATEGORIES")}
        rows={items}
      />
      {isOpenEditCategoriesDialog && (
        <EditCategoriesITRServiceDialogWrapper
          onClose={() => setIsOpenEditCategoriesDialog(false)}
          selectedCategory={selectedCategory}
        />
      )}
    </>
  );
};

export default ITRServiceCategoriesWrapperListing;
