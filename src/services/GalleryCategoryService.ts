import { PaginationType } from "src/models/common/PaginationType.model";
import apiSlice from "./ApiSlice";

export const galleryCategoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // POST REQUEST
    getGalleryCategory: builder.query({
      providesTags: ["gallery-category"],
      query: (body: PaginationType) => ({
        url: "/gallery-category",
        method: "POST",
        body,
      }),
    }),

    // ADD
    addGalleryCategory: builder.mutation({
      invalidatesTags: ["gallery-category"],
      query: (body) => ({
        url: "/gallery-category/add",
        method: "POST",
        body,
      }),
    }),
    // **** GET ALL Gallery Category
    getAllGalleryCategory: builder.query({
      providesTags: ["gallery-category"],
      query: () => ({
        url: `/gallery-category/admin/get-all`,
        method: "GET",
      }),
    }),

  }),
});

export const {
  useGetGalleryCategoryQuery,
  useAddGalleryCategoryMutation,
  useGetAllGalleryCategoryQuery,
} = galleryCategoryApi;
