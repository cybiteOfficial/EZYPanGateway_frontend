import { PaginationType } from "src/models/common/PaginationType.model";
import apiSlice from "./ApiSlice";

export const popUpBannerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // POST REQUEST
    getPopUpBanner: builder.query({
      providesTags: ["popup-banner"],
      query: (body: PaginationType) => ({
        url: "/popup-banner",
        method: "POST",
        // body,
      }),
    }),

    // ADD
    addPopUpBanner: builder.mutation({
      invalidatesTags: ["popup-banner"],
      query: (body) => ({
        url: "/popup-banner/add",
        method: "POST",
        body,
      }),
    }),
    
    // **** GET ALL Popupbanner
    getAllPopUpBanner: builder.query({
      providesTags: ["popup-banner"],
      query: () => ({
        url: `/popup-banner/admin/get-all`,
        method: "GET",
      }),
    }),

    // UPDATE
    updatePopUpBanner: builder.mutation({
      invalidatesTags: ["popup-banner"],
      query: ({ body, id }: { body: FormData; id: string }) => ({
        url: `/popup-banner/update`,
        params : {id},
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useGetPopUpBannerQuery,
  useAddPopUpBannerMutation,
  useGetAllPopUpBannerQuery,
  useUpdatePopUpBannerMutation,
} = popUpBannerApi;
