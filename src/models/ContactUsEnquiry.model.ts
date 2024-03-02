export type ContactUsEnquiryListResponse = {
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

export type AddContactUsEnquiry = {
  name: string;
  date_and_time: string;
  mobile: string;
  email: string;
  loan_type: string;
  employee_type: string;
  query: String;
};

export type UpdateContactUsEnquiry = {
  body: {
    name: string;
    date_and_time: string;
    mobile: string;
    email: string;
    loan_type: string;
    employee_type: string;
    query: String;
  };
  id: string;
};
