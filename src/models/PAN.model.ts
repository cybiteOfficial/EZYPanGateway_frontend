import { ValidApplicationStatus } from "src/utils/ValidApplicationStatus";

type OtherDocument = {
  title: string;
  imageUrl: string;
};

export type PANListResponse = {
  _id: string;
  category: string;
  appliedOnDate:string;
  title: string;
  name: string;
  dob: string;
  fatherName: string;
  motherName: string;
  adhaarNumber: string;
  mobileNumber: string;
  rejectedByName:string;
  appliedByNumber: string;
  applicationIndividualPrice:string;
  email: string;
  passportPhotoUrl: string;
  signaturePhotoUrl: string;
  panFormFrontPhotoUrl: string;
  panFormBackPhotoUrl: string;
  adhaarFrontPhotoUrl: string;
  adhaarBackPhotoUrl: string;
  otherDocuments: OtherDocument[];
  comment: string;
  distributorCode: string;
  appliedBy: string;
  appliedAs: string;
  txnId: string;
  srn: string;
  paymentCategory: string;
  version: number;
  panNumber: string;
  acknowledgementNumber: string;
  status: ValidApplicationStatus;
  appliedFrom: string;
  assignedTo: string;
  generatedByName:string;
  assignedToId: string;
  assignedToName: string;
  assignedBy: string;
  createdAt: string;
  verifiedByName:string;
  updatedAt: string;
  isDeleted: boolean;
  isActive: boolean;
  
  __v: number;
};

export type AddPAN = {
  name: string;
  sub_agent_mobile: string;
  date_and_time: string;
  mobile: string;
  email: string;
  sjbt_code: string;
  pan_number: String;
};

export type updateAssignee = {
body :{
  assignToSjbtUser:string;
},
id : string;
};


export type UpdatePAN = {
    body: FormData;
    id: string;
};
