import { PaginationType } from "src/models/common/PaginationType.model";
import apiSlice from "./ApiSlice";
import { UpdatePANRewardService } from "src/models/PANServiceReward.model";

export const panRewardServiceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

      // POST REQUEST
      getPANRewardServicePagination: builder.query({
        providesTags: ["pan-reward-services"],
        query: (body: PaginationType) => ({
          url: "/reward/list/pagination",
          method: "POST",
          body,
        }),
      }),
    // GET Single
    getPANRewardService: builder.query({
      providesTags: ["pan-reward-services"],
      query: () => ({
        url: "/reward/admin/view",
        params :{serviceName :"PAN"},
        method: "GET",
      }),
    }),

      // UPDATE
      updatePANReward: builder.mutation({
        invalidatesTags: ["pan-reward-services"],
        query: ( body : UpdatePANRewardService) => ({
          url: `/reward/update`,
          params: {serviceName:"PAN" },
          method: "PUT",
          body,
        }),
      }),

   
  }),
});

export const {
 useGetPANRewardServicePaginationQuery,useGetPANRewardServiceQuery,useUpdatePANRewardMutation
} = panRewardServiceApi;
