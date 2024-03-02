import { UpdateTermsAndCondition } from "src/models/TermsAndCondition.model";
import apiSlice from "./ApiSlice";

export const termsAndConditionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
        // GET REQUEST    
    getTermsAndCondition: builder.query({
      providesTags: ["terms-and-condition"],
      query: () => ({
        url: "/terms-and-conditions/get-all",
        method: "GET",
      }),
    }),
       
    // UPDATE
    updateTermsAndCondition: builder.mutation({
      invalidatesTags: ["terms-and-condition"],
      query: ({ body, id }: UpdateTermsAndCondition) => ({
        url: `/terms-and-conditions/update`,
        params : {id},
        method: "PUT",
        body,
      }),
    }),
     // ADD
     addTermsAndCondition: builder.mutation({
      invalidatesTags: ["terms-and-condition"],
      query: (body) => ({
        url: "/terms-and-conditions/add",
        method: "POST",
        body,
      }),
    }),
})
})
export const {useGetTermsAndConditionQuery,useUpdateTermsAndConditionMutation } = termsAndConditionApi