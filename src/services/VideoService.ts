import { PaginationType } from "src/models/common/PaginationType.model";
import {
  UpdateAppVideo,
  UpdateShowOnMobileAppVideo,
} from "src/models/AppVideo.model";
import apiSlice from "./ApiSlice";

export const appVideoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // POST REQUEST
    getAppVideo: builder.query({
      providesTags: ["video"],
      query: (body: PaginationType) => ({
        url: "/video/list/pagination",
        method: "POST",
        body,
      }),
    }),

    // ADD
    addAppVideo: builder.mutation({
      invalidatesTags: ["video"],
      query: (body) => ({
        url: "/video/add",
        method: "POST",
        body,
      }),
    }),

    // UPDATE  SHOW ON MOBILE
    UpdateShowOnMobileAppVideo: builder.mutation({
      invalidatesTags: ["video"],
      query: ({ body, id }: UpdateShowOnMobileAppVideo) => ({
        url: `/video/change-showonmobile`,
        params : {id},
        method: "PUT",
        body,
      }),
    }),

    // **** DELETE BY ID
    DeleteAppVideoById: builder.mutation({
      invalidatesTags: ["video"],
      query: (id: string) => ({
        url: `/video/delete`,
        params : {id},
        method: "DELETE",
      }),
    }),

    // GET REQUEST
    getAppVidoeById: builder.query({
      providesTags: ["video"],
      query: (id: string) => ({
        url: `/video/admin/view`,
        params : {id},
        method: "GET",
      }),
    }),

    // UPDATE
    UpdateAppVideo: builder.mutation({
      invalidatesTags: ["video"],
      query: ({ body, id }: UpdateAppVideo) => ({
        url: `/video/update`,
        params : {id},
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useGetAppVideoQuery,
  useAddAppVideoMutation,
  useGetAppVidoeByIdQuery,
  useUpdateAppVideoMutation,
  useDeleteAppVideoByIdMutation,
  useUpdateShowOnMobileAppVideoMutation,
} = appVideoApi;
