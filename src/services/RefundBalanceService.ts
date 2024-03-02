import { PaginationType } from "src/models/common/PaginationType.model";
import apiSlice from "./ApiSlice";

export const refundBalanceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET REQUEST
    getRefundBalanceList: builder.query({
      providesTags: ["refund-balance"],
      query: (body: PaginationType) => ({
        url: "/refund-wallet-transaction/list/pagination",
        method: "POST",
        body,
      }),
    }),

    //Export
    exportRefundBalanceList: builder.mutation({
      query: (body: PaginationType) => ({
        url: "/refund-wallet-transaction/list/pagination",
        method: "POST",
        body,
      }),
    }),

    // Update
    updateRefundBalance: builder.mutation({
      invalidatesTags: ["refund-balance"],
      query: ({ body, id }) => ({
        url: `/refund-wallet/admin/get-wallet`,
        params: { userId: id },
        method: "PUT",
        body,
      }),
    }),

    //Add Refund Entry in user Ledger
    addRefundEntryInLedger: builder.mutation({
      invalidatesTags: ["refund-balance"],
      query: (body: any) => ({
        url: "/refund-wallet-transaction/add",
        method: "POST",
        body,
      }),
    }),
    // **** DELETE  Refund Entry in user Ledger
    DeleteRefundEntryInLedger: builder.mutation({
      invalidatesTags: ["refund-balance"],
      query: (id: string) => ({
        url: `/refund-wallet-transaction/delete`,
        params: { id },
        method: "DELETE",
      }),
    }), 

     // Update Refund Entry in user Ledger
     UpdateRefundEntryInLedger: builder.mutation({
      invalidatesTags: ["refund-balance"],
      query: ({ body, id }: any) => ({
        url: `/refund-wallet-transaction/update`,
        params : {id},
        method: "PUT",
        body,
      }),
    }),

    // GET Refund Entry in user Ledger
    getRefundEntryInLedger: builder.query({
      providesTags: ["refund-balance"],
      query: (id: string) => ({
        url: `/refund-wallet-transaction/view`,
        params: { id },
        method: "GET",
      }),
    }),

    //GET USER WALLET AMOUNT 
    getUserRefundWallet: builder.query({
      providesTags: ["refund-balance"],
      query: (id: any) => ({
        url: `/refund-wallet/admin/get-wallet`,
        params: { id },
        method: "GET",
      }),
    }),

     //UPDATE USER WALLET AMOUNT 
     UpdateUserRefundWallet: builder.mutation({
      invalidatesTags: ["refund-balance"],
      query: (body: any) => ({
        url: `/refund-wallet/admin/update-wallet`,
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useGetRefundBalanceListQuery,
  useUpdateRefundBalanceMutation,
  useExportRefundBalanceListMutation,
  useAddRefundEntryInLedgerMutation,
  useDeleteRefundEntryInLedgerMutation ,
  useGetRefundEntryInLedgerQuery,
  useUpdateRefundEntryInLedgerMutation ,
  useGetUserRefundWalletQuery ,
  useUpdateUserRefundWalletMutation
} = refundBalanceApi;
