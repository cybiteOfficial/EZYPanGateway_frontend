export type ITRCommissionListResponse = {
  _id: string
  serviceName: string
  commissionName: string
  minimumApplications: number
  updatedById: string
  previousCommissionForDistributor: number
  updatedCommissionForDistributor: number
  commissionForRetailer: number
  commissionForGuest: number
  isDeleted: boolean
  isActive: boolean
  createdAt: string
  updatedAt: string
  __v: number
  };

export type SingleItrCommissionResponse = {
    _id: string;
    commissionForDistributor: number;
    commissionName: string;
    isDeleted: boolean;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  

export type AddITRCommission = {
    categoryName: string;
    price: string;
    priorityKey: string;
    profileCompletionRequired: boolean;
}

export type UpdateITRCommission = {
    body: {
        name: string;
        date_and_time: string;
        mobile: string;
        email: string;
        query: string;
    },
    id: string;
}