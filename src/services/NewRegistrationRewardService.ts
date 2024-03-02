import { PaginationType } from "src/models/common/PaginationType.model";
import apiSlice from "./ApiSlice";

export const newRegistrationRewardServiceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Pagination
    getNewRegistrationRewardService: builder.query({
      providesTags: ["retailer-register-reward"],
      query: (body: PaginationType) => ({
        url: "/retailer-register-reward/list/pagination",
        method: "POST",
        body,
      }),
    }),
    // Get All
    getAllNewRegistrationRewardService: builder.query({
      providesTags: ["retailer-register-reward"],
      query: () => ({
        url: "/retailer-register-reward/get-all",
        method: "GET",
      }),
    }),

    //Update
    updateNewRegistrationRewardService: builder.mutation({
      invalidatesTags: ["retailer-register-reward"],
      query: ({
        body,
        id,
      }: {
        body: {
          retailerRegisterRewardPoint: number;
        };
        id: string;
      }) => ({
        url: `/retailer-register-reward/update`,
        params : {id},
        method: "PUT",
        body
      }),
    }),

  }),
});

export const {
  useGetNewRegistrationRewardServiceQuery,
  useUpdateNewRegistrationRewardServiceMutation,
  useGetAllNewRegistrationRewardServiceQuery
} = newRegistrationRewardServiceApi;
