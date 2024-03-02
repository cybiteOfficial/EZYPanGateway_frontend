import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { NewRegistrationRewardListResponse } from "src/models/NewRegistartionReward.model";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/NewRegistartionRewardSlice";
import { AppDispatch, RootState } from "src/redux/store";
import { useGetNewRegistrationRewardServiceQuery } from "src/services/NewRegistrationRewardService";
import NewRegistratiRewardListing from "./NewRegistratiRewardListing";
import { formatDateAndTime } from "src/utils/dateAndTime";
import { getColumns } from "src/utils/auth/getColumns";
const paramList = [
  "_id",
  "updatedById",
  "updatedRetailerRegisterRewardPoint",
  "previousRetailerRegisterRewardPoint",
  "isDeleted",
  "isActive",
  "createdAt",
  "updatedAt"
];


const NewRegistratiRewardListingWrapper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const newRegistrationRewardState: any = useSelector((state: RootState) => state.newRegistrationReward);
  const { items, rowsPerPage, page, searchValue } = newRegistrationRewardState;

  const { data, isLoading, isFetching } = useGetNewRegistrationRewardServiceQuery({
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
    isPaginationRequired: true,
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
      noAuthRequired:true,
      field: "updatedAt",
      headerName: "Date",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: NewRegistrationRewardListResponse) =>
       (
        <span>{formatDateAndTime(row.updatedAt,"DD MMM yyyy")}</span>
      ),
    },
    {
      field: "updatedRetailerRegisterRewardPoint",
      headerName: "Retailer Register Reward Point Value",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: NewRegistrationRewardListResponse) => (
        <span > {row.updatedRetailerRegisterRewardPoint} </span>
      ),
    },

  ];

  return (
    <>
        <NewRegistratiRewardListing 
        columns={getColumns(columns,"RETAILER_REGISTER_REWARDS")}
         rows={items} />
    </>
  );
};

export default NewRegistratiRewardListingWrapper;
