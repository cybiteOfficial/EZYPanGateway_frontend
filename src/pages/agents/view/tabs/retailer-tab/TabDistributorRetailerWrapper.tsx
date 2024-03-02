import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { MdMobileFriendly } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { RetailerListResponse } from "src/models/Retailer.model";
import {
  setFilterBy,
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/TabDistributorRetailerSlice";
import { AppDispatch, RootState } from "src/redux/store";
import { useGetRetailersQuery } from "src/services/RetailerServices";
import TabDistributorRetailer from "./TabDistributorRetailer";
import { getColumns } from "src/utils/auth/getColumns";

const paramsList = [
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

const TabDisributorRetailerWrapper = () => {
  // States
  const [isOpenDistributorCodeDialog, setIsOpenDistributorCodeDialog] =
    useState(false);
  const [distributorCodeList, setDistributorCodeList] = useState<string[]>([]);

  // Dispatch Hook
  const dispatch = useDispatch<AppDispatch>();
  const retailerState: any = useSelector(
    (state: RootState) => state.tabDistributorRetailer
  );
  const { page, rowsPerPage, items, searchValue, filterBy } = retailerState;
  const { state } = useLocation();

  // Setting Distributor Code
  useEffect(() => {
    dispatch(
      setFilterBy(
        filterBy.map((filter: any) => {
          if (filter.fieldName === "allDistributor.sjbtCode") {
            return {
              ...filter,
              value: [state?.distributor?.sjbtCode],
            };
          } else {
            return filter;
          }
        })
      )
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  // Get Data Query
  const { data, isFetching, isLoading } = useGetRetailersQuery({
    limit: rowsPerPage,
    searchValue: searchValue,
    params: paramsList,
    page: page,
    filterBy: filterBy,
    dateFilter: {
      start_date: "",
      end_date: "",
      dateFilterKey: "",
    },
    orderBy: "createdAt",
    orderByValue: -1,
    isPaginationRequired: true,
  });

  // Setting Retailer data
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
      field: "name",
      headerName: "Name",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: RetailerListResponse) => {
        return <span> {row.name || "N/A"} </span>;
      },
    },
    {
      field: "mobileNumber",
      headerName: "Mobile",
      flex: "flex-[1_1_0%]",
      renderCell: (row: RetailerListResponse) => {
        return (
          <div className="flex justify-between w-full items-center pr-2 overflow-hidden">
            <div className="w-[calc(100%-30px)]  overflow-hidden text-ellipsis">
              {" "}
              {row.mobileNumber || "-"}{" "}
            </div>
            {row.mobileNumber && row.emailVerified && (
              <div className="w-[25px] flex justify-end">
                <MdMobileFriendly className="text-lg text-green-500" />
              </div>
            )}
          </div>
        );
      },
    },
    {
      field: "sjbtCode",
      headerName: "Distributor Code",
      flex: "flex-[1_1_0%]",
      renderCell: (row: RetailerListResponse) => {
        return (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setDistributorCodeList(
                row.allDistributor?.map((distributor) => distributor.sjbtCode)
              );
              setIsOpenDistributorCodeDialog(true);
            }}
            className=""
            disabled={row.allDistributor?.length <= 1}
          >
            <div className="flex flex-col ">
              <div className=" text-[13px] text-ellipsis overflow-hidden">
                {row.allDistributor?.[0]?.sjbtCode}
              </div>
              {row.allDistributor?.length > 1 && (
                <div className="text-primary-main text-[13px] font-medium">
                  + {row.allDistributor?.length - 1} More
                </div>
              )}
            </div>
          </button>
        );
      },
    },
    {
      noAuthRequired: true,
      field: "firmName",
      headerName: "Firm Name",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: RetailerListResponse) => {
        return (
          <span className="text-ellipsis overflow-hidden">
            {row.firmName || "N/A"}
          </span>
        );
      },
    },
  ];

  return (
    <>
      <TabDistributorRetailer
        columns={getColumns(columns, "RETAILERS")}
        rows={items}
      />

      {isOpenDistributorCodeDialog && (
        <Dialog open={true} maxWidth="xs" fullWidth>
          <DialogTitle>
            <div className="w-full flex justify-between">
              SJBT Codes
              <button
                type="button"
                onClick={() => setIsOpenDistributorCodeDialog(false)}
                className="p-1 rounded-full flex justify-center items-center bg-slate-200 hover:bg-red-400 hover:text-white transition-all"
              >
                <IoClose />
              </button>
            </div>
          </DialogTitle>
          <DialogContent>
            <div className="flex flex-col gap-2">
              {distributorCodeList?.map((distributorCode) => (
                <div className="text-primary-main ">{distributorCode}</div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default TabDisributorRetailerWrapper;
