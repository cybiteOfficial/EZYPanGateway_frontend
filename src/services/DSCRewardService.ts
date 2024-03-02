import { PaginationType } from "src/models/common/PaginationType.model";
import apiSlice from "./ApiSlice";
import { UpdateDSCRewardService } from "src/models/DSCServiceReward.model";

export const dscRewardServiceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

      // POST REQUEST
      getDSCRewardServicePagination: builder.query({
        providesTags: ["dsc-reward-services"],
        query: (body: PaginationType) => ({
          url: "/reward/list/pagination",
          method: "POST",
          body,
        }),
      }),
    // GET Single
    getDSCRewardService: builder.query({
      providesTags: ["dsc-reward-services"],
      query: () => ({
        url: "/reward/admin/view",
        params: { serviceName: "DSC" },
        method: "GET",
      }),
    }),

      // UPDATE
      updateDSCReward: builder.mutation({
        invalidatesTags: ["dsc-reward-services"],
        query: ( body : UpdateDSCRewardService) => ({
          url: `/reward/update`,
          params: { serviceName :"DSC" },
          method: "PUT",
          body,
        }),
      }),

   
  }),
});

export const {
    useGetDSCRewardServicePaginationQuery,useGetDSCRewardServiceQuery,useUpdateDSCRewardMutation
} = dscRewardServiceApi;
