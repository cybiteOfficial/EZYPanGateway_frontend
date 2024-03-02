export type BusinessOpportunityListResponse = {
  _id: string;
  serviceName: string;
  commission: string;
  retailerReward: string;
  isDeleted: string;
  isActive: string;
  createdAt: string;
  updatedAt: string;
};

export type UpdateBusinessOpportunity = {
  body: {
    commission: string
    retailerReward: string
  },
  id: string;
}