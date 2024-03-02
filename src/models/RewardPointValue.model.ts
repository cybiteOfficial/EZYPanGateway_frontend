export type RewardPointValueListResponse = {
  _id: string;

  previousRewardValue: number;
  updatedRewardValue: number;
  updatedById: string;
  updatedByType: string;
  updatedOnDate: string;
  remark: string;
  isDeleted: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
export type SingleRewardPointValueResponse = {
  _id: string;
  perRupeeRewardValue: number;
  isDeleted: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
