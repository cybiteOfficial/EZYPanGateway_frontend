export type LoanEnquiryListResponse = {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  currentResidencePincode: number;
  employeeType: string;
  loanType: string;
  monthlySalary: number;
  currentCompanyName: string;
  address: string;
  message: string;
  isReplied: boolean;
  isDeleted: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type AddLoanEnquiry = {
  name: string;
  date_and_time: string;
  mobile: string;
  email: string;
  loan_type: string;
  employee_type: string;
  query: String;
};

export type UpdateLoanEnquiry = {
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
