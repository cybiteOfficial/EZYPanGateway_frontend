import { PaginationType } from "src/models/common/PaginationType.model";
import apiSlice from "./ApiSlice";

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // PUT REQUEST
    updateUserServices: builder.mutation({
      invalidatesTags: ["users", "distributor"],
      query: ({ body, id }) => ({
        url: `/user/update/services`,
        params: { id },
        method: "PUT",
        body,
      }),
    }),
    updateUserCategories: builder.mutation({
      invalidatesTags: ["users", "distributor"],
      query: ({ body, id }) => ({
        url: `/user/update/category`,
        params: { id },
        method: "PUT",
        body,
      }),
    }),
    getUserLogs: builder.query({
      providesTags: ["users", "distributor"],
      query: (body: PaginationType) => ({
        url: `/user/check-logs`,
        method: "POST",
        body,
      }),
      keepUnusedDataFor: 0,
    }),

    // Change status
    reuploadAcknowledgment: builder.mutation({
      invalidatesTags: ["users"],
      query: ({ body, id }: {body:FormData,id:string}) => ({
        url: `/user/reupload-pdf`,
        params: { id },
        method: "POST",
        body,
      }),
    }),
  }),
});
export const {
  useUpdateUserServicesMutation,
  useReuploadAcknowledgmentMutation,
  useUpdateUserCategoriesMutation,
  useGetUserLogsQuery,
} = usersApi;
