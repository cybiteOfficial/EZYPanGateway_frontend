import { PaginationType } from "src/models/common/PaginationType.model";
import apiSlice from "./ApiSlice";

export const paymentFailedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // POST REQUEST
    getPanFailedPayment: builder.query({
      query: (body: PaginationType) => ({
        url: "/pan-app/admin/list/payment-pending",
        method: "POST",
        body,
      }),
    }),
    // POST REQUEST
    getITRFailedPayment: builder.query({
      query: (body: PaginationType) => ({
        url: "/itr-application/admin/list/payment-pending",
        method: "POST",
        body,
      }),
    }),
    // POST REQUEST
    getGumastaFailedPayment: builder.query({
      query: (body: PaginationType) => ({
        url: "/gumasta-application/admin/list/payment-pending",
        method: "POST",
        body,
      }),
    }),
    // POST REQUEST
    getDSCFailedPayment: builder.query({
      query: (body: PaginationType) => ({
        url: "/dsc-application/admin/list/payment-pending",
        method: "POST",
        body,
      }),
    }),
    // POST REQUEST
    getMSMEFailedPayment: builder.query({
      query: (body: PaginationType) => ({
        url: "/msme-application/admin/list/payment-pending",
        method: "POST",
        body,
      }),
    }),  

    //PAYMENT DETAIL
    getDSCPaymentDetail: builder.query({
      query: (body: PaginationType) => ({
        url: "/dsc-application/payment-history",
        method: "POST",
        body,
      }),
    }), 
    getGumastaPaymentDetail: builder.query({
      query: (body: PaginationType) => ({
        url: "/gumasta-application/payment-history",
        method: "POST",
        body,
      }),
    }), 
    getITRPaymentDetail: builder.query({
      query: (body: PaginationType) => ({
        url: "/itr-application/payment-history",
        method: "POST",
        body,
      }),
    }), 
    getMSMEPaymentDetail: builder.query({
      query: (body: PaginationType) => ({
        url: "/msme-application/payment-history",
        method: "POST",
        body,
      }),
    }), 
    getPANPaymentDetail: builder.query({
      query: (body: PaginationType) => ({
        url: "/pan-app/payment-history",
        method: "POST",
        body,
      }),
    }), 
  }),
});

export const {
  useGetPanFailedPaymentQuery,
  useGetDSCFailedPaymentQuery,
  useGetGumastaFailedPaymentQuery,
  useGetITRFailedPaymentQuery,
  useGetMSMEFailedPaymentQuery,
  useGetDSCPaymentDetailQuery,
  useGetGumastaPaymentDetailQuery,
  useGetITRPaymentDetailQuery,
  useGetMSMEPaymentDetailQuery,
  useGetPANPaymentDetailQuery
} = paymentFailedApi;
