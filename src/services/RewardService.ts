import { PaginationType } from "src/models/common/PaginationType.model";
import apiSlice from "./ApiSlice";

export const rewardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET REQUEST
    getRewardList: builder.query({
      providesTags: ["reward-point"],
      query: (body: PaginationType) => ({
        url: "/reward-point/user-reward/pagination",
        method: "POST",
        body,
      }),
    }),

    // Export Data
    exportRewardList: builder.mutation({
      query: (body: PaginationType) => ({
        url: "/reward-point/user-reward/pagination",
        method: "POST",
        body,
      }),
    }),

    // Update
    updateReward: builder.mutation({
      invalidatesTags: ["reward-point"],
      query: ({ body, id }) => ({
        url: `/reward-point/update`,
        params: { id },
        method: "PUT",
        body,
      }),
    }),

    //Add Reward Entry in user Ledger
    addRewardEntryInLedger: builder.mutation({
      invalidatesTags: ["reward-point"],
      query: (body: any) => ({
        url: "/reward-point/add",
        method: "POST",
        body,
      }),
    }),
    // **** DELETE  Reward Entry in user Ledger
    DeleteRewardEntryInLedger: builder.mutation({
      invalidatesTags: ["reward-point"],
      query: (id: string) => ({
        url: `/reward-point/delete`,
        params: { id },
        method: "DELETE",
      }),
    }),

    // Update Reward Entry in user Ledger
    UpdateRewardEntryInLedger: builder.mutation({
      invalidatesTags: ["reward-point"],
      query: ({ body, id }: any) => ({
        url: `/reward-point/history/update`,
        params: { id },
        method: "PUT",
        body,
      }),
    }),

    // GET Reward Entry in user Ledger
    getRewardEntryInLedger: builder.query({
      providesTags: ["reward-point"],
      query: (id: string) => ({
        url: `/reward-point/view`,
        params: { id },
        method: "GET",
      }),
    }),
    //GET USER WALLET AMOUNT
    getUserRewardWallet: builder.query({
      providesTags: ["reward-point"],
      query: (id: any) => ({
        url: `/reward-point/admin/get-wallet`,
        params: { id },
        method: "GET",
      }),
    }),

    //UPDATE USER WALLET AMOUNT
    UpdateUserRewardWallet: builder.mutation({
      invalidatesTags: ["reward-point"],
      query: (body: any) => ({
        url: `/reward-point/admin/update-wallet`,
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useGetRewardListQuery,
  useUpdateRewardMutation,
  useExportRewardListMutation,
  useAddRewardEntryInLedgerMutation,
  useDeleteRewardEntryInLedgerMutation,
  useGetRewardEntryInLedgerQuery,
  useUpdateRewardEntryInLedgerMutation,
  useGetUserRewardWalletQuery ,
  useUpdateUserRewardWalletMutation
} = rewardApi;
