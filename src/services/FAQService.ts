import { PaginationType } from "src/models/common/PaginationType.model";
import apiSlice from "./ApiSlice";

export const faqApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // POST REQUEST
    getFAQ: builder.query({
      providesTags: ["faq"],
      query: (body: PaginationType) => ({
        url: "/faq/list/pagination",
        method: "POST",
        body,
      }),
    }),

    // GET SINGLE
    getSingleFAQ: builder.query({
      providesTags: ["faq"],
      query: (id) => ({
        url: `/faq/admin/view`,
        params : {id},
        method: "GET",
      }),
    }),

    // ADD
    addFAQ: builder.mutation({
      invalidatesTags: ["faq"],
      query: (body) => ({
        url: "/faq/add",
        method: "POST",
        body,
      }),
    }),

    // UPDATE
    updateFAQ: builder.mutation({
      invalidatesTags: ["faq"],
      query: ({ body, id }) => ({
        url: `/faq/update`,
        params : {id},
        method: "PUT",
        body,
      }),
    }),

    // DELETE
    deleteFAQ: builder.mutation({
      invalidatesTags: ["faq"],
      query: (id) => ({
        url: `/faq/delete`,
        params : {id},
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetFAQQuery,
  useGetSingleFAQQuery,
  useAddFAQMutation,
  useUpdateFAQMutation,
  useDeleteFAQMutation,
} = faqApi;
