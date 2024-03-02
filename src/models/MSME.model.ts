import { ValidApplicationStatus } from "src/utils/ValidApplicationStatus";

export type MSMEListResponse = {
  _id: string;
  propritorName: string;
  appliedOnDate:string;
  adhaarNumber: string;
  firmName: string;
  address: string;
  mobileNumber: string;
  verifiedByName:string;
  rejectedByName:string;
  email: string;
  adhaarCardPhotoUrl: string;
  applicationIndividualPrice:string;
  panCardPhotoUrl: string;
  photoUrl: string;
  otherDocuments: string[];
  appliedBy: string;
  appliedAs: string;
  txnId: string;
  payementDetails: string;
  srn: string;
  assignedToId: string;
  assignedToName: string;
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
  acknowledgementNumber:string;
  __v: number;
};

export type MSMEadd = {
  propritor_name: string;
};


export type updateAssignee = {
  body :{
    assignToSjbtUser:string;
  },
  id : string;
  };

  
export type UpdateMSME = {
    body: FormData;
    id: string;
};
