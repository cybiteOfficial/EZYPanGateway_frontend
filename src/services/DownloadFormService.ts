import { PaginationType } from "src/models/common/PaginationType.model";
import apiSlice from "./ApiSlice";
import { UpdateDownLOadFormListResponse } from "src/models/DownLoadForm.model";

export const downLoadFormApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // POST REQUEST
    getAllForm: builder.query({
      providesTags: ["download-form"],
      query: (body: PaginationType) => ({
        url: "/download-file/list/pagination",
        method: "POST",
        body,
      }),
    }),
    //Add
    addForm: builder.mutation({
      invalidatesTags: ["download-form"],
      query: (body) => ({
        url: "/download-file/add",
        method: "POST",
        body,
      }),
    }),
    // Update
    updateForm: builder.mutation({
      invalidatesTags: ["download-form"],
      query: ({ body, id }: UpdateDownLOadFormListResponse) => ({
        url: `download-file/update`,
        params : {id},
        method: "PUT",
        body,
      }),
    }),
    //Get Single Form Description
    getSingleForm: builder.query({
      providesTags: ["download-form"],
      query: (id: string) => ({
        url: `/download-file/view`,
        params : {id},
        method: "GET",
      }),
    }),
    // DELETE
    deleteForm: builder.mutation({
      invalidatesTags: ["download-form"],
      query: (id) => ({
        url: `/download-file/delete`,
        params :{id},
        method: "DELETE",
      }),
    }),
  }),
});
export const {
  useGetAllFormQuery,
  useAddFormMutation,
  useGetSingleFormQuery,
  useUpdateFormMutation,
  useDeleteFormMutation,
} = downLoadFormApi;
