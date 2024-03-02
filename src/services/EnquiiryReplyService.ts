import apiSlice from "./ApiSlice";

export const enquiryReplyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
//  l
    enquiryReply: builder.mutation({
      invalidatesTags: ["loan-enquiry","business-enquiry","contact-info"],
      query: (body) => ({
        url: `/send-email/add`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
    useEnquiryReplyMutation
} = enquiryReplyApi;
