import React from "react";
import { RxPencil1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import ATMMenu from "src/components/UI/atoms/ATMMenu/ATMMenu";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { SubscriptionListResponse } from "src/models/Subscription.model";
import {
  setIsTableLoading,
  setItems,
} from "src/redux/slices/SubscriptionSlice";
import { AppDispatch, RootState } from "src/redux/store";
import { useGetSubscriptionQuery } from "src/services/SubscriptionService";
import SubscriptionListing from "./SubscriptionListing";
import { AccessAction } from "src/utils/Enums/AccessAction";

const SubscriptionListingWrapper = () => {
  const navigate = useNavigate();
  const getActionOptions = (row: SubscriptionListResponse) => {
    return [
      {
        accessAction: AccessAction.EDIT,
        label: (
          <div className="flex gap-2 items-center text-secondary-main">
            <RxPencil1 className="text-lg" /> Edit
          </div>
        ),
        onClick: () => {
          navigate(`/subscription/${row._id}/edit`);
        },
      },
    ];
  };

  const dispatch = useDispatch<AppDispatch>();

  const subscriptionState: any = useSelector(
    (state: RootState) => state.subscription
  );
  const { items } = subscriptionState;

  const { data, isLoading, isFetching } = useGetSubscriptionQuery("");

  // Setting Items
  React.useEffect(() => {
    if (!isFetching && !isLoading) {
      dispatch(setIsTableLoading(false));
      dispatch(setItems(data?.data || []));
    } else {
      dispatch(setIsTableLoading(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching, isLoading, data]);

  const columns: columnTypes[] = [
    {
      field: "subscriptionCode",
      headerName: "Subscription Code",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: SubscriptionListResponse) => {
        return <span> {row.subscriptionCode} </span>;
      },
    },

    {
      field: "planName",
      headerName: "Plan Name",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: SubscriptionListResponse) => {
        return <span> {row.planName} </span>;
      },
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: SubscriptionListResponse) => {
        return <span> &#8377; {row.amount} </span>;
      },
    },
    {
      field: "durationIndays",
      headerName: "Duration in Days",
      flex: "flex-[1_1_0%]",
      renderCell: (row: SubscriptionListResponse) => (
        <span> {row.durationIndays} </span>
      ),
    },
    {
      field: "durationInWords",
      headerName: "Duration in Words",
      flex: "flex-[1_1_0%]",
      renderCell: (row: SubscriptionListResponse) => (
        <span> {row.durationInWords || "N/A"} </span>
      ),
    },
    {
      field: "description",
      headerName: "Description",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: SubscriptionListResponse) => {
        return <span> {row.description} </span>;
      },
    },

    {
      noAuthRequired: true,
      field: "action",
      headerName: "Action",
      flex: "flex-[1_1_0%]",
      renderCell: (row: SubscriptionListResponse) => {
        const options = getActionOptions(row);
        return <ATMMenu moduleName="SUBSCRIPTIONS" options={options} />;
      },
    },
  ];

  return (
    <>
      <SideNavLayout>
        <SubscriptionListing
          columns={columns}
          rows={items}
        />
      </SideNavLayout>
    </>
  );
};

export default SubscriptionListingWrapper;
