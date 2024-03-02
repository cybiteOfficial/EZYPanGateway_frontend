import { ValidApplicationStatus } from "src/utils/ValidApplicationStatus";

export type GumastaListResponse = {
  _id: string;
  propritorName: string;
  appliedOnDate:string;
  adhaarNumber: string;
  mobileNumber: string;
  email: string;
  adhaarPhotoUrl: string;
  acknowledgementNumber:string;
  applicationIndividualPrice:string;
  firmName: string;
  verifiedByName:string;
  rejectedByName:string;
  firmAddress: string;
  propritorPhotoUrl: string;
  shopOfficePhotoUrl: string;
  addressProofPhotoUrl: string;
  otherDocuments: string;
  state: string;
  district: string;
  assignedToName: string;
  assignedToId: string;
  distributorCode: string;
  appliedBy: string;
  appliedAs: string;
  txnId: string;
  payementDetails: string;
  srn: string;
  paymentCategory: string;
  appliedFrom: string;
  version: number;
  panNumber: string;
  status: ValidApplicationStatus;
  assignedTo: string;
  assignedBy: string;
  isDeleted: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type updateAssignee = {
  body: {
    assignToSjbtUser: string;
  };
  id: string;
};
export type AddGumasta = {
  propritorName: string;
  adhaarNumber: string;
  mobile: string;
  email: string;
  firm_name: string;
  state: string;
  district: String;
};

export type UpdateGumasta = {
  body: FormData;
  id: string;
};
