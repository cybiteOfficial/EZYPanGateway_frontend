import { PaginationType } from "src/models/common/PaginationType.model";
import apiSlice from "./ApiSlice";
import { UpdateITRRewardService } from "src/models/ITRServiceReward.model";

export const itrRewardServiceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

      // POST REQUEST
      getITRRewardServicePagination: builder.query({
        providesTags: ["itr-reward-services"],
        query: (body: PaginationType) => ({
          url: "/reward/list/pagination",
          method: "POST",
          body,
        }),
      }),
    // GET Single
    getITRRewardService: builder.query({
      providesTags: ["itr-reward-services"],
      query: () => ({
        url: "/reward/admin/view",
        params :{serviceName:"ITR"},
        method: "GET",
      }),
    }),

      // UPDATE
      updateITRReward: builder.mutation({
        invalidatesTags: ["itr-reward-services"],
        query: (body: UpdateITRRewardService) => ({
          url: `/reward/update`,
          params: {serviceName:"ITR" },
          method: "PUT",
          body,
        }),
      }),

   
  }),
});

export const {
useGetITRRewardServicePaginationQuery,useGetITRRewardServiceQuery,useUpdateITRRewardMutation
} = itrRewardServiceApi;
