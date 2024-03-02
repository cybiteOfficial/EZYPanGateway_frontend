export type BusinessEnquiryListResponse = {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  message: string;
  isReplied: boolean;
  isDeleted: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type AddBusinessEnquiry = {
  name: string;
  date_and_time: string;
  mobile: string;
  email: string;
  query: string;
};

export type UpdateBusinessEnquiry = {
  body: {
    name: string;
    date_and_time: string;
    mobile: string;
    email: string;
    query: string;
  };
  id: string;
};
