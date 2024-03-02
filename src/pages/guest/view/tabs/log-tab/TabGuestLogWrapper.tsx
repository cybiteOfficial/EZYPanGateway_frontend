import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
  setFilterBy,
  setDateFilter
} from "src/redux/slices/TabGuestLogsSlice";
import { AppDispatch, RootState } from "src/redux/store";
import { useGetUserLogsQuery } from "src/services/UserServices";
import TabGuestLog from "./TabGuestLog";

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

const TabGuestLogWrapper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { page, filterBy, items , dateFilter } = useSelector(
    (state: RootState) => state.tabGuestLog
  );
  const { guestId } = useParams();

  const { data, isLoading, isFetching } = useGetUserLogsQuery({
    limit: 10,
    searchValue: "",
    params: paramList,
    page: page,
    filterBy: filterBy,
    dateFilter: dateFilter,
    orderBy: "createdAt",
    orderByValue: -1,
    isPaginationRequired: true,
  });

  // Setting Items
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
        filterBy.map((filter) => {
          if (filter.fieldName === "userId") {
            return {
              ...filter,
              value: [guestId || ""],
            };
          } else {
            return filter;
          }
        })
      )
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guestId]);

  return (
    <div className="h-full">
      <TabGuestLog />
    </div>
  );
};

export default TabGuestLogWrapper;
