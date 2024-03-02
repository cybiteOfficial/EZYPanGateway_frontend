import { PaginationType } from "src/models/common/PaginationType.model";
import apiSlice from "./ApiSlice";
import { UpdateStaticPageResponse } from "src/models/StaticPages.model";

export const staticPagesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // POST REQUEST
    getAllStaticPages: builder.query({
      providesTags: ["static-pages"],
      query: (body: PaginationType) => ({
        url: "static-page/list/pagination",
        method: "POST",
        body,
      }),
    }),
    //Add
    addStaticPages: builder.mutation({
      invalidatesTags: ["static-pages"],
      query: (body) => ({
        url: "/static-page/add",
        method: "POST",
        body,
      }),
    }),

    //without pagination
    getStaticPagesListWithoutPagination: builder.query({
      providesTags: ["static-pages"],
      query: () => ({
        url: "/static-page/admin/get-all",
        method: "GET",
      }),
    }),

    // Update
    updateStaticPage: builder.mutation({
      invalidatesTags: ["static-pages"],
      query: ({ body, id }: UpdateStaticPageResponse) => ({
        url: `/static-page/update`,
        params: { id },
        method: "PUT",
        body,
      }),
    }),
    //Get Single Form Description
    getSingleStaticPage: builder.query({
      providesTags: ["static-pages"],
      query: (url: string) => ({
        url: `/static-page/admin/view-with-name`,
        params: { url },
        method: "GET",
      }),
    }),

    // DELETE
    deleteStaticPage: builder.mutation({
      invalidatesTags: ["static-pages"],
      query: (id) => ({
        url: `/static-page/delete`,
        params: { id },
        method: "DELETE",
      }),
    }),
  }),
});
export const {
  useGetAllStaticPagesQuery,
  useAddStaticPagesMutation,
  useUpdateStaticPageMutation,
  useGetStaticPagesListWithoutPaginationQuery,
  useDeleteStaticPageMutation,
  useGetSingleStaticPageQuery,
} = staticPagesApi;