import React, { useState } from "react";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import GumastaListing from "./GumastaListing";
import { useGetGumastaStatusWiseCountQuery } from "src/services/GumastaService";

const GumastaListingWrapper = () => {
  const [statusWiseCount, setStatusWiseCount] = useState<any>(null);
  const [isCountLoading, setIsCountLoading] = useState(false);

  // GET Status wise count
  const {
    data: statusWiseCountData,
    isLoading: isStatusWiseCountLoading,
    isFetching: isStatusWiseCountFetching,
  } = useGetGumastaStatusWiseCountQuery("");

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
        <GumastaListing
          statusWiseCount={statusWiseCount}
          isCountLoading={isCountLoading}
        />
      </SideNavLayout>
    </>
  );
};

export default GumastaListingWrapper;
