
export type RetailerListResponse = {
  name: string;
  email: string;
  mobileNumber: string;
  createdAt:string;
  dob: string;
  fatherName: string;
  firmName: string;
  address: string;
  area: string;
  cityVillageName: string;
  district: string;
  pincode: number;
  state: string;
  adhaarCardImage: string;
  panCardImage: string;
  cancelChequeImage: string;
  password: string;
  sjbtCode: string;
  allDistributor: { distributorId: string; sjbtCode: string; _id: string }[];
  userType: "RETAILER";
  panNumber: string;
  isDeleted: boolean;
  isActive: boolean;
  isBlocked: boolean;
  isVerified: boolean;
  emailVerified: boolean;
  mobileNumberVerified: boolean;
  _id: string;
};

export type AddSubAgents = {
  name: string;
  dob: string;
  date_and_time: string;
  mobile: string;
  sjbt_code: string;
  otp_status: String;
  email: string;
  password: string;
  confirm_password: string;
};

export type UpdateSubAgents = {
  body: {
    dob: string;
    name: string;
    date_and_time: string;
    mobile: string;
    email: string;
    password: string;
    sjbt_code: string;
    otp_status: string;
    confirm_password: string;
  };
  id: string;
};
