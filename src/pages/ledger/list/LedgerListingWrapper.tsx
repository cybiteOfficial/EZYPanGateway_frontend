import React from "react";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import LedgerListing from "./LedgerListing";

type Props = {};

const LedgerListingWrapper = (props: Props) => {
  return (
    <SideNavLayout>
      <LedgerListing />
    </SideNavLayout>
  );
};
export default LedgerListingWrapper
