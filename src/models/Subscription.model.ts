export type SubscriptionListResponse = {
  durationIndays: number;
  durationInWords: string;
  amount: string;
  planName: string;
  description: string;
  subscriptionCode: string;
  is_active: boolean;
  is_deleted: boolean;
  createdAt: string;
  updatedAt: string;
  _id: string;
  __v: number;
};
export type SubscriptionListByIdResponse = {
  durationIndays: number;
  durationInWords: string;
  amount: string;
  planName: string;
  description: string;
};

export type AddSubscription = {
  durationIndays: number;
  durationInWords: string;
  amount: string;
  planName: string;
  description: string;
};

export type UpdateSubscription = {
  body: {
    durationIndays: number;
    durationInWords: string;
    amount: string;
    description: string;
  };
  id: string;
};

export type DistributorSubscriptionListResponse = {
  subscriptionType: string;
  purchasedOn: string;
  subscriptionPlanExpiryDate: string;
  subcriptionAmount: string;
  is_active: boolean;
  is_deleted: boolean;
  createdAt: string;
  updatedAt: string;
  _id: string;
  __v: number;
  subscriptionTxnDate:string
}