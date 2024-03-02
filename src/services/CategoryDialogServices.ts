import { UpdateITRCategory } from "src/models/ITRCategories.model";
import { UpdatePANCategory } from "src/models/PANCategories.model";
import apiSlice from "./ApiSlice";

export const categoryDialogApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET REQUEST
    getAllPanCategoriesList: builder.query({
      providesTags: ["pan-category"],
      query: ({ body }) => ({
        url: `/pan-category/admin/get-all`,
        method: "GET",
        body,
      }),
    }),
    // GET REQUEST
    getAllITRCategoriesList: builder.query({
      providesTags: ["itr-category"],
      query: ({ body }) => ({
        url: `/itr-category/admin/get-all`,
        method: "GET",
        body,
      }),
    }),
    //change-Status-applicable-to-minor
    changeItrCategoryApplicableToMinor: builder.mutation({
      invalidatesTags: ["itr-category"],
      query: (id: string) => ({
        url: `/itr-category/change-status/applicable-for-minor`,
        params: { id },
        method: "PUT",
      }),
    }),

    // Change-Status-isActive
    changePanCategoryIsActiveStatus: builder.mutation({
      invalidatesTags: ["pan-category"],
      query: (id) => ({
        url: `/pan-category/change-status`,
        params: { id },
        method: "PUT",
      }),
    }),
    // Change-Status-isActive
    changeItrCategoryIsActiveStatus: builder.mutation({
      invalidatesTags: ["itr-category"],
      query: (id) => ({
        url: `/itr-category/change-status`,
        params: { id },
        method: "PUT",
      }),
    }),

    //change-Status-show-to-guest
    changePanCategoryShowToGuest: builder.mutation({
      invalidatesTags: ["pan-category"],
      query: (id: string) => ({
        url: `/pan-category/change-status/show-for-guest`,
        params: { id },
        method: "PUT",
      }),
    }),
    //change-Status-show-to-guest
    changeItrCategoryShowToGuest: builder.mutation({
      invalidatesTags: ["itr-category"],
      query: (id: string) => ({
        url: `/itr-category/change-status/show-for-guest`,
        params: { id },
        method: "PUT",
      }),
    }),
    //change-Status-applicable-to-minor
    changePanCategoryApplicableToMinor: builder.mutation({
      invalidatesTags: ["pan-category"],
      query: (id: string) => ({
        url: `/pan-category/change-status/applicable-for-minor`,
        params: { id },
        method: "PUT",
      }),
    }),
    // Update
    updatePanCategory: builder.mutation({
      invalidatesTags: ["pan-category"],
      query: ({ body, id }: UpdatePANCategory) => ({
        url: `/pan-category/update`,
        params: { id },
        method: "PUT",
        body,
      }),
    }),

    updateItrCategory: builder.mutation({
      invalidatesTags: ["itr-category"],
      query: ({ body, id }: UpdateITRCategory) => ({
        url: `/itr-category/update`,
        params : {id},
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useGetAllPanCategoriesListQuery,
  useGetAllITRCategoriesListQuery,
  useUpdatePanCategoryMutation,
  useUpdateItrCategoryMutation,
  useChangePanCategoryApplicableToMinorMutation,
  useChangeItrCategoryShowToGuestMutation,
  useChangeItrCategoryIsActiveStatusMutation,
  useChangeItrCategoryApplicableToMinorMutation,
  useChangePanCategoryIsActiveStatusMutation,
  useChangePanCategoryShowToGuestMutation,
} = categoryDialogApi;
