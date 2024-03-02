import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdMobileFriendly } from "react-icons/md";
import { AppDispatch, RootState } from "src/redux/store";
import { showToast } from "src/utils/toaster/showToast";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import ATMMenu, { OptionType } from "src/components/UI/atoms/ATMMenu/ATMMenu";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/retailerSlice";
import { RetailerListResponse } from "src/models/Retailer.model";
import {
  useExportRetailerDataMutation,
  useGetRetailersQuery,
  useRetailerblockUnblockMutation,
} from "src/services/RetailerServices";
import RetailerListing from "./RetailerListing";
import { HiOutlineLockOpen } from "react-icons/hi";
import { TbLock } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import DialogTitle from "@mui/material/DialogTitle/DialogTitle";
import Dialog from "@mui/material/Dialog/Dialog";
import DialogContent from "@mui/material/DialogContent/DialogContent";
import { getColumns } from "src/utils/auth/getColumns";
import { AccessAction } from "src/utils/Enums/AccessAction";
import Tooltip from "@mui/material/Tooltip";
import { formatDateAndTime } from "src/utils/dateAndTime";


const paramsList = [
  "_id",
  "mobileNumber",
  "name",
  "userType",
  "isDeleted",
  "isActive",
  "isVerified",
  "emailVerified",
  "mobileNumberVerified",
  "createdAt",
  "updatedAt",
];

const exportDataHeaders = [
  { label: "User Name", key: "name" },
  { label: "Mobile Number", key: "mobileNumber" },
  { label: "Mobile Verified", key: "mobileNumberVerified" },
  { label: "Distributor Codes", key: "distributorCodes" },
  { label: "Email", key: "email" },
  { label: "Father's Name", key: "fatherName" },
  { label: "address", key: "address" },
  { label: "Firm Name", key: "firmName" },
];

const RetailerListingWrapper = () => {
  // Dispatch Hook
  const dispatch = useDispatch<AppDispatch>();
  const [blockUnblock] = useRetailerblockUnblockMutation();
  const actionDisableStatus = false;

  // Slice
  const retailerState: any = useSelector((state: RootState) => state.retailer);
  const { page, rowsPerPage, items, isTableLoading, searchValue , dateFilter } =
    retailerState;
  // States
  const [isAllExporting, setIsAllExporting] = useState(false);
  const [isCurrentExporting, setIsCurrentExporting] = useState(false);
  const [dataToExport, setDataToExport] = useState([]);
  // States
  const [isOpenDistributorCodeDialog, setIsOpenDistributorCodeDialog] =
    useState(false);
  // Services
  // Get Data Query
  const { data, isFetching, isLoading } = useGetRetailersQuery({
    limit: rowsPerPage,
    searchValue: searchValue,
    params: paramsList,
    page: page,
    filterBy: [
      {
        fieldName: "",
        value: [],
      },
    ],
    dateFilter: dateFilter ,
    orderBy: "createdAt",
    orderByValue: -1,
    isPaginationRequired: true,
  });
  // Export Data Mutation
  const [exportData] = useExportRetailerDataMutation();
  // Change Status Mutation
  const [distributorCodeList, setDistributorCodeList] = useState<string[]>([]);

  const getActionOptions: (row: RetailerListResponse) => OptionType[] = (
    row: RetailerListResponse
  ) => {
    const isBlocked = row.isBlocked;
    return [
      {
        accessAction: AccessAction.BLOCK,
        label: isBlocked
          ? (
              <div className="text-green-500 flex items-center gap-2">
                <HiOutlineLockOpen className="text-lg" /> Un-Block{" "}
              </div>
            )
          : (
              <div className="text-red-600 flex items-center gap-2">
                <TbLock className="text-xl" /> Block
              </div>
            ),
        onClick: () => {
          blockUnblock(row._id).then((res: any) => {
            if (res?.error) {
              showToast("error", res?.error?.data?.message);
            } else {
              if (res?.data?.status) {
                showToast("success", res?.data?.message);
              } else {
                showToast("error", res?.data?.message);
              }
            }
          });
        },
      },
    ];
  };
  
  const columns: columnTypes[] = [ 
 
    {
      field: "date_and_time", 
      noAuthRequired: true,
      headerName: "Date - Time",
      flex: "flex-[1_1_0%]",
      renderCell: (row: RetailerListResponse) => (
        <div>
          <div className="text-slate-700 font-medium">
            {formatDateAndTime(row?.createdAt, "DD MMM yyyy")}
          </div>
          <div className="text-[13px] font-medium text-slate-400">
            {formatDateAndTime(row?.createdAt, "hh:mm A")}
          </div>
        </div>
      ),
    },

    {
      noAuthRequired: true,
      field: "block",
      headerName: "",
      flex: "flex-[0.2_0.2_0%]",
      renderCell: (row: RetailerListResponse) =>
        row.isBlocked && (
          <Tooltip title="This Retailer is blocked">
            <div>
              <TbLock className="text-xl text-red-500" />
            </div>
          </Tooltip>
        ),
    },
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
              {row.mobileNumber}{" "}
            </div>
            {row.emailVerified && (
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
      field: "firmName",
      headerName: "Firm Name",
      flex: "flex-[1_1_0%]",
      renderCell: (row: RetailerListResponse) => {
        return <span> {row.firmName || "N/A"} </span>;
      },
    },
    {
      noAuthRequired: true,
      field: "actions",
      flex: "flex-[1_1_0%]",
      headerName: "Actions",
      renderCell: (row: RetailerListResponse) => {
        return (
          <ATMMenu
            moduleName="RETAILERS"
            disabled={actionDisableStatus}
            options={getActionOptions(row)}
          />
        );
      },
    },
  ];

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

  // Handle Export
  const handleExport = (done: () => void, isAllExport: boolean) => {
    isAllExport ? setIsAllExporting(true) : setIsCurrentExporting(true);
    exportData({
      limit: rowsPerPage,
      searchValue: searchValue,
      params: paramsList,
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
      isPaginationRequired: !isAllExport,
    }).then((res: any) => {
      let formattedData = res?.data?.data?.map((data: RetailerListResponse) => {
        return {
          ...data,
          distributorCodes: data?.allDistributor?.map(
            (distributor) => distributor.sjbtCode
          ),
        };
      });
      setDataToExport(formattedData);
      setTimeout(() => {
        done();
        isAllExport ? setIsAllExporting(false) : setIsCurrentExporting(false);
        document.body.click();
      }, 800);
    });
  };
  return (
    <>
      <SideNavLayout>
        <div className="h-full">
          <RetailerListing
            columns={getColumns(columns, "RETAILERS")}
            rows={items}
            onExport={handleExport}
            isAllExporting={isAllExporting}
            isCurrentExporting={isCurrentExporting}
            isTableLoading={isTableLoading}
            exportDataHeaders={exportDataHeaders}
            exportData={dataToExport}
          />
        </div>
      </SideNavLayout>

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

export default RetailerListingWrapper;
