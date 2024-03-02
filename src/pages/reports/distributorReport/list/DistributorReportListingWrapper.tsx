import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/Report/DistributorReportSlice";
import { AppDispatch, RootState } from "src/redux/store";
import { useGetDistributorReportsQuery } from "src/services/AdminServices";
import DistributorReportListing from "./DistributorReportListing";

const DistributorReportListingWrapper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchValue, dateFilter } = useSelector(
    (state: RootState) => state.distributorReport
  );

  const { data, isLoading, isFetching } = useGetDistributorReportsQuery({
    limit: 10,
    searchValue: searchValue,
    params: ["_id", "name", "createdAt", "updatedAt"],
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
        <DistributorReportListing />
      </SideNavLayout>
    </>
  );
};

export default DistributorReportListingWrapper;
