import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import { resetState } from "src/redux/slices/PANSlice";
import { AppDispatch } from "src/redux/store";
import DSCListing from "./DSCListing";
import { useGetDSCStatusWiseCountQuery } from "src/services/DSCService";

const DSCListingWrapper = () => {
  const [statusWiseCount, setStatusWiseCount] = useState<any>(null);
  const [isCountLoading, setIsCountLoading] = useState(false);

  // Dispatch Hook
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    dispatch(resetState());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // GET Status wise count
  const {
    data: statusWiseCountData,
    isLoading: isStatusWiseCountLoading,
    isFetching: isStatusWiseCountFetching,
  } = useGetDSCStatusWiseCountQuery("");

  //Setting Status wise count
  useEffect(() => {
    if (!isStatusWiseCountLoading && !isStatusWiseCountFetching) {
      setStatusWiseCount(statusWiseCountData?.data || null);
      setIsCountLoading(false);
    } else {
      setIsCountLoading(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isStatusWiseCountLoading,
    isStatusWiseCountFetching,
    statusWiseCountData,
  ]);

  return (
    <>
      <SideNavLayout>
        <DSCListing
          statusWiseCount={statusWiseCount}
          isCountLoading={isCountLoading}
        />
      </SideNavLayout>
    </>
  );
};

export default DSCListingWrapper;
