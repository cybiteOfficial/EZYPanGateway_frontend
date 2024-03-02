import React from "react";
import { AiOutlineRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import ATMBreadCrumbs, {
  BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import {
  DashbaordListResponse,
  DashbaordPendingListResponse,
} from "src/models/Dashboard.model";

// BreadCrumbs
const breadcrumbs: BreadcrumbType[] = [
  {
    label: "Admin",
    path: "/dashboard",
  },
  {
    label: "Dashboard",
  },
];

type DashboardData = DashbaordListResponse | null;
type DashBoardPendingData = DashbaordPendingListResponse | null;
type Props = {
  pendingApplicationCount: DashBoardPendingData;
  dashboardData: DashboardData;
  isLoading: boolean;
  isPendingLoading: boolean;
userCount:any;
};

const DashboardListing = ({
  dashboardData,
  isLoading,
  pendingApplicationCount,
  isPendingLoading,
  userCount
}: Props) => {
  const navigate = useNavigate();

  type CardPropType = {
    label: React.ReactNode;
    value: React.ReactNode;
    path: string;
    className: string;

    labelSmall?: React.ReactNode;
    valueSmall?: React.ReactNode;
    pathSmall?: string

  };
  const userType = JSON.parse(localStorage.getItem("userData") || "{}");

  const InfoCard = ({ value, label, path, className, labelSmall, valueSmall, pathSmall }: CardPropType) => {
    if (isLoading || isPendingLoading) {
      return (
        <div
          className={`flex flex-col gap-2 bg-white rounded-lg shadow-lg p-6 border border-black animate-pulse ${className} `}
        >
          <h3 className="w-[220px] h-[25px] bg-slate-300 "> </h3>
          <p className=" w-[120px] h-[30px] bg-slate-300"> </p>
          <div className="w-[100px] h-[20px] bg-slate-300 mt-2"></div>
        </div>
      );
    }

    return (
      <div
        className={`bg-white rounded-lg shadow-lg p-6 border border-black ${className} flex justify-between`}
      >

        <div>
          <h3 className="text-sm text-white font-medium">{label}</h3>
          <p className="text-4xl text-white font-semibold pt-2">{value}</p>
          <button
            onClick={() => navigate(`/${path}`)}
            className="flex text-base text-white  pt-2 "
          >
            <div>MORE INFO </div>
            <div className="pt-1 pl-2 ">
              <AiOutlineRight />
            </div>
          </button>
        </div>

       {labelSmall &&  <div>
          <h3 className="text-sm text-white font-medium">{labelSmall}</h3>
          <p className="text-4xl text-white font-semibold pt-2">{valueSmall}</p>
          <button
            onClick={() => navigate(`/${pathSmall}`)}
            className="flex text-base text-white  pt-2 "
          >
            <div>MORE INFO </div>
            <div className="pt-1 pl-2 ">
              <AiOutlineRight />
            </div>
          </button>
        </div>
}


      </div>
    );
  };

  return (
    <div className="flex flex-col gap-2 px-4 py-3 h-full">
      <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
      {/* Page Header */}
      <div className="text-xl text-primary-dark font-medium">Dashboard</div>

      <div className="overflow-auto">
        <div className="text-base text-primary-dark font-medium">
          TOTAL APPLICATIONS
        </div>

        <div className="grow ">
          <div className="grid md:grid-cols-3 md:gap-8 gap-4 pt-2 ">
            <InfoCard
              label="PAN APPLICATION"
              className="bg-primary-1"
              value={dashboardData?.PanApplication}
              path="history/pan"
              labelSmall="Pending"
              valueSmall={pendingApplicationCount?.totalpanapplications}
              pathSmall="pan/PENDING"
            />
            <InfoCard
              label="ITR APPLICATION"
              className="bg-primary-2"
              value={dashboardData?.ItrApplication}
              path="history/itr"
              labelSmall="Pending"
              valueSmall={pendingApplicationCount?.totalitrapplications}
              pathSmall="itr/PENDING"
            />
            <InfoCard
              label="GUMASTA APPLICATION"
              className="bg-primary-3"
              value={dashboardData?.gumastaApplication}
              path="history/gumasta"
              labelSmall="Pending"
              valueSmall={pendingApplicationCount?.totalgumastaapplications }
              pathSmall="gumasta/PENDING"
            />
            <InfoCard
              className="bg-primary-4"
              label="DIGITAL SIGNATURE APPLICATION"
              value={dashboardData?.dscApplication}
              path="history/dsc"
              labelSmall="Pending"
              valueSmall={pendingApplicationCount?.totaldscapplications }
              pathSmall="dsc/PENDING"
            />
            <InfoCard
              label="MSME UDHYOG ADHAR APPLICATION"
              className="bg-primary-5"
              value={dashboardData?.msmeApplication}
              path="history/msme"
              labelSmall="Pending"
              valueSmall={pendingApplicationCount?.totalmsmeapplications }
              pathSmall="msme/PENDING"
            />
            <InfoCard
              label="DIGITAL PAN APPLICATION"
              className="bg-primary-6"
              value={null}
              path="digital-pan"
              labelSmall="Pending"
              valueSmall={0}
              pathSmall="digital-pan"
            />
            {userType?.type === "SUPER_ADMIN" &&  <InfoCard
              label="DISTRIBUTOR"
              className="bg-primary-7"
              value={userCount?.totalVerifiedDistributor}
              path="distributor"
              labelSmall="Pending"
              valueSmall={userCount?.totalPendingDistributor}
              pathSmall="distributor"
            />}
            {userType?.type === "SUPER_ADMIN" &&  <InfoCard
              label="RETAILER"
              className="bg-primary-8"
              value={userCount?.totalRetailer}
              path="retailer"
            />}
          </div>
        </div>
     
      
      </div>
    </div>
  );
};

export default DashboardListing;
