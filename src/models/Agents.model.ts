import { VerificationStatus } from "src/utils/verificationStatus/VerificationStatus";

export type AgentsListResponse = {
  name: string;
  dob: string;
  date_and_time: string;
  mobile: string;
  email: string;
  reference_number: string;
  sjbt_code: string;
  distributor_code: string;
  firm_name: string;
  is_mobile_verified: boolean;
  is_email_verified: boolean;
  pan_number: string;
  retailer_number: string;
  otp_status: String;
  is_active: boolean;
  is_deleted: boolean;
  createdAt: string;
  updatedAt: string;
  _id: string;
  __v: number;
};

export type DistributorListResponse = {
  name: string;
  email: string;
  mobileNumber: string;
  dob: string;
  fatherName: string;
  createdAt: string;
  firmName: string;
  address: string;
  area: string;
  cityVillageName: string;
  status: keyof typeof VerificationStatus;
  district: string;
  pincode: number;
  state: string;
  adhaarCardImage: string;
  panCardImage: string;
  cancelChequeImage: string;
  declarationFormPhotoUrl:string;
  password: string;
  sjbtCode: string;
  userType: "DISTRIBUTOR";
  panNumber: string;
  isDeleted: boolean;
  isActive: boolean;
  isBlocked: boolean;
  isVerified: boolean;
  emailVerified: boolean;
  mobileNumberVerified: boolean;
  category: {
    panCategories: string[];
    itrCategories: string[];
  };
  services: string[];
  _id: string;
};

export type AddAgents = {
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

export type UpdateAgents = {
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

export type UpdateUser = {
  body: FormData;
  id: string;
};
