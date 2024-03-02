import React from "react";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import ListBusinessOppurtunity from "./ListBusinessOppurtunity";
import { BusinessOpportunityListResponse } from "src/models/BusinessOpportunity.model";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/redux/store";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/BusinessOpportunitySlice";
import ATMMenu from "src/components/UI/atoms/ATMMenu/ATMMenu";
import { RxPencil1 } from "react-icons/rx";
import { useGetBusinessOpportunityQuery } from "src/services/BusinessOpportunityService";
import { useNavigate } from "react-router-dom";
import { getColumns } from "src/utils/auth/getColumns";
import { AccessAction } from "src/utils/Enums/AccessAction";

const paramList = [
  "_id",
  "serviceName",
  "commission",
  "retailerReward",
  "isDeleted",
  "isActive",
  "createdAt",
  "updatedAt",
];

const ListBusinessOppurtunityWrapper = () => {
  const navigate = useNavigate();
  const getActionOptions = (row: BusinessOpportunityListResponse) => {
    return [
      {
        accessAction: AccessAction.EDIT,
        label: (
          <div className="flex gap-2 items-center text-secondary-main">
            <RxPencil1 className="text-lg" /> Edit
          </div>
        ),
        onClick: () => {
          navigate(`/business-opportunity/${row._id}/edit`);
        },
      },
    ];
  };

  const dispatch = useDispatch<AppDispatch>();

  const businessOpportunityState: any = useSelector(
    (state: RootState) => state.businessOpportunity
  );
  const { items, page, rowsPerPage, searchValue } = businessOpportunityState;
  // Fetching Data
  const { data, isFetching, isLoading } = useGetBusinessOpportunityQuery({
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
      renderCell: (row: BusinessOpportunityListResponse) => (
        <span> {row.serviceName} </span>
      ),
    },
    {
      field: "commission",
      headerName: "Commission",
      flex: "flex-[1_1_0%]",
      renderCell: (row: BusinessOpportunityListResponse) => (
        <span> &#8377; {row.commission} </span>
      ),
    },
    {
      field: "retailerReward",
      headerName: " Reward Point",
      flex: "flex-[1_1_0%]",
      renderCell: (row: BusinessOpportunityListResponse) => (
        <span> &#8377; {row.retailerReward} </span>
      ),
    },
    {
      field: "actions",
      noAuthRequired:true,
      headerName: "Actions",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: BusinessOpportunityListResponse) => {
        const options = getActionOptions(row);

        return <ATMMenu 
        moduleName="BUSINESS_OPPORTUNITIES"

        options={options} />;
      },
      align: "start",
    },
  ];

  return (
    <>
      <SideNavLayout>
        <ListBusinessOppurtunity
         columns={getColumns(columns,"BUSINESS_OPPORTUNITIES")} 
        rows={items} />
      </SideNavLayout>
    </>
  );
};

export default ListBusinessOppurtunityWrapper;
