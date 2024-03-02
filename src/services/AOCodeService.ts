import { PaginationType } from "src/models/common/PaginationType.model";
import { AddAOCodeList, UpdateAOCodeList } from "src/models/AOCodeList.model";
import apiSlice from "./ApiSlice";

export const aoCodeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET REQUEST
    getAOCode: builder.query({
      providesTags: ["city-code"],
      query: () => ({
        url: "/city-code/get-all",
        method: "GET",
      }),
    }),
    // POST REQUEST
    getAoCodeList: builder.query({
      providesTags: ["city-code"],
      query: (body: PaginationType) => ({
        url: "/city-code/list/pagination",
        method: "POST",
        body,
      }),
    }),
    // Add
    addAOCode: builder.mutation({
      invalidatesTags: ["city-code"],
      query: (body: AddAOCodeList) => ({
        url: "/city-code/add",
        method: "POST",
        body,
      }),
    }),
    // UPDATE
    updateAOCode: builder.mutation({
      invalidatesTags: ["city-code"],
      query: ({ body, id }: UpdateAOCodeList) => ({
        url: `/city-code/update`,
        params: { id },
        method: "PUT",
        body,
      }),
    }),
    // GET REQUEST
    getAoCodeById: builder.query({
      providesTags: ["city-code"],
      query: (id: string) => ({
        url: `/city-code/admin/view`,
        params: { id },
        method: "GET",
      }),
    }),

    // Delete AO Code
    deleteAoCode : builder.mutation({
      invalidatesTags: ["city-code"],
      query: (id: string) => ({
        url: "/city-code/delete",
        params: { id },
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAOCodeQuery,
  useGetAoCodeListQuery,
  useAddAOCodeMutation,
  useUpdateAOCodeMutation,
  useGetAoCodeByIdQuery,
  useDeleteAoCodeMutation
} = aoCodeApi;
