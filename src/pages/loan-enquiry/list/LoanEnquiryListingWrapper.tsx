import React, { useState } from "react";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { LoanEnquiryListResponse } from "src/models/LoanEnquiry.model";
import { formatDateAndTime } from "src/utils/dateAndTime";
import LoanEnquiryListing from "./LoanEnquiryListing";
import ViewMessageDialog from "./Dialogs/ViewMessageDialog";
import ReplyDialogWrapper from "./Dialogs/ReplyDialogBox/ReplyDialogWrapper";
import { AppDispatch, RootState } from "src/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  useExportLoanEnquiryDataMutation,
  useGetLoanEnquiryQuery,
} from "src/services/LoanEnquiryService";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/loanEnquirySlice";
import { BsReplyFill } from "react-icons/bs";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import moment from "moment";

import { getColumns } from "src/utils/auth/getColumns";

const paramList = [
  "_id",
  "name",
  "email",
  "mobile",
  "loanType",
  "currentResidencePincode",
  "monthlySalary",
  "currentCompanyName",
  "address",
  "message",
  "createdAt",
  "updatedAt",
];

const exportDataHeaders = [
  { label: "Date", key: "createdAt" },
  { label: "Name", key: "name" },
  { label: "Email", key: "email" },
  { label: "Mobile Number", key: "mobile" },
  { label: "Loan Type", key: "loanType" },
  { label: "Employee Type", key: "employeeType" },
  { label: "Current Residence Pincode", key: "currentResidencePincode" },
  { label: "Monthly Salary", key: "monthlySalary" },
  { label: "Current Company Name", key: "currentCompanyName" },
  { label: "Address", key: "address" },
  { label: "Message", key: "message" },
];

const LoanEnquiryListingWrapper = () => {
  const [isAllExporting, setIsAllExporting] = useState(false);
  const [isCurrentExporting, setIsCurrentExporting] = useState(false);
  const [isOpenViewMessageDialog, setisOpenViewMessageDialog] = useState(false);
  const [isOpenReplyDialog, setIsOpenReplyDialog] = useState(false);
  const [loanEnquiryData, setLoanEnquiry] = useState<{
    id: string;
    email: string;
  } | null>(null);
  const [messages, setMessage] = useState("");
  const [exportData] = useExportLoanEnquiryDataMutation();
  const [dataToExport, setDataToExport] = useState([]);

  const handleClose = () => {
    setisOpenViewMessageDialog(false);
  };
  const loanEnquiryState: any = useSelector(
    (state: RootState) => state.loanEnquiry
  );

  const { page, rowsPerPage, items, searchValue, dateFilter } =
    loanEnquiryState;

  const dispatch = useDispatch<AppDispatch>();
  const { data, isFetching, isLoading } = useGetLoanEnquiryQuery({
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
    dateFilter: dateFilter,
    orderBy: "createdAt",
    orderByValue: -1,
    isPaginationRequired: true,
  });

  // Handle Export
  const handleExport = (done: () => void, isAllExport: boolean) => {
    isAllExport ? setIsAllExporting(true) : setIsCurrentExporting(true);
    exportData({
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
      dateFilter:dateFilter,
      orderBy: "createdAt",
      orderByValue: -1,
      isPaginationRequired: !isAllExport,
    }).then((res: any) => {
      let formattedData = res?.data?.data?.map(
        (data: LoanEnquiryListResponse) => {
          return {
            ...data,
            createdAt: moment(data?.createdAt).format("DD-MM-yyyy hh:mm A"),
          };
        }
      );
      setDataToExport(formattedData);
      setTimeout(() => {
        done();
        isAllExport ? setIsAllExporting(false) : setIsCurrentExporting(false);
        document.body.click();
      }, 800);
    });
  };
  // Setting data
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
      noAuthRequired: true,
      field: "date_and_time",
      headerName: "Date - Time",
      flex: "flex-[1_1_0%]",
      renderCell: (row: LoanEnquiryListResponse) => (
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
      field: "name",
      headerName: "Name",
      flex: "flex-[1_1_0%]",
      renderCell: (row: LoanEnquiryListResponse) => <span> {row.name} </span>,
    },
    {
      field: "email",
      headerName: "Email",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: LoanEnquiryListResponse) => {
        return <span> {row.email} </span>;
      },
    },
    {
      field: "mobile",
      headerName: "Mobile",
      flex: "flex-[1_1_0%]",
    },
    {
      field: "loanType",
      headerName: "Loan Type",
      flex: "flex-[1_1_0%]",
      renderCell: (row: LoanEnquiryListResponse) => (
        <span> {row.loanType} </span>
      ),
    },
    {
      field: "employeeType",
      headerName: "Employee Type",
      flex: "flex-[1_1_0%]",
      renderCell: (row: LoanEnquiryListResponse) => (
        <span> {row.employeeType} </span>
      ),
    },
    {
      field: "message",
      headerName: "Query",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: LoanEnquiryListResponse) => {
        const handleClickOpen = () => {
          setMessage(row.message);
          setisOpenViewMessageDialog(true);
        };
        return (
          <button
            className="text-primary-main hover:underline"
            onClick={handleClickOpen}
          >
            View Message
          </button>
        );
      },
    },
    {
      noAuthRequired:true,
      field: "actions",
      headerName: "Actions",
      flex: "flex-[1_1_0%]",
      renderCell: (row: LoanEnquiryListResponse) => {
        const handleClick = () => {
          setLoanEnquiry({ id: row._id, email: row.email });
          setIsOpenReplyDialog(true);
        };

        return row.isReplied ? (
          <span className="text-green-500 font-medium flex gap-1 items-center">
            <IoCheckmarkDoneSharp className="text-lg" /> Replied
          </span>
        ) : (
          <button
            className=" bg-green-500 text-white hover:bg-green-600 py-1  px-3 rounded flex gap-2 items-center"
            onClick={handleClick}
          >
            <BsReplyFill className="text-lg" /> Reply
          </button>
        );
      },
    },
  ];
  return (
    <>
      <SideNavLayout>
        
          <LoanEnquiryListing
            columns={getColumns(columns, "LOAN_ENQUIRIES")}
            rows={items}
            onExport={handleExport}
            isAllExporting={isAllExporting}
            isCurrentExporting={isCurrentExporting}
            exportDataHeaders={exportDataHeaders}
            exportData={dataToExport}
          />
      </SideNavLayout>
      {isOpenViewMessageDialog && (
        <ViewMessageDialog onClose={handleClose} message={messages} />
      )}
      {isOpenReplyDialog && (
        <ReplyDialogWrapper
          onClose={() => setIsOpenReplyDialog(false)}
          loanEnquiryData={loanEnquiryData}
        />
      )}
    </>
  );
};

export default LoanEnquiryListingWrapper;
