import { PaginationType } from "src/models/common/PaginationType.model";
import {
  UpdateTutorialVideo,
  UpdateShowOnMobileTutorialVideo,
} from "src/models/TutorialVideo.model";
import apiSlice from "./ApiSlice";

export const tutorialVideoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // POST REQUEST
    getTutorialVideo: builder.query({
      providesTags: ["video-tutorial"],
      query: (body: PaginationType) => ({
        url: "/video-tutorial/list/pagination",
        method: "POST",
        body,
      }),
    }),

    // ADD
    addTutorialVideo: builder.mutation({
      invalidatesTags: ["video-tutorial"],
      query: (body) => ({
        url: "/video-tutorial/add",
        method: "POST",
        body,
      }),
    }),

    // UPDATE  SHOW ON MOBILE
    UpdateShowOnMobileTutorialVideo: builder.mutation({
      invalidatesTags: ["video-tutorial"],
      query: ({ body, id }: UpdateShowOnMobileTutorialVideo) => ({
        url: `/video-tutorial/show-on-mobile`,
        params : {id},
        method: "PUT",
        body,
      }),
    }),
    // GET REQUEST
    getTutorialVidoeById: builder.query({
      providesTags: ["video-tutorial"],
      query: (id: string) => ({
        url: `/video-tutorial/admin/view`,
        params : {id},
        method: "GET",
      }),
    }),

    // **** DELETE BY ID
    DeleteTutorialVideoById: builder.mutation({
      invalidatesTags: ["video-tutorial"],
      query: (id: string) => ({
        url: `/video-tutorial/delete`,
        params : {id},
        method: "DELETE",
      }),
    }),

    // UPDATE
    UpdateTutorialVideo: builder.mutation({
      invalidatesTags: ["video-tutorial"],
      query: ({ body, id }: UpdateTutorialVideo) => ({
        url: `/video-tutorial/update`,
        params : {id},
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useGetTutorialVideoQuery,
  useGetTutorialVidoeByIdQuery,
  useAddTutorialVideoMutation,
  useDeleteTutorialVideoByIdMutation,
  useUpdateTutorialVideoMutation,
  useUpdateShowOnMobileTutorialVideoMutation,
} = tutorialVideoApi;
