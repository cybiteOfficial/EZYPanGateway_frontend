export type PANCategoriesListResponse = {
  categoryName: string;
  categoryCode: string;
  price: number;
  guestBasePrice: number;
  isActive: boolean;
  showForGuest: boolean;
  applicableForMinor: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  _id: string;
  __v: number;
};

export type UpdatePANCategory = {
  body: {
    categoryName: string;
    price: number;
  };
  id: string;
};
