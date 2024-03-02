import React from "react";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import Services from "./Services";

type Props = {};

const ServicesWrapper = (props: Props) => {
  return (
    <SideNavLayout>
      <Services />
    </SideNavLayout>
  );
};

export default ServicesWrapper;
