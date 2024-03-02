export type BannerUpdateListResponse = {
  image: string;
  showOnMobile: boolean;
  showOnWeb: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  isActive: boolean;
  __v: number;
};

export type AddBanner = {
  image: string;
  show_on_mobile: string;
  show_on_phone: string;
};

export type bannerOnelist = {
  image: string;
  fileType : string;
};

export type UpdateBanner = {
  body: FormData;
  id: string;
};