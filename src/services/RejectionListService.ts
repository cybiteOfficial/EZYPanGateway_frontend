import { PaginationType } from "src/models/common/PaginationType.model";
import { UpdateRejectionList } from "src/models/RejectionList.model";
import apiSlice from "./ApiSlice";

export const rejectionListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // POST REQUEST
    getRejectionList: builder.query({
      providesTags: ["rejection-list"],
      query: (body: PaginationType) => ({
        url: "/rejection-list/list/pagination",
        method: "POST",
        body,
      }),
    }),

    // ADD
    addRejectionList: builder.mutation({
      invalidatesTags: ["rejection-list"],
      query: (body) => ({
        url: "/rejection-list/add",
        method: "POST",
        body,
      }),
    }),

    // **** DELETE BY ID
    DeleteRejectionListById: builder.mutation({
      invalidatesTags: ["rejection-list"],
      query: (id: string) => ({
        url: `/rejection-list/delete`,
        params : {id},
        method: "DELETE",
      }),
    }),

    // GET REQUEST
    getRejectionListById: builder.query({
      providesTags: ["rejection-list"],
      query: (id: string) => ({
        url: `/rejection-list/admin/view`,
        params : {id},
        method: "GET",
      }),
    }),

    // UPDATE
    UpdateRejectionList: builder.mutation({
      invalidatesTags: ["rejection-list"],
      query: ({ body, id }: UpdateRejectionList) => ({
        url: `/rejection-list/update`,
        params : {id},
        method: "PUT",
        body,
      }),
    }),
    //getall

    getAllRejectionList: builder.query({
      providesTags: ["rejection-list"],
      query: () => ({
        url: "/rejection-list/get-all",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetRejectionListQuery,
  useAddRejectionListMutation,
  useGetRejectionListByIdQuery,
  useUpdateRejectionListMutation,
  useGetAllRejectionListQuery,
  useDeleteRejectionListByIdMutation,
} = rejectionListApi;
