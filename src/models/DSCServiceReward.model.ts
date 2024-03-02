export type DSCRewardListResponse = {
    _id: string
    serviceName: string
    updatedById: string
    previousRewardForDistributor: number
    previousRewardForRetailer: number
    previousRewardForGuest: number
    updatedRewardForDistributor: number
    updatedRewardForRetailer: number
    updatedRewardForGuest: number
    isDeleted: boolean
    isActive: boolean
    createdAt: string
    updatedAt: string
    __v: number
    rewardForDistributor: number;
  rewardForRetailer: number;
  rewardForGuest: number;
  };
  export type UpdateDSCRewardService = {
      rewardForDistributor: number;
      rewardForRetailer: number;
      rewardForGuest: number;
  };
  