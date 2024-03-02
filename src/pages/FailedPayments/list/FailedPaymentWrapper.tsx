import React from "react";
import FailedPayments from "./FailedPayments";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";

type Props = {};

const FailedPaymentWrapper = (props: Props) => {
  return (
    <SideNavLayout>
      <FailedPayments />
    </SideNavLayout>
  );
};

export default FailedPaymentWrapper;
