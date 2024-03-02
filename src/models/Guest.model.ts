type Category = {
  panCategories: any[];
  itrCategories: any[];
  _id: string;
};

export type GuestListResponse = {
  _id: string;
  name: string;
  email: string;
  mobileNumber: string;
  dob: string;
  fatherName: string;
  firmName: string;
  address: string;
  area: string;
  cityVillageName: string;
  district: string;
  pincode: string;
  state: string;
  adhaarCardImage: string;
  panCardImage: string;
  cancelChequeImage: string;
  userType: string;
  status: string;
  panNumber: string;
  isDeleted: boolean;
  isActive: boolean;
  isVerified: boolean;
  isBlocked: boolean;
  emailVerified: boolean;
  mobileNumberVerified: boolean;
  category: Category;
  allDistributor: any[];
  services: any[];
  createdAt: string;
  updatedAt: string;
};
