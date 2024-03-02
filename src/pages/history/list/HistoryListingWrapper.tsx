import React from "react";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import HistoryListing from "./HistoryListing";

type Props = {};

const HistoryListingWrapper = (props: Props) => {
  return (
    <SideNavLayout>
      <HistoryListing />
    </SideNavLayout>
  );
};

export default HistoryListingWrapper;
