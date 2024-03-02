import { PaginationType } from "src/models/common/PaginationType.model";
import apiSlice from "./ApiSlice";

export const loanEnquiryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // POST REQUEST
    getLoanEnquiry: builder.query({
      providesTags: ["loan-enquiry"],
      query: (body: PaginationType) => ({
        url: "/loan-enquiry/list/pagination",
        method: "POST",
        body,
      }),
    }),
    // CHANGE STATUS
    changeLoanEnquiryStatus: builder.mutation({
      invalidatesTags: ["loan-enquiry"],
      query: ({
        body,
        loanEnquiryId,
      }: {
        body: {
          answer?: string;
          toEmail?: string;
          ccEmail?: string;
        };
        loanEnquiryId: string;
      }) => ({
        url: `/loan-enquiry/update-status/${loanEnquiryId}`,
        method: "PUT",
        body,
      }),
    }),

    // Export Data
    exportLoanEnquiryData: builder.mutation({
      query: (body: PaginationType) => ({
        url: "/loan-enquiry/list/pagination",
        method: "POST",
        body,
      }),
    }),
    loanEnquiryReply: builder.mutation({
      invalidatesTags: ["loan-enquiry"],
      query: (body) => ({
        url: `/send-email/add`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLoanEnquiryReplyMutation,
  useGetLoanEnquiryQuery,
  useChangeLoanEnquiryStatusMutation,
  useExportLoanEnquiryDataMutation,
} = loanEnquiryApi;
