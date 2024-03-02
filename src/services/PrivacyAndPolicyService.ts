import { UpdatePrivacyAndPolicy } from "src/models/PrivacyAndPolicy.model";
import apiSlice from "./ApiSlice";

export const privacyAndPolicyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET REQUEST
    getPrivacyAndPolicy: builder.query({
      providesTags: ["privacy-policy"],
      query: () => ({
        url: "/privacy-policy/get-all",
        method: "GET",
      }),
    }),

    // UPDATE
    updatePrivacyAndPolicy: builder.mutation({
      invalidatesTags: ["privacy-policy"],
      query: ({ body, id }: UpdatePrivacyAndPolicy) => ({
        url: `/privacy-policy/update`,
        params: { id },
        method: "PUT",
        body,
      }),
    }),
  }),
});
export const {
  useGetPrivacyAndPolicyQuery,
  useUpdatePrivacyAndPolicyMutation,
} = privacyAndPolicyApi;
