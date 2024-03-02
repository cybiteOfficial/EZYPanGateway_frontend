export type ITRCategoriesListResponse = {
    categoryName: string;
    categoryCode : string;
    price: string;
    applicableForMinor : boolean;
    showForGuest : boolean;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    _id: string;
    __v: number;

}

export type ITRCategoriesbyIdResponse = {
    price: string,
}
export type AddITRCategories = {
    categoryName: string;
    price: string;
    priorityKey: string;
    profileCompletionRequired: boolean;
    showForGuest: boolean;
    applicableForMinor: boolean;
}

export type UpdateITRCategory = {
    body: {
      categoryName: string;
      price: number;
    };
    id: string;
  };
  