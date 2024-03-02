import { PaginationType } from "src/models/common/PaginationType.model";
import apiSlice from "./ApiSlice";

export const businessEnquiryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // POST REQUEST
    getBusinessEnquiry: builder.query({
      providesTags: ["business-enquiry"],
      query: (body: PaginationType) => ({
        url: "/business-enquiry/list/pagination",
        method: "POST",
        body,
      }),
    }),
     // Export Data
     exportBusinessEnquiryData: builder.mutation({
      query: (body: PaginationType) => ({
        url: "/business-enquiry/list/pagination",
        method: "POST",
        body,
      }),
    }),
    
    // CHANGE STATUS
    changeBusinessEnquiryStatus: builder.mutation({
      invalidatesTags: ["business-enquiry"],
      query: ({
        body,
        businessEnquiryId,
      }: {
        body: {
          answer: string;
          toEmail: string;
          ccEmail?: string;
        };
        businessEnquiryId: string;
      }) => ({
        url: `/business-enquiry/update-status/${businessEnquiryId}`,
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
    useGetBusinessEnquiryQuery,
    useChangeBusinessEnquiryStatusMutation,
    useExportBusinessEnquiryDataMutation,
} = businessEnquiryApi;
