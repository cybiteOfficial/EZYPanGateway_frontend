import { PaginationType } from "src/models/common/PaginationType.model";
import apiSlice from "./ApiSlice";

export const comissionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ledger commission Pagination
    getledgerCommission: builder.query({
      providesTags: ["commission"],
      query: (body: PaginationType) => ({
        url: "/user-commission/admin/list/pagination",
        method: "POST",
        body,
      }),
    }),

    //Export
    ExportledgerCommission: builder.mutation({
      query: (body: PaginationType) => ({
        url: "/user-commission/admin/list/pagination",
        method: "POST",
        body,
      }),
    }),

    // ledger commission Pagination
    getServiceCommissionGetAll: builder.query({
      providesTags: ["commission"],
      query: (commissionName) => ({
        url: "commission/admin/get-all",
        params: { commissionName },
        method: "GET",
      }),
    }),

    // ITR SERVICE FOR COMMISSION
    // Pagination
    getServiceCommission: builder.query({
      providesTags: ["commission"],
      query: (body: PaginationType) => ({
        url: "/commission/updated-history",
        method: "POST",
        body,
      }),
    }),

    // Get All
    getServiceCommissionView: builder.query({
      providesTags: ["commission"],
      query: (commissionName) => ({
        url: "/commission/admin/view",
        params: { commissionName },
        method: "GET",
      }),
    }),

    //Update
    updateServiceCommission: builder.mutation({
      invalidatesTags: ["commission"],
      query: ({
        body,
        commissionName,
      }: {
        body: {
          commissionForDistributor: number;
        };
        commissionName: string;
      }) => ({
        url: `/commission/update`,
        params: { commissionName },
        method: "PUT",
        body,
      }),
    }),

    //Get PAN SERVICE CATEGORIES
    getPanServiceCommissionView: builder.query({
      providesTags: ["commission"],
      query: (body: any) => ({
        url: "/commission/admin/get-categories",
        method: "POST",
        body,
      }),
    }),
     //Update
     updatePanServiceCommission: builder.mutation({
      invalidatesTags: ["commission"],
      query: ({ body,commissionName,}: {
        body: {commissionForDistributor: number , categoryType:string};
        commissionName: string;
      }) => ({
        url: `/commission/update-categories`,
        params: { commissionName },
        method: "PUT",
        body,
      }),
    }),

     //Add Commission Entry in user Ledger
     addCommissionEntryInLedger: builder.mutation({
      invalidatesTags: ["commission"],
      query: (body: any) => ({
        url: "/commission/history/add",
        method: "POST",
        body,
      }),
    }),
    // **** DELETE  Commission Entry in user Ledger
    DeleteCommissionEntryInLedger: builder.mutation({
      invalidatesTags: ["commission"],
      query: (id: string) => ({
        url: `/commission/history/delete`,
        params: { id },
        method: "DELETE",
      }),
    }), 

     // Update Commission Entry in user Ledger
     UpdateCommissionEntryInLedger: builder.mutation({
      invalidatesTags: ["commission"],
      query: ({ body, id }: any) => ({
        url: `/commission/history/update`,
        params : {id},
        method: "PUT",
        body,
      }),
    }),

    // GET Commission Entry in user Ledger
    getCommissionEntryInLedger: builder.query({
      providesTags: ["commission"],
      query: (id: string) => ({
        url: `/commission/history/view`,
        params: { id },
        method: "GET",
      }),
    }),
  }),
});

export const {
  useUpdateServiceCommissionMutation,
  useGetServiceCommissionQuery,
  useGetServiceCommissionViewQuery,
  useGetPanServiceCommissionViewQuery,
  useGetServiceCommissionGetAllQuery,
  useGetledgerCommissionQuery,
  useUpdatePanServiceCommissionMutation,
  useExportledgerCommissionMutation,
  useAddCommissionEntryInLedgerMutation,
  useDeleteCommissionEntryInLedgerMutation ,
  useGetCommissionEntryInLedgerQuery,
  useUpdateCommissionEntryInLedgerMutation
} = comissionApi;
