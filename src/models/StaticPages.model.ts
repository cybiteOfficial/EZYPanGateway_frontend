export type StaticPagesListResponse = {
  name: string;
  pageContent: string;
  url: string;
  description: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  isActive: boolean;
  __v: number;
};
export type UpdateStaticPageResponse = {
  body: {
    name: string;
    url: string;
    pageContent: string;
  };
  id: string | undefined;
};
