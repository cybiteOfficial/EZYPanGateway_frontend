import { PaginationType } from "src/models/common/PaginationType.model";
import apiSlice from "./ApiSlice";

export const contactUsEnquiryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // POST REQUEST
    getContactUsEnquiry: builder.query({
      providesTags: ["loan-enquiry"],
      query: (body: PaginationType) => ({
        url: "/contact-us-enquiry/list/pagination",
        method: "POST",
        body,
      }),
    }),
     // Export Data
     exportContactUsData: builder.mutation({
      query: (body: PaginationType) => ({
        url: "/contact-us-enquiry/list/pagination",
        method: "POST",
        body,
      }),
    }),
    
    // CHANGE STATUS
    changeContactUsEnquiryStatus: builder.mutation({
      invalidatesTags: ["contact-us-enquiry"],
      query: ({
        body,
        contactUsEnquiryId,
      }: {
        body: {
          answer?: string;
          toEmail?: string;
          ccEmail?: string;
        };
        contactUsEnquiryId: string;
      }) => ({
        url: `/contact-us-enquiry/update-status/${contactUsEnquiryId}`,
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
    useGetContactUsEnquiryQuery,
    useChangeContactUsEnquiryStatusMutation,
    useExportContactUsDataMutation,
} = contactUsEnquiryApi;
