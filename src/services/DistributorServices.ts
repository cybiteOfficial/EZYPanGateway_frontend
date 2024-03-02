import { PaginationType } from "src/models/common/PaginationType.model";
import apiSlice from "./ApiSlice";

export const distributorApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // POST REQUEST
    getDistributors: builder.query({
      providesTags: ["distributor"],
      query: (body: PaginationType) => ({
        url: "/distributor/list/pagination",
        method: "POST",
        body,
      }),
    }),
 
   //Update Profile 
   updateDistributorProfile:builder.mutation({
    invalidatesTags: ["distributor"],
    query: ({
      body,
      distributorId,
    }) => ({
      url: `/user/update-profile`,
      params : {id: distributorId},
      method: "PUT",
      body,
    }),
  }),

    // GET ALL
    getAllDistributors: builder.query({
      providesTags: ["distributor"],
      query: (searchValue) => ({
        url: "/distributor/get-all",
        params:{
          search :searchValue
        },
        method: "GET",
      }),
    }),

    // GET SINGLE
    getSingleDistributor: builder.query({
      providesTags: ["distributor"],
      query: (distributorId) => ({
        url: `/distributor/admin/view`,
        params : {id : distributorId},
        method: "GET",
      }),
    }),

    //Subscription-list
    getDistributorSubscription: builder.query({
      providesTags: ["distributor"],
      query: (body: PaginationType) => ({
        url: "/distributor/admin/subscriptions",
        method: "POST",
        body,
      }),
    }),

    // CHANGE STATUS
    changeDistributorStatus: builder.mutation({
      invalidatesTags: ["distributor"],
      query: ({
        body,
        distributorId,
      }: {
        body: FormData ;
        distributorId: string;
      }) => ({
        url: `/distributor/update-status`,
        params : {id: distributorId},
        method: "PUT",
        body,
      }),
    }),

    // Export Data
    exportDistributorData: builder.mutation({
      query: (body: PaginationType) => ({
        url: "/distributor/list/pagination",
        method: "POST",
        body,
      }),
    }),



    // Block Or Unblock
    distributorblockUnblock: builder.mutation({
      invalidatesTags: ["distributor"],
      query: (distributorId) => ({
        url: `/distributor/block-user`,
        params : {id: distributorId},
        method: "PUT",
      }),
    }),
    // GETALL
   
  }),
});

export const {
  useGetDistributorsQuery,
  useGetAllDistributorsQuery,
  useExportDistributorDataMutation,
  useGetSingleDistributorQuery,
  useGetDistributorSubscriptionQuery,
  useChangeDistributorStatusMutation,
  useDistributorblockUnblockMutation,
  useUpdateDistributorProfileMutation
} = distributorApi;
