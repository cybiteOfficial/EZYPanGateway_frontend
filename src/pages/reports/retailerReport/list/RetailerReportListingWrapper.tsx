import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/Report/RetailerReportSlice";
import { AppDispatch, RootState } from "src/redux/store";
import {  useGetRetailerReportsQuery } from "src/services/AdminServices";
import RetailerReportListing from "./RetailerReportListing";

const RetailerReportListingWrapper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchValue, dateFilter } = useSelector(
    (state: RootState) => state.retailerReport
  );

  const { data, isLoading, isFetching } = useGetRetailerReportsQuery({
    limit: 10,
    searchValue: searchValue,
    params: ["_id", "mobileNumber", "createdAt", "updatedAt" ],
    page: 1,
    filterBy: [
      {
        fieldName: "",
        value: [],
      },
    ],
    orderBy: "createdAt",
    orderByValue: -1,
    dateFilter: dateFilter,
    isPaginationRequired: true,
  });

  // Setting Items
  useEffect(() => {
    if (!isFetching && !isLoading) {
      dispatch(setIsTableLoading(false));
      dispatch(setItems(data?.data || []));
      dispatch(setTotalItems(data?.totalItem || 0));
    } else {
      dispatch(setIsTableLoading(true));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isFetching, data]);

  return (
    <>
      <SideNavLayout>
        <RetailerReportListing />
      </SideNavLayout>
    </>
  );
};

export default RetailerReportListingWrapper;
