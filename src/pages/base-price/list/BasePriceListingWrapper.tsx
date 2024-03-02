import React from "react";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import BasePriceListing from "./BasePriceListing";
import { BasePriceListResponse } from "src/models/BasePrice.model";
import { useGetBasePriceListQuery } from "src/services/BasePriceServices";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/redux/store";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/BasePriceSlice";
import ATMMenu from "src/components/UI/atoms/ATMMenu/ATMMenu";
import { RxPencil1 } from "react-icons/rx";
import EditBasePriceDialogWrapper from "./EditBasePriceDialog/EditBasePriceDialogWrapper";
import { getColumns } from "src/utils/auth/getColumns";
import { AccessAction } from "src/utils/Enums/AccessAction";

const paramList = [
  "serviceName",
  "serviceType",
  "price",
  "isActive",
  "createdAt",
  "updatedAt",
];

const BasePriceListingWrapper = () => {
  const [isOpenEditBasePriceDialog, setIsOpenEditBasePriceDialog] =
    React.useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [selectedBasePriceData, setSelectedBasePriceData] =
    React.useState<BasePriceListResponse | null>(null);

  const basePriceState: any = useSelector(
    (state: RootState) => state.basePrice
  );
  const { items, page, rowsPerPage, searchValue } = basePriceState;
  // Fetching Data
  const { data, isFetching, isLoading } = useGetBasePriceListQuery({
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
    isPaginationRequired: false,
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
      field: "serviceName",
      headerName: "Application",
      flex: "flex-[1_1_0%]",
    },
    {
      field: "price",
      headerName: "Base Price",
      flex: "flex-[1_1_0%]",
      renderCell: (row: BasePriceListResponse) => (
        <span> &#8377; {row.price} </span>
      ),
    },
    {
      field: "convenienceprice",
      headerName: "Convenience  Charges",
      flex: "flex-[1_1_0%]",
      renderCell: (row: BasePriceListResponse) => (
        <span> &#8377; {row.convenienceprice} </span>
      ),
    },
    {
      field: "guestBaseprice",
      headerName: "Guest Price",
      flex: "flex-[1_1_0%]",
      renderCell: (row: BasePriceListResponse) => (
        <span> &#8377; {row.guestBaseprice} </span>
      ),
    },
    {
      field: "guestConvenienceprice",
      headerName: "Guest Convenience  Charges",
      flex: "flex-[1_1_0%]",
      renderCell: (row: BasePriceListResponse) => (
        <span> &#8377; {row.guestConvenienceprice} </span>
      ),
    },
    {
      noAuthRequired: true,
      field: "actions",
      headerName: "Actions",
      flex: "flex-[1_1_0%]",
      renderCell: (row: BasePriceListResponse) => (
        <ATMMenu
        moduleName="PRICE_CONFIGS"
          options={[
            {
              accessAction: AccessAction.EDIT,
              label: (
                <div className="flex gap-2 items-center text-secondary-main">
                  <RxPencil1 className="text-lg" /> Edit
                </div>
              ),
              onClick: () => {
                setSelectedBasePriceData(row);
                setIsOpenEditBasePriceDialog(true);
              },
            },
          ]}
        />
      ),
      align: "start",
    },
  ];

  return (
    <>
      <SideNavLayout>
        <BasePriceListing
          columns={getColumns(columns, "PRICE_CONFIGS")}
          rows={items}
        />

        {isOpenEditBasePriceDialog && (
          <EditBasePriceDialogWrapper
            initialData={selectedBasePriceData}
            onClose={() => setIsOpenEditBasePriceDialog(false)}
          />
        )}
      </SideNavLayout>
    </>
  );
};

export default BasePriceListingWrapper;
