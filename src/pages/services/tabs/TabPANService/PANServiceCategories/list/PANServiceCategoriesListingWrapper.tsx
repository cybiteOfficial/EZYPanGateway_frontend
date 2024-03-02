import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "src/redux/store";
import Switch from "@mui/material/Switch";
import { RxPencil1 } from "react-icons/rx";
import ATMMenu from "src/components/UI/atoms/ATMMenu/ATMMenu";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { PANCategoriesListResponse } from "src/models/PANCategories.model";
import EditCategoriesPANServiceDialogWrapper from "./EditCategoriesPANService/EditCategoriesPANServiceDialogWrapper";
import PANServiceCategoriesListing from "./PANServiceCategoriesListing";
import { showConfirmationDialog } from "src/utils/showConfirmationDialog";
import {
  useChangePanCategoryApplicableToMinorMutation,
  useChangePanCategoryIsActiveStatusMutation,
  useGetAllPanCategoriesListQuery,
} from "src/services/CategoryDialogServices";
import { setIsTableLoading, setItems } from "src/redux/slices/PANCategorySlice";
import { useChangePanCategoryShowToGuestMutation } from "src/services/CategoryDialogServices";
import { showToast } from "src/utils/toaster/showToast";
import { getColumns } from "src/utils/auth/getColumns";
import AuthHOC from "src/userAccess/AuthHOC";
import { AccessAction } from "src/utils/Enums/AccessAction";

const PANServiceCategoriesListingWrapper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [changePanCategoryShowToGuest] =
    useChangePanCategoryShowToGuestMutation();
  const [changePanCategoryIsActiveStatus] =
    useChangePanCategoryIsActiveStatusMutation();
  const [changePanCategoryApplicableToMinor] =
    useChangePanCategoryApplicableToMinorMutation();

  const [isOpenEditCategoriesDialog, setIsOpenEditCategoriesDialog] =
    useState(false);

  const [selectedCategory, setSelectedCategory] =
    useState<PANCategoriesListResponse | null>(null);

  const { data, isLoading, isFetching } = useGetAllPanCategoriesListQuery("");

  const panCategoryState: any = useSelector(
    (state: RootState) => state.panCategory
  );

  const { items } = panCategoryState;
  const getActionOptions = (row: PANCategoriesListResponse) => {
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
      renderCell: (row: PANCategoriesListResponse) => (
        <span> {row.categoryCode} </span>
      ),
    },
    {
      field: "categoryName",
      headerName: "Category Name",
      flex: "flex-[1_1_0%]",
      renderCell: (row: PANCategoriesListResponse) => (
        <span> {row.categoryName} </span>
      ),
    },
    {
      field: "price",
      headerName: "Price",
      flex: "flex-[1_1_0%]",
      renderCell: (row: PANCategoriesListResponse) => (
        <span> &#8377; {row.price} </span>
      ),
    },
    {
      field: "applicableForMinor",
      headerName: "Applicable To Minor",
      flex: "flex-[1_1_0%]",
      renderCell: (row: PANCategoriesListResponse) => {
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
                changePanCategoryApplicableToMinor(row._id).then((res: any) => {
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
                  moduleName: "PAN_CATEGORIES",
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
      field: "showForGuest",
      headerName: "Show To Guest",
      flex: "flex-[1_1_0%]",
      renderCell: (row: PANCategoriesListResponse) => {
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
                changePanCategoryShowToGuest(row._id).then((res: any) => {
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
                  moduleName: "PAN_CATEGORIES",
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
      renderCell: (row: PANCategoriesListResponse) => {
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
                changePanCategoryIsActiveStatus(row._id).then((res: any) => {
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
                  moduleName: "PAN_CATEGORIES",
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
      renderCell: (row: PANCategoriesListResponse) => {
        return (
          <ATMMenu
            moduleName="PAN_CATEGORIES"
            options={getActionOptions(row)}
          />
        );
      },
      align: "start",
    },
  ];

  return (
    <>
      <PANServiceCategoriesListing
        columns={getColumns(columns, "PAN_CATEGORIES")}
        rows={items}
      />
      {isOpenEditCategoriesDialog && (
        <EditCategoriesPANServiceDialogWrapper
          onClose={() => setIsOpenEditCategoriesDialog(false)}
          selectedCategory={selectedCategory}
        />
      )}
    </>
  );
};

export default PANServiceCategoriesListingWrapper;
