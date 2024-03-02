import { PaginationType } from "src/models/common/PaginationType.model";
import apiSlice from "./ApiSlice";

export const otherServicesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // POST REQUEST
    getOtherServices: builder.query({
      providesTags: ["other-service"],
      query: (body: PaginationType) => ({
        url: "/other-service/list/pagination",
        method: "POST",
        body,
      }),
    }),

    // GET SINGLE
    getSingleOtherServices: builder.query({
      providesTags: ["other-service"],
      query: (id) => ({
        url: `/other-service/admin/view`,
        params : {id},
        method: "GET",
      }),
    }),

    // ADD
    addOtherServices: builder.mutation({
      invalidatesTags: ["other-service"],
      query: (body) => ({
        url: "/other-service/add",
        method: "POST",
        body,
      }),
    }),

    // UPDATE
    updateOtherServices: builder.mutation({
      invalidatesTags: ["other-service"],
      query: ({ body, id }) => ({
        url: `/other-service/update`,
        params : {id},
        method: "PUT",
        body,
      }),
    }),

    // DELETE
    deleteOtherServices: builder.mutation({
      invalidatesTags: ["other-service"],
      query: (id) => ({
        url: `/other-service/delete`,
        params : {id},
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetOtherServicesQuery,
  useGetSingleOtherServicesQuery,
  useAddOtherServicesMutation,
  useUpdateOtherServicesMutation,
  useDeleteOtherServicesMutation,
} = otherServicesApi;
