import { UpdateBanner } from "src/models/BannerUpdate.model";
import { PaginationType } from "src/models/common/PaginationType.model";
import apiSlice from "./ApiSlice";

export const bannerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET REQUEST
    getBannerList: builder.query({
      providesTags: ["banner"],
      query: (body: PaginationType) => ({
        url: "/banner/list/pagination",
        method: "POST",
        body,
      }),
    }),

    // GET REQUEST
    getBannerById: builder.query({
      providesTags: ["banner"],
      query: (id: string) => ({
        url: `/banner/admin/view`,
        params : {id},
        method: "GET",
      }),
    }),

    // ADD
    addBanner: builder.mutation({
      invalidatesTags: ["banner"],
      query: (body) => ({
        url: "/banner/add",
        method: "POST",
        body,
      }),
    }),

    // **** DELETE BY ID
    DeleteBannerById: builder.mutation({
      invalidatesTags: ["banner"],
      query: (id: string) => ({
        url: `/banner/delete`,
        params : {id},
        method: "DELETE",
      }),
    }),

    // UPDATE
    updateBanner: builder.mutation({
      invalidatesTags: ["banner"],
      query: ({ body, id }: UpdateBanner) => ({
        url: `/banner/update`,
        params : {id},
        method: "PUT",
        body,
      }),
    }),

    // Change show On web Status
    changeBannerShowOnWebStatus: builder.mutation({
      invalidatesTags: ["banner"],
      query: (bannerId) => ({
        url: `/banner/change-showonweb`,
        params : {
          id : bannerId
        },
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useGetBannerListQuery,
  useDeleteBannerByIdMutation,
  useAddBannerMutation,
  useGetBannerByIdQuery,
  useUpdateBannerMutation,
  useChangeBannerShowOnWebStatusMutation,
} = bannerApi;
