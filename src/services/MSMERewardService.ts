import { PaginationType } from "src/models/common/PaginationType.model";
import apiSlice from "./ApiSlice";
import { UpdateMSMERewardService } from "src/models/MSMEServiceReward.model";

export const msmeRewardServiceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

      // POST REQUEST
      getMSMERewardServicePagination: builder.query({
        providesTags: ["msme-reward-services"],
        query: (body: PaginationType) => ({
          url: "/reward/list/pagination",
          method: "POST",
          body,
        }),
      }),
    // GET Single
    getMSMERewardService: builder.query({
      providesTags: ["msme-reward-services"],
      query: () => ({
        url: "/reward/admin/view",
        params: { serviceName :"MSME" },
        method: "GET",
      }),
    }),

      // UPDATE
      updateMSMEReward: builder.mutation({
        invalidatesTags: ["msme-reward-services"],
        query: (body: UpdateMSMERewardService) => ({
          url: `/reward/update`,
          params: { serviceName :"MSME" },
          method: "PUT",
          body,
        }),
      }),

   
  }),
});

export const {
    useGetMSMERewardServicePaginationQuery,useGetMSMERewardServiceQuery,useUpdateMSMERewardMutation
} = msmeRewardServiceApi;
