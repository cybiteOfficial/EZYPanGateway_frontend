export type HeaderContactInformationListResponse = {
  _id: string;
  marqueeTag: string;
  customerCareNo1: string;
  customerCareNo2: string;
  customerCareNo3: string;
  customerCareNo4: string;
  email: string;
  operatingTime: string;
  address: string;
  mapLink: string;
  contactPerson: string;
  registrationNumber: string;
  panNumber: string;
  loginPageContactNumber: string;
  loginPageEmailId: string;
  loginPageWhatsappNumber: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  isActive: boolean;
  __v: number;
};

export type AddHeaderContactInformation = {
  _id: string;
  marqueeTag: string;
  customerCareNo1: string;
  customerCareNo2: string;
  customerCareNo3: string;
  customerCareNo4: string;
  email: string;
  operatingTime: string;
  address: string;
  mapLink: string;
  contactPerson: string;
  registrationNumber: string;
  panNumber: string;
  loginPageContactNumber: string;
  loginPageEmailId: string;
  loginPageWhatsappNumber: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  isActive: boolean;
  __v: number;
};

export type UpdateHeaderContactInformation = {
  body: {
    marqueeTag: string;
    customerCareNo1: string;
    customerCareNo2: string;
    customerCareNo3: string;
    customerCareNo4: string;
    contactPerson: string;
    registrationNumber: string;
    panNumber: string;
    loginPageContactNumber: string;
    loginPageEmailId: string;
    loginPageWhatsappNumber: string;
    email: string;
    address: string;
    mapLink: string;
  };
  id: string;
};
