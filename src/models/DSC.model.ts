import { ValidApplicationStatus } from "src/utils/ValidApplicationStatus";

export type DSCListResponse = {
  _id: string;
  propritorName: string;
  srn: string;
  appliedOnDate:string;
  mobileNumber: string;
  email: string;
  adhaarNumber: string;
  verifiedByName:string;
  rejectedByName:string;
  address: string;
  assignedToId : string,
  assignedToName : string;
  photoUrl: string;
  adhaarCardPhotoUrl: string;
  acknowledgementNumber:string;
  applicationIndividualPrice:string;
  panCardPhotoUrl: string;
  otherDocuments: string;
  appliedBy: string;
  appliedAs: string;
  txnId: string;
  payementDetails: string;
  paymentCategory: string;
  state: string;
  district: string;
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

export type AddDSC = {
  propritor_name: string;
  aadhar_number: string;
  mobile: string;
  email: string;
};

export type UpdateDSC = {
  body: FormData;
  id: string;
};


export type updateAssignee = {
  body :{
    assignToSjbtUser:string;
  },
  id : string;
  };
  