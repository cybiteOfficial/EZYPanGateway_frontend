import React from "react";
import SateListWrapper from "../Tab/state/list/StateListWrapper";
import ATMBreadCrumbs, {
  BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import { IoPersonCircleOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import DistrictListWrapper from "../Tab/district/list/DistrictListWrapper";

const GumastaConfiguration = () => {
  const breadcrumbs: BreadcrumbType[] = [
    {
      label: "Dashboard",
      path: "/",
      icon: IoPersonCircleOutline,
    },
    {
      label: "Gumasta Loactions",
      icon: RxDashboard,
    },
  ];

  return (
    <div  className="flex flex-col gap-2 px-4 py-3 h-full">
      <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
      <div className="grid grid-cols-2 gap-3 border p-2">
        {/* Breadcrumbs */}
        <SateListWrapper />
        <DistrictListWrapper/>
      </div>
    </div>
  );
};

export default GumastaConfiguration;
