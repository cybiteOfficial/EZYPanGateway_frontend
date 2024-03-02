import React from "react";
import { BiCategory } from "react-icons/bi";
import { Outlet } from "react-router-dom";
import ServiceViewLayout from "../../ServiceViewLayout/ServiceViewLayout";

type Props = {};

const TabITRServiceWrapper = (props: Props) => {

  const navItemsList = [
    {
      label: "Categories",
      path:"categories",
      icon: BiCategory,
    },
    {
      label: "Commission",
      path:"commission",
      icon: BiCategory,
    },
    {
      label: "Reward",
      path:"reward",
      icon: BiCategory,
    },
  ];

  return (
    <ServiceViewLayout navItemList={navItemsList} >
      <Outlet/>
    </ServiceViewLayout>
  );
};

export default TabITRServiceWrapper;
