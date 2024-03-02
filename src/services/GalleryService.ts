import { PaginationType } from "src/models/common/PaginationType.model";
import apiSlice from "./ApiSlice";

export const galleryImagesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // POST REQUEST
    getAllGalleryImages: builder.query({
      providesTags: ["gallery-images"],
      query: (body: PaginationType) => ({
        url: "/gallery/list/pagination",
        method: "POST",
        body,
      }),
      keepUnusedDataFor: 0,
    }),
    //Add
    addGalleryImage: builder.mutation({
      invalidatesTags: ["gallery-images"],
      query: (body) => ({
        url: "/gallery/add",
        method: "POST",
        body,
      }),
    }),
    //Get Images according to category Id
    getGalleryById: builder.query({
      providesTags: ["gallery-images"],
      query: (id: string) => ({
        url: `gallery/admin/getallwithcategories`,
        params : {id},
        method: "GET",
      }),
    }),
  }),
});
export const {
  useGetAllGalleryImagesQuery,
  useAddGalleryImageMutation,
  useGetGalleryByIdQuery,
} = galleryImagesApi;
