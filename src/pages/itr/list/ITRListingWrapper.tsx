import React, { useState } from "react";
import { useDispatch } from "react-redux";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import { resetState } from "src/redux/slices/ITRSlice";
import { AppDispatch } from "src/redux/store";
import {
  useGetITRStatusWiseCountQuery,
} from "src/services/ITRApplicationServices";
import ITRListing from "./ITRListing";

const ITRListingWrapper = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [statusWiseCount, setStatusWiseCount] = useState<any>(null);
  const [isCountLoading, setIsCountLoading] = useState(false);

  React.useEffect(() => {
    dispatch(resetState());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // GET Status wise count

  const {
    data: statusWiseCountData,
    isLoading: isStatusWiseCountLoading,
    isFetching: isStatusWiseCountFetching,
  } = useGetITRStatusWiseCountQuery("");

  //Setting Status wise count
  React.useEffect(() => {
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
        <ITRListing
          statusWiseCount={statusWiseCount}
          isCountLoading={isCountLoading}
        />
      </SideNavLayout>
    </>
  );
};

export default ITRListingWrapper;
