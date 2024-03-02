import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import TabRetailerLog from "./TabRetailerLog";
import { useGetUserLogsQuery } from "src/services/UserServices";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/redux/store";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
  setFilterBy,
  setDateFilter
} from "src/redux/slices/TabRetailerLogSlice";

const paramList = [
  "_id",
  "userId",
  "module",
  "module_action",
  "module_id",
  "resStatus",
  "statusCode",
  "remark",
  "createdAt",
  "updatedAt",
];

const TabRetailerLogWrapper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const retailerLogState: any = useSelector(
    (state: RootState) => state.retailerLog
  );
  const { items,  filterBy, searchValue, page, dateFilter } =
    retailerLogState;

  const { retailerId } = useParams();

  const { data, isFetching, isLoading } = useGetUserLogsQuery({
    limit: 13,
    searchValue: searchValue,
    params: paramList,
    page: page,
    filterBy: filterBy,
    dateFilter: dateFilter,
    orderBy: "createdAt",
    orderByValue: -1,
    isPaginationRequired: true,
  });

  // Setting data
  useEffect(() => {
    if (!isFetching && !isLoading) {
      dispatch(setIsTableLoading(false));
      dispatch(setItems([...items, ...(data?.data || [])]));
      dispatch(setTotalItems(data?.totalItem || 0));
    } else {
      dispatch(setIsTableLoading(true));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isFetching, data]);

  useEffect(()=>{
    if(dateFilter){
   dispatch(setItems([]))
   dispatch(setTotalItems(null))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[dateFilter])


  useEffect(() => {
    dispatch(setItems([]));
    dispatch(setTotalItems(null)); 
    dispatch(setDateFilter([])) 
    dispatch(
      setFilterBy(
        filterBy.map((filter: any) => {
          if (filter.fieldName === "userId") {
            return {
              ...filter,
              value: [retailerId || ""],
            };
          } else {
            return filter;
          }
        })
      )
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [retailerId]);

  return (
    <>
      <div className="h-full">
        <TabRetailerLog />
      </div>
    </>
  );
};

export default TabRetailerLogWrapper;
