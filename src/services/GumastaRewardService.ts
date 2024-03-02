import { PaginationType } from "src/models/common/PaginationType.model";
import apiSlice from "./ApiSlice";
import { UpdateGumastaRewardService } from "src/models/GumastaServiceReward.model";

export const gumastaRewardServiceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // POST REQUEST
    getGumastaRewardServicePagination: builder.query({
      providesTags: ["gumasta-reward-services"],
      query: (body: PaginationType) => ({
        url: "/reward/list/pagination",
        method: "POST",
        body,
      }),
    }),
    // GET All
    getGumastaRewardService: builder.query({
      providesTags: ["gumasta-reward-services"],
      query: () => ({
        url: "/reward/admin/view",
        params: { serviceName: "GUMASTA" },
        method: "GET",
      }),
    }),

    // UPDATE
    updateGumastaReward: builder.mutation({
      invalidatesTags: ["gumasta-reward-services"],
      query: (body: UpdateGumastaRewardService) => ({
        url: `/reward/update`,
        params: { serviceName: "GUMASTA" },
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useGetGumastaRewardServicePaginationQuery,
  useGetGumastaRewardServiceQuery,
  useUpdateGumastaRewardMutation,
} = gumastaRewardServiceApi;
