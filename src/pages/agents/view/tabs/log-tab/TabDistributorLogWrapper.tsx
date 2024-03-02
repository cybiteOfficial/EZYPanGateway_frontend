import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "src/redux/store";
import { useGetUserLogsQuery } from "src/services/UserServices";
import {
  setTotalItems,
  setItems,
  setFilterBy,
  setIsTableLoading,
  setDateFilter
} from "src/redux/slices/TabDistributorLogsSlice";
import TabDistributorLog from "./TabDistributorLog";
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
const TabDistributorLogWrapper = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { distributorId } = useParams();

  const distributorLogsState: any = useSelector(
    (state: RootState) => state.tabDistributorLog
  );
  const { page, filterBy, items , dateFilter  } = distributorLogsState;
  const { data, isFetching, isLoading } = useGetUserLogsQuery({
    limit: 15,
    searchValue: "",
    params: paramList,
    page: page,
    filterBy: filterBy,
    dateFilter: dateFilter ,
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
          filterBy.map((filter : any) => {
            if (filter.fieldName === "userId") {
              return {
                ...filter,
                value: [distributorId || ""],
              };
            } else {
              return filter;
            }
          })
        )
      );
  
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [distributorId]);
  
  return (
    <div className="h-full">
      <TabDistributorLog />
    </div>
  );
};

export default TabDistributorLogWrapper;
