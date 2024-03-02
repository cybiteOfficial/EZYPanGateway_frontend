import { UpdateBusinessOpportunity } from "src/models/BusinessOpportunity.model";
import { PaginationType } from "src/models/common/PaginationType.model";
import apiSlice from "./ApiSlice";

export const businessOpportunityApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // POST REQUEST
    getBusinessOpportunity: builder.query({
      providesTags: ["business-opportunity"],
      query: (body: PaginationType) => ({
        url: "/business-opportunity/list/pagination",
        method: "POST",
        body,
      }),
    }),

    // UPDATE
    updateBusinessOpportunity: builder.mutation({
      invalidatesTags: ["business-opportunity"],
      query: ({ body, id }: UpdateBusinessOpportunity) => ({
        url: `/business-opportunity/update`,
        params :{id},
        method: "PUT",
        body,
      }),
    }),
    // GET REQUEST
    getBusinessOpportunityById: builder.query({
      providesTags: ["business-opportunity"],
      query: (id: string) => ({
        url: `business-opportunity/admin/view`,
        params :{id},
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetBusinessOpportunityQuery,
  useGetBusinessOpportunityByIdQuery,
  useUpdateBusinessOpportunityMutation,
} = businessOpportunityApi;
