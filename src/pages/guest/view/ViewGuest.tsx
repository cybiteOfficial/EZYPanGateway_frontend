import React from "react";
import { BiAbacus } from "react-icons/bi";
import ViewLayout from "src/components/layouts/ViewLayout/ViewLayout";
import { BreadcrumbType } from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import { GuestListResponse } from "src/models/Guest.model";
import {
  useGetSingleGuestQuery,
} from "src/services/GuestServices";
import GuestInfoCard from "./GuestInfoCard";
import { getTabs } from "src/utils/auth/getTabs";
import { useParams } from "react-router-dom";


type Props = {};

const breadcrumbs: BreadcrumbType[] = [
  {
    label: "Guest List",
    path: "/guest",
  },
  {
    label: "Guest View",
  },
];

const tabs = [
  {
    label: "APPLICATIONS",
    moduleName: [
      "PAN_APPLICATIONS",
      "ITR_APPLICATIONS",
      "GUMASTA_APPLICATIONS",
      "DSC_APPLICATIONS",
      "MSME_APPLICATIONS",
      "STC_DIGITAL_PAN",
    ],
    type: "MODULE",
    icon: BiAbacus,
    path: "applications",
  },
  {
    label: "LOGS",
    icon: BiAbacus,
    path: "log",
  },

]

const ViewGuest = (props: Props) => {
  const [selectedGuest, setSelectedGuest] =
    React.useState<GuestListResponse | null>(null);

  const { guestId } = useParams();


  // Get Single Query
  const {
    data: singleGuest,
    isFetching: isSingleGuestFetching,
    isLoading: isSingleGuestLoading,
  } = useGetSingleGuestQuery(guestId);

  // Setting Selected Retailer
  React.useEffect(() => {
    if (!isSingleGuestFetching && !isSingleGuestLoading) {
      setSelectedGuest(singleGuest?.data || null);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSingleGuestFetching, isSingleGuestLoading, singleGuest]);

  return (
    <ViewLayout
      breadcrumbs={breadcrumbs}
      hideSearchBox
      infoCard={
        <GuestInfoCard
          infoData={{
            mobile: selectedGuest?.mobileNumber || "",
          }}
          isInfoLoading={isSingleGuestFetching || isSingleGuestLoading}
        />
      }
      tabs={getTabs(tabs)}
      
    />
  );
};

export default ViewGuest;
