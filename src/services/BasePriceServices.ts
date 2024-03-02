import { PaginationType } from "src/models/common/PaginationType.model";
import apiSlice from "./ApiSlice";

export const basePriceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET REQUEST
    getBasePriceList: builder.query({
      providesTags: ["price-config"],
      query: (body: PaginationType) => ({
        url: "/price-config/list/pagination",
        method: "POST",
        body,
      }),
    }),

    // Update
    updateBasePrice: builder.mutation({
      invalidatesTags: ["price-config"],
      query: ({ body, id }) => ({
        url: `/price-config/update`,
        params : {id},
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const { useGetBasePriceListQuery, useUpdateBasePriceMutation } =
  basePriceApi;
