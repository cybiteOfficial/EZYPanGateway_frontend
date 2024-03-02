import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { DigitalPANListResponse } from "src/models/DigitalPAN.model";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/DigitalPANSlice";
import { AppDispatch, RootState } from "src/redux/store";
import { useGetDigitalPanPendingApplicationsQuery } from "src/services/DigitalPanService";
import { formatDateAndTime } from "src/utils/dateAndTime";
import { getColumns } from "src/utils/auth/getColumns";
import DigitalPanGenerateListing from "./DigitalPanListing";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import { applicationStatus } from "src/pages/history/list/Dialog/HistoryDialog";

const paramList = [
  "_id",
  "txnId",
  "mobileNumber",
  "applicationStatus",
  "status",
  "transactions",
  "agentID",
  "createdAt",
  "updatedAt"
];

const DigitalPanListingWrapper = () => {
  // Dispatch Hook
  const dispatch = useDispatch<AppDispatch>();
  // Slice
  const DigitalPanApplicationState: any = useSelector(
    (state: RootState) => state?.DigitalPANSlice
  );
  const { items, searchValue, rowsPerPage, page, filterBy, dateFilter } =
    DigitalPanApplicationState;

  // Get Data Query
  const { data, isFetching, isLoading } = useGetDigitalPanPendingApplicationsQuery({
    limit: rowsPerPage,
    searchValue: searchValue,
    params: paramList,
    page: page,
    filterBy: filterBy,
    dateFilter: dateFilter,
    orderBy: "createdAt",
    orderByValue: 1,
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

  const columns: columnTypes[] = [
    {
      field: "createdAt",
      headerName: "Date - Time",
      flex: "flex-[1_1_0%]",
      noAuthRequired:true ,
      renderCell: (row: DigitalPANListResponse) => (
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
      field: "mobileNumber",
      headerName: "Mobile",
      flex: "flex-[1_1_0%]",
    },
    {
      field: "status",
      headerName: "Status",
      flex: "flex-[1_1_0%]",
      renderCell: (row: DigitalPANListResponse) => (
        <span className={`text-ellipsis overflow-hidden ${applicationStatus(row)?.className} font-semibold`}> {applicationStatus(row)?.label} </span>
      ),
    },
    {field: "appliedByName",
    headerName: "Distributor Name",
    flex: "flex-[1_1_0%]",
    renderCell: (row: DigitalPANListResponse) => (
      <span className={`text-ellipsis overflow-hidden  font-semibold`}>{row?.appliedByName} </span>
    ),
  },
  {
    field: "totalPrice",
    headerName: "Total Price",
    flex: "flex-[1_1_0%]",
    renderCell: (row: DigitalPANListResponse) => (
      <span className={`text-ellipsis overflow-hidden  font-semibold`}>{row?.totalPrice} </span>
    ),
  },
  {field: "Type",
  headerName: "Application Type",
  flex: "flex-[1_1_0%]",
  renderCell: (row: DigitalPANListResponse) => (
    <span className={`overflow-hidden  `}>{row?.Type  ==='N' ? 'New Pan' :'Correction Pan'    } </span>
  ),
},
{field: "Transactions",
headerName: "Acknowledgment No.",
flex: "flex-[1_1_0%]",
renderCell: (row: DigitalPANListResponse) => (
  <span className={`overflow-hidden  `}>{row?.Transactions?.AckNo} </span>
),
},


  ];

  return (
    <>
    <SideNavLayout>
    <DigitalPanGenerateListing
        columns={getColumns(columns, "DIGITAL_PAN_APPLICATIONS")}
        rows={items}
      />
    </SideNavLayout>
    </>
  );
};

export default DigitalPanListingWrapper;

