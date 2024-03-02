import React, { useState } from "react";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { ContactUsEnquiryListResponse } from "src/models/ContactUsEnquiry.model";
import { formatDateAndTime } from "src/utils/dateAndTime";
import ContactUsEnquiryListing from "./ContactUsEnquiryListing";
import ViewMessageDialog from "./Dialogs/ViewMessageDialog";
import ReplyDialogWrapper from "./Dialogs/ReplyDialogBox/ReplyDialogWrapper";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { BsReplyFill } from "react-icons/bs";
import {
  useExportContactUsDataMutation,
  useGetContactUsEnquiryQuery,
} from "src/services/ContactUsEnquiryService";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/redux/store";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/ContactUsEnquirySlice";
import moment from "moment";
import { getColumns } from "src/utils/auth/getColumns";

const paramList = [
  "_id",
  "name",
  "email",
  "mobile",
  "message",
  "createdAt",
  "updatedAt",
];

const exportDataHeaders = [
  { label: "Date-Time", key: "createdAt" },
  { label: "Name", key: "name" },
  { label: "Email", key: "email" },
  { label: "Mobile Number", key: "mobile" },
  { label: "Message", key: "message" },
];

const ContactUsEnquiryListingWrapper = () => {
  const [isAllExporting, setIsAllExporting] = useState(false);
  const [isCurrentExporting, setIsCurrentExporting] = useState(false);
  const [isOpenViewMessageDialog, setisOpenViewMessageDialog] = useState(false);
  const [isOpenReplyDialog, setIsOpenReplyDialog] = useState(false);
  const [contactUsEnquiryData, setContactUsEnquiryData] = useState<{
    id: string;
    email: string;
  } | null>(null);

  const [messages, setMessage] = useState("");
  const [exportData] = useExportContactUsDataMutation();
  const [dataToExport, setDataToExport] = useState([]);

  const handleClose = () => {
    setisOpenViewMessageDialog(false);
  };

  const contactUsEnquiryState: any = useSelector(
    (state: RootState) => state.contactUsEnquiry
  );

  const { page, rowsPerPage, items, searchValue, dateFilter } =
    contactUsEnquiryState;

  const dispatch = useDispatch<AppDispatch>();
  const { data, isFetching, isLoading } = useGetContactUsEnquiryQuery({
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
      dateFilter: dateFilter,
      orderBy: "createdAt",
      orderByValue: -1,
      isPaginationRequired: !isAllExport,
    }).then((res: any) => {
      let formattedData = res?.data?.data?.map(
        (data: ContactUsEnquiryListResponse) => {
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

  const columns: columnTypes[] = [
    {
      noAuthRequired:true,
      field: "date_and_time",
      headerName: "Date - Time",
      flex: "flex-[1_1_0%]",
      renderCell: (row: ContactUsEnquiryListResponse) => (
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
      renderCell: (row: ContactUsEnquiryListResponse) => (
        <span> {row.name} </span>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: ContactUsEnquiryListResponse) => {
        return <span> {row.email} </span>;
      },
    },
    {
      field: "mobile",
      headerName: "Mobile",
      flex: "flex-[1_1_0%]",
    },
    {
      field: "message",
      headerName: "Query",
      flex: "flex-[1_1_0%]",
      renderCell: (row: ContactUsEnquiryListResponse) => {
        const handleClickOpen = () => {
          setMessage(row.message);
          setisOpenViewMessageDialog(true);
        };
        return (
          <button
            className="text-primary-main  hover:underline"
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
      renderCell: (row: ContactUsEnquiryListResponse) => {
        const handleClick = () => {
          setContactUsEnquiryData({ id: row._id, email: row.email });
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
        <ContactUsEnquiryListing
          columns={
            getColumns(columns,"CONTACT_US_ENQUIRIES")}
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
          contactUsEnquiryData={contactUsEnquiryData}
        />
      )}
    </>
  );
};

export default ContactUsEnquiryListingWrapper;
