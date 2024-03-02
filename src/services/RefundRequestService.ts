import { PaginationType } from "src/models/common/PaginationType.model";
import apiSlice from "./ApiSlice";

export const refundRequestApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET REQUEST
    getRefundRequestList: builder.query({
      providesTags: ["refund-request"],
      query: (body: PaginationType) => ({
        url: "/refund-request/admin/list/pagination",
        method: "POST",
        body,
      }),
    }),

    // Update

    changeStatusRefundRequest: builder.mutation({
      invalidatesTags: ["refund-request"],
      query: ({
        body,
        refundRequestId,
      }: {
        body: {
          requestedStatus: "COMPLETE" | "REJECT" ;
          remark?: string;
          transactionNumber?:string;
        };
        refundRequestId: string;
       
      }) => ({
        url: `/refund-request/update-status`,
        params : {id :refundRequestId },
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const { useGetRefundRequestListQuery, useChangeStatusRefundRequestMutation } =
refundRequestApi;
