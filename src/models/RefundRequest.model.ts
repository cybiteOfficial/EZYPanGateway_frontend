type ValidApplicationType =
  | "PAN"
  | "ITR"
  | "GUMASTA"
  | "DSC"
  | "MSME"
  | "DIGITAL_PAN";

export type RefundRequestListResponse = {
  userName: string;
  date_and_time: string;
  application: ValidApplicationType;
  refundedAmount: string;
  accountHolderName: string;
  accountNumber: number;
  ifscCode: string;
  bankName: string;
  is_active: boolean;
  is_deleted: boolean;
  createdAt: string;
  updatedAt: string;
  _id: string;
  __v: number;
  refundRequestedAmount:string;
  refundRecieveAmt:string;
};

export type AddRefundRequest = {
  name: string;
  sub_agent_mobile: string;
  date_and_time: string;
  mobile: string;
  email: string;
  amount: string;
  sjbt_code: string;
  ref_number: String;
};

export type UpdateRefundRequest = {
  body: {
    name: string;
    sub_agent_mobile: string;
    amount: string;
    date_and_time: string;
    mobile: string;
    email: string;
    sjbt_code: string;
    ref_number: String;
  };
  id: string;
};
