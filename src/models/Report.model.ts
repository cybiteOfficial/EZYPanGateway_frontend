type countType = {
  generate: number;
  verified: number;
  rejected: number;
  done: number;
};

export type ReportListResponse = {
  _id: string;
  adminName: string;
  distributorName: string;
  retailerMobileNumber : string;
  retailerName : string;
  pan: countType;
  itr: countType;
  gumasta: countType;
  dsc: countType;
  msme: countType;
  distributorSjbtCode: string;
};




