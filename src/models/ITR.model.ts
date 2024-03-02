import { ValidApplicationStatus } from "src/utils/ValidApplicationStatus";

export type ITRListResponse = {
  _id: string;
  firstName: string;
  appliedOnDate:string;
  middleName: string;
  lastName: string;
  totalPrice : string;
  adhaarNumber: string;
  appliedByMobileNumber : string;
  applicationIndividualPrice:string;
  assesmentYear: string;
  verifiedByName:string;
  rejectedByName:string;
  incomeSource: string;
  fillingType: string;
  mobileNumber: string;
  emailId: string;
  adhaarFrontPhotoUrl: string;
  adhaarBackPhotoUrl: string;
  panCardPhotoUrl: string;
  banPassbookPhotoUrl: string;
  otherDocuments: string;
  distributorCode: string;
  appliedBy: string;
  assignedToId: string;
  assignedToName: string;
  appliedAs: string;
  txnId: string;
  payementDetails: string;
  srn: string;
  paymentCategory: string;
  appliedFrom: string;
  version: number;
  panNumber: string;
  acknowledgementNumber: string;
  status: ValidApplicationStatus;
  assignedTo: string;
  assignedBy: string;
  appliedByNumber: string;
  isDeleted: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type AddITR = {
  name: string;
  sub_agent_mobile: string;
  date_and_time: string;
  mobile: string;
  email: string;
  amount: string;
  sjbt_code: string;
  ref_number: String;
};

export type updateAssignee = {
  body: {
    assignToSjbtUser: string;
  };
  id: string;
};

export type UpdateITR = {
  body: FormData;
  id: string;
};
