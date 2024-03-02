import { PaginationType } from "src/models/common/PaginationType.model";
import apiSlice from "./ApiSlice";

export const retailerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // POST REQUEST
    getRetailers: builder.query({
      providesTags: ["retailer"],
      query: (body: PaginationType) => ({
        url: "/retailer/list/pagination",
        method: "POST",
        body,
      }),
    }),

    // GET SINGLE
    getSingleRetailer: builder.query({
      providesTags: ["retailer"],
      query: (retailerId) => ({
        url: `/retailer/admin/view`,
        params : {id : retailerId},
        method: "GET",
      }),
    }),

    // CHANGE STATUS
    changeRetailerStatus: builder.mutation({
      invalidatesTags: ["retailer"],
      query: ({
        body,
        retailerId,
      }: {
        body: {
          requestedStatus: "BLOCKED" | "UN_BLOCK";
        };
        retailerId: string;
      }) => ({
        url: `/retailer/block-user`,
        params : {id: retailerId},
        method: "PUT",
        body,
      }),
    }),

    // Export Data
    exportRetailerData: builder.mutation({
      query: (body: PaginationType) => ({
        url: "/retailer/list/pagination",
        method: "POST",
        body
      }),
    }),
    // Block Or Unblock
    retailerblockUnblock: builder.mutation({
      invalidatesTags: ["retailer"],
      query: (retailerId) => ({
        url: `/retailer/block-user`,
        params : {id: retailerId},
        method: "PUT",
      }),
    }),
    // Get-All
    getAllRetailer :builder.query({
      providesTags :["retailer"],
      query:(searchValue)=>({
    
        url :`/retailer/get-all`,
        params:{
          search:searchValue,
        },
        method :"GET",
      })

    })
  }),
});

export const {
  useGetAllRetailerQuery,
  useGetRetailersQuery,
  useExportRetailerDataMutation,
  useGetSingleRetailerQuery,
  useRetailerblockUnblockMutation,
  useChangeRetailerStatusMutation,
} = retailerApi;
