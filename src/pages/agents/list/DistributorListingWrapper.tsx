import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MdMarkEmailRead,
  MdMobileFriendly,
  MdOutlineCancel,
} from "react-icons/md";
import { FcApproval } from "react-icons/fc";
import { AppDispatch, RootState } from "src/redux/store";
import { showToast } from "src/utils/toaster/showToast";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import ATMMenu, { OptionType } from "src/components/UI/atoms/ATMMenu/ATMMenu";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { DistributorListResponse } from "src/models/Agents.model";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/agentsSlice";
import {
  useDistributorblockUnblockMutation,
  useExportDistributorDataMutation,
  useGetDistributorsQuery,
} from "src/services/DistributorServices";
import DistributorListing from "./DistributorListing";
import { BiCategory } from "react-icons/bi";
import { BsCreditCard2Back } from "react-icons/bs";
import CategoryDialogWrapper from "./Dialogs/CategoryDialog/CategoryDialogWrapper";
import ServiceDialogWrapper from "./Dialogs/ServiceDialog/ServiceDialogWrapper";
import { VerificationStatus } from "src/utils/verificationStatus/VerificationStatus";
import RejectionReasonDialogWrapper from "./Dialogs/RejectionReasonDialog/RejectionReasonDialogWrapper";
import { TbLock } from "react-icons/tb";
import Tooltip from "@mui/material/Tooltip";
import { HiOutlineLockOpen } from "react-icons/hi";
import moment from "moment";
import { getColumns } from "src/utils/auth/getColumns";
import { AccessAction } from "src/utils/Enums/AccessAction";
import DistributorVerifyDialogWrapper from "./Dialogs/DistributorVerifyDialog/DistributorVerifyDialogWrapper"; 
import { formatDateAndTime } from "src/utils/dateAndTime";

const paramsList = ["_id", "name", "email", "mobileNumber", "dob"];
const actionDisableStatus = [""];

const exportDataHeaders = [
  { label: "Name", key: "name" },
  { label: "Email", key: "email" },
  { label: "Email Verified", key: "emailVerified" },
  { label: "Mobile Number", key: "mobileNumber" },
  { label: "Mobile Number Verified", key: "mobileNumberVerified" },
  { label: "Date of Birth(DOB)", key: "dob" },
  { label: "Father's Name", key: "fatherName" },
  { label: "Firm Name", key: "firmName" },
  { label: "Address", key: "address" },
  { label: "Area", key: "area" },
  { label: "City/Village Name", key: "cityVillageName" },
  { label: "District", key: "district" },
  { label: "Pincode", key: "pincode" },
  { label: "State", key: "state" },
  { label: "SJBT Code", key: "sjbtCode" },
  { label: "Pan Number", key: "panNumber" },
  { label: "Status", key: "status" },
];

const DistributorListingWrapper = () => {
  // States
  const [isAllExporting, setIsAllExporting] = useState(false);
  const [isCurrentExporting, setIsCurrentExporting] = useState(false);
  const [dataToExport, setDataToExport] = useState([]);
  const [isOpenCategoryDialog, setIsOpenCategoryDialog] = useState(false);
  const [isOpenServiceDialog, setIsOpenServiceDialog] = useState(false);
  const [distributorId, setDistributorId] = useState("");
  const [distributorIdService, setDistributorIdService] = useState("");
  const [isOpenRejectionReasonDialog, setIsOpenRejectionReasonDialog] =
    useState(false);
    const [isOpenDistributorVerifyDialog, setIsOpenDistributorVerifyDialog] =
    useState(false);

  const agentsState: any = useSelector((state: RootState) => state.agents);

  const { page, rowsPerPage, items, isTableLoading, searchValue ,dateFilter ,filterBy  } = agentsState;

  const dispatch = useDispatch<AppDispatch>();
  const { data, isFetching, isLoading } = useGetDistributorsQuery({
    limit: rowsPerPage,
    searchValue: searchValue,
    params: paramsList,
    page: page,
    filterBy: filterBy,
    dateFilter:dateFilter,
    orderBy: "createdAt",
    orderByValue: -1,
    isPaginationRequired: true,
  });
  const [blockUnblock] = useDistributorblockUnblockMutation();
  const [exportData] = useExportDistributorDataMutation();
  const [categories, setCategories] = useState<any>({});
  const [services, setServices] = useState<any>([]);

  const getActionOptions: (row: DistributorListResponse) => OptionType[] = (
    row: DistributorListResponse
  ) => {
    switch (row.status) {
      case "VERIFIED":
        return [
          {
            accessAction:AccessAction.UPDATE_USER_STATUS,
            label: (
              <div className="text-slate-500 flex items-center gap-2">
                <BiCategory className="text-lg" /> Category
              </div>
            ),
            onClick: () => {
              setDistributorId(row._id);
              setCategories(row.category);
              setIsOpenCategoryDialog(true);
            },
          },
          {
            accessAction:AccessAction.UPDATE_USER_STATUS,
            label: (
              <div className="text-slate-500 flex items-center gap-2">
                <BsCreditCard2Back className="text-lg" /> Service
              </div>
            ),
            onClick: () => {
              setIsOpenServiceDialog(true);
              setDistributorIdService(row._id);
              setServices(row.services);
            },
          },
          {
            accessAction: AccessAction.BLOCK,
            label: row.isBlocked ? (
              <div className="text-green-500 flex items-center gap-2">
                <HiOutlineLockOpen className="text-lg" /> Un-Block{" "}
              </div>
            ) : (
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

      case "PENDING":
        return [
          {
            noAuthRequired: true,
            accessAction: "VERIFY",
            label: (
              <div className="text-green-600 flex items-center gap-2">
                <FcApproval className="text-xl" /> Verify
              </div>
            ),
            onClick: () => {
              setDistributorId(row._id);
              setIsOpenDistributorVerifyDialog(true)
            },
          },
          {
            noAuthRequired: true,
            accessAction: "REJECT",
            label: (
              <div className="text-red-600 flex items-center gap-2">
                <MdOutlineCancel className="text-xl" /> Reject
              </div>
            ),
            onClick: () => {
              setDistributorId(row._id);
              setIsOpenRejectionReasonDialog(true);
            },
          },
          {
            accessAction: "BLOCK_USER",
            label: row.isBlocked ? (
              <div className="text-green-500 flex items-center gap-2">
                <HiOutlineLockOpen className="text-lg" /> Un-Block{" "}
              </div>
            ) : (
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
        case "REJECTED":
          return [
            {
              noAuthRequired: true,
              accessAction: "VERIFY",
              label: (
                <div className="text-green-600 flex items-center gap-2">
                  <FcApproval className="text-xl" /> Re-Verify
                </div>
              ),
              onClick: () => {
                setDistributorId(row._id);
                setIsOpenDistributorVerifyDialog(true)
              },
            },
            {
              accessAction: AccessAction.BLOCK,
              label: row.isBlocked ? (
                <div className="text-green-500 flex items-center gap-2">
                  <HiOutlineLockOpen className="text-lg" /> Un-Block{" "}
                </div>
              ) : (
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

      default:
        return [
          {
            accessAction: AccessAction.BLOCK,
            label: row.isBlocked ? (
              <div className="text-green-500 flex items-center gap-2">
                <HiOutlineLockOpen className="text-lg" /> Un-Block{" "}
              </div>
            ) : (
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
    }
  };

  // Table Columns
  const columns: columnTypes[] = [ 
    {
      field: "createdAt",
      noAuthRequired: true,
      headerName: "Date - Time",
      flex: "flex-[1_1_0%]",
      renderCell: (row: DistributorListResponse) => (
        <div>
          <div className="text-slate-700 font-medium">
            {formatDateAndTime(row.createdAt, "DD MMM yyyy")}
          </div>
          <div className="text-[13px] font-medium text-slate-400">
            {formatDateAndTime(row.createdAt, "hh:mm A")}
          </div>
        </div>
      ),
    },

    {
      noAuthRequired: true,
      field: "block",
      headerName: "",
      flex: "flex-[0.2_0.2_0%]",
      renderCell: (row: DistributorListResponse) =>
        row.isBlocked && (
          <Tooltip title="This Distibutor is blocked">
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
    },
    {
      field: "dob",
      headerName: "DOB",
      flex: "flex-[1_1_0%]",
      renderCell: (row: DistributorListResponse) => {
        return (
          <span> {moment(row.dob, "yyyy-MM-DD").format("DD-MM-yyyy")} </span>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      flex: "flex-[2_2_0%]",
      renderCell: (row: DistributorListResponse) => {
        return (
          <div className="flex justify-between w-full items-center pr-2 overflow-hidden">
            <div className="w-[calc(100%-30px)]  overflow-hidden text-ellipsis">
              {" "}
              {row.email}{" "}
            </div>
            {row.emailVerified && (
              <div className="w-[25px] flex justify-end">
                <MdMarkEmailRead className="text-lg text-green-500" />
              </div>
            )}
          </div>
        );
      },
    },
    {
      field: "mobileNumber",
      headerName: "Mobile",
      flex: "flex-[1_1_0%]",
      renderCell: (row: DistributorListResponse) => {
        return (
          <div className="flex justify-between w-full items-center pr-2 overflow-hidden">
            <div className="w-[calc(100%-30px)]  overflow-hidden text-ellipsis">
              {" "}
              {row.mobileNumber}{" "}
            </div>
            {row.mobileNumberVerified && (
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
      headerName: "SJBT Code",
      flex: "flex-[1_1_0%]",
      renderCell: (row: DistributorListResponse) => {
        return <span> {row.sjbtCode} </span>;
      },
    },
    {
      field: "status",
      headerName: "Status",
      flex: "flex-[1_1_0%]",
      renderCell: (row: DistributorListResponse) => {
        return (
          <div>
            <span
              className={`font-medium ${
                VerificationStatus[row.status]?.textColor
              }`}
            >
              {" "}
              {VerificationStatus[row.status]?.value}{" "}
            </span>
          </div>
        );
      },
    },
    {
      noAuthRequired: true,
      field: "actions",
      headerName: "Actions",
      align: "start",
      renderCell: (row: DistributorListResponse) => {
        return (
          <ATMMenu
            moduleName="DISTRIBUTORS"
            disabled={actionDisableStatus.includes(row.status)}
            options={getActionOptions(row)}
          />
        );
      },
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

  // Handle Export
  const handleExport = (done: () => void, isAllExport: boolean) => {
    isAllExport ? setIsAllExporting(true) : setIsCurrentExporting(true);
    exportData({
      limit: rowsPerPage,
      searchValue: searchValue,
      params: paramsList,
      page: page,
      filterBy: filterBy,
    dateFilter:dateFilter,
      orderBy: "createdAt",
      orderByValue: -1,
      isPaginationRequired: !isAllExport,
    }).then((res: any) => {
      setDataToExport(res?.data?.data);
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
          <DistributorListing
            columns={getColumns(columns, "DISTRIBUTORS")}
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

      {isOpenCategoryDialog && (
        <CategoryDialogWrapper
          onClose={() => setIsOpenCategoryDialog(false)}
          distributorId={distributorId}
          categories={categories}
        />
      )}
      {isOpenServiceDialog && (
        <ServiceDialogWrapper
          onClose={() => setIsOpenServiceDialog(false)}
          distributorId={distributorIdService}
          services={services}
        />
      )}

      {isOpenRejectionReasonDialog && (
        <RejectionReasonDialogWrapper
          onClose={() => setIsOpenRejectionReasonDialog(false)}
          distributorId={distributorId}
        />
      )} 
      {isOpenDistributorVerifyDialog && (
        <DistributorVerifyDialogWrapper
        onClose={() => setIsOpenDistributorVerifyDialog(false)}
        distributorId={distributorId}
        />
      )}
    </>
  );
};

export default DistributorListingWrapper;
