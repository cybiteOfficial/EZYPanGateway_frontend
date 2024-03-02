export type DigitalPANListResponse = {
  Extra1: string;
  Type: string;
  agentID: string;
  applicationType: string;
  appliedById: string;
  appliedByName: string;
  appliedByNumber: string;
  appliedByType: string;
  appliedOnDate: string;
  createdAt: string;
  isDeleted: boolean;
  mobileNumber: string;
  panCardType: string;
  sessionId: string;
  status: string;
  totalPrice: number;
  Transactions: {
    Number: number;
    Amount: number;
    AckNo: string;
    OrderID: string;
    Status: string;
    TxnDate: string;
    Type: string;
  };
  txnId: string;
  updatedAt: string;
  __v: number;
  _id: string;
};

export type AddDigitalPAN = {
  propritor_name: string;
  aadhar_number: string;
  mobile: string;
  email: string;
};

export type UpdateDigitalPAN = {
  body: {
    propritor_name: string;
    aadhar_number: string;
    mobile: string;
    email: string;
  };
  id: string;
};
