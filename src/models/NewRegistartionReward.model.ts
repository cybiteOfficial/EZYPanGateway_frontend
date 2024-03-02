export type NewRegistrationRewardListResponse = {
  _id: string;
  updatedById: string;
  updatedRetailerRegisterRewardPoint: number;
  previousRetailerRewardUpdateHistoryPoint: number;
  isDeleted: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type SingleNewRegistrationRewardResponse = {
    _id: string;
    retailerRegisterRewardPoint: number;
    isDeleted: boolean;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  