import React, { useEffect, useState } from "react";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import { DashbaordListResponse } from "src/models/Dashboard.model";
import { useGetDashboardDataQuery , useGetTotalUserCountQuery } from "src/services/DashboardServices";
import DashboardListing from "./DashboardListing";
import { useGetPendingApplicattionCountQuery } from "src/services/PendingApplicationService";

const DashboardListingWrapper = () => {

  const { data, isLoading, isFetching } = useGetDashboardDataQuery("");
  const [dashboardCountData, setDashboardCountData] =
    useState<DashbaordListResponse | null>(null);
    const[userCount , setUserCount] = useState<any>()
    
  const {
    data: pendingData,
    isLoading: pendngCountIsLoading,
    isFetching: pendngCountIsFetching,
  } = useGetPendingApplicattionCountQuery("");
  const [pendingApplicationCount, setPendingApplicationCount] =
  React.useState<any>(null);
  const {data:userData , isLoading:userDataIsLoading , isFetching:userDataIsFetching} = useGetTotalUserCountQuery('')



  React.useEffect(() => {
    if (!pendngCountIsLoading && !pendngCountIsFetching) {
      setPendingApplicationCount(pendingData?.data || null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendngCountIsLoading, pendngCountIsFetching, pendingData]);

  useEffect(() => {
    if (!isFetching && !isLoading) {
      setDashboardCountData(data?.data || null);
    }
  }, [isLoading, isFetching, data]);

  useEffect(()=>{
   setUserCount(userData?.data)
  },[userData , userDataIsFetching , userDataIsLoading])
  return (
    <>
      <SideNavLayout>
        
          <DashboardListing
            pendingApplicationCount={pendingApplicationCount}
            userCount={userCount}
            dashboardData={dashboardCountData}
            isLoading={isLoading || isFetching}
            isPendingLoading = {pendngCountIsLoading || pendngCountIsFetching || userDataIsLoading ||userDataIsFetching}
          />
      </SideNavLayout>
    </>
  );
};

export default DashboardListingWrapper;
