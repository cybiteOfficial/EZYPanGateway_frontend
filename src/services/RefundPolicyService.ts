import { UpdateRefundPolicy } from "src/models/RefundPolicy.model";
import apiSlice from "./ApiSlice";

export const privacyAndPolicyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
        // GET REQUEST    
    getRefundPolicy: builder.query({
      providesTags: ["refund-policy"],
      query: () => ({
        url: "/refund-and-cancellation/get-all",
        method: "GET",
      }),
    }),
       
    // UPDATE
    updateRefundPolicy: builder.mutation({
      invalidatesTags: ["refund-policy"],
      query: ({ body, id }: UpdateRefundPolicy) => ({
        url: `/refund-and-cancellation/update`,
        params : {id},
        method: "PUT",
        body,
      }),
    }),

})
})
export const {useGetRefundPolicyQuery,useUpdateRefundPolicyMutation} = privacyAndPolicyApi