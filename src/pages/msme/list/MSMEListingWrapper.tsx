import React, { useState } from "react";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import MSMEListing from "./MSMEListing";
import {
  useGetMSMEStatusWiseCountQuery,
} from "src/services/MSMEService";


const MSMEListingWrapper = () => {

  const [statusWiseCount, setStatusWiseCount] = useState<any>(null);
  const [isCountLoading, setIsCountLoading] = useState(false);

  // GET Status wise count
  const {
    data: statusWiseCountData,
    isLoading: isStatusWiseCountLoading,
    isFetching: isStatusWiseCountFetching,
  } = useGetMSMEStatusWiseCountQuery("");

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
        <MSMEListing
          statusWiseCount={statusWiseCount}
          isCountLoading={isCountLoading}
        />
      </SideNavLayout>
    </>
  );
};

export default MSMEListingWrapper;
