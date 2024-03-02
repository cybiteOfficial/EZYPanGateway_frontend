import { PaginationType } from "src/models/common/PaginationType.model";
import apiSlice from "./ApiSlice";

export const footerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // POST REQUEST
    getFooter: builder.query({
      providesTags: ["footer"],
      query: (body: PaginationType) => ({
        url: "/footer/list/pagination",
        method: "POST",
        body,
      }),
    }),

    // ADD
    addFooter: builder.mutation({
      invalidatesTags: ["footer"],
      query: (body) => ({
        url: "/footer/add",
        method: "POST",
        body,
      }),
    }),
    // **** GET ALL FooterLinks
    getAllFooter: builder.query({
      providesTags: ["footer"],
      query: () => ({
        url: `/footer/admin/get-all`,
        method: "GET",
      }),
    }),

    // UPDATE
    updateFooter: builder.mutation({
      invalidatesTags: ["footer"],
      query: ({ id, body }) => ({
        url: `/footer/update`,
        params : {id},
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useGetFooterQuery,
  useAddFooterMutation,
  useGetAllFooterQuery,
  useUpdateFooterMutation,
} = footerApi;
