import { PaginationType } from "src/models/common/PaginationType.model";
import { updateAssignee, UpdateGumasta } from "src/models/Gumasta.model";
import apiSlice from "./ApiSlice";

export const gumastaApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // POST REQUEST
    getGumasta: builder.query({
      providesTags: ["gumasta-application"],
      query: (body: PaginationType) => ({
        url: "/gumasta-application/list/pagination",
        method: "POST",
        body,
      }),
    }),

    // GET SINGLE
    getSingleGumasta: builder.query({
      providesTags: ["gumasta-application"],
      query: (gumastaId) => ({
        url: `/gumasta-application/admin/view`,
        params: { id: gumastaId },
        method: "GET",
      }),
    }),

     // GET SINGLE
     getGumastaFlowData: builder.mutation({
      query: (gumastaId) => ({
        url: `/gumasta-application/get-status-history`,
        params: { id: gumastaId },
        method: "PUT",
      }),
    }),


    // Change Status
    changeGumastaStatus: builder.mutation({
      invalidatesTags: ["gumasta-application", "pending-applications"],
      query: ({ body, id }: UpdateGumasta) => ({
        url: `/gumasta-application/update-status`,
        params: { id },
        method: "PUT",
        body,
      }),
    }),

    // GET REPORT
    getGumastaZip: builder.mutation({
      query: (srn) => ({
        url: `/gumasta-application/zip`,
        params: { srn },
        method: "GET",
      }),
    }),

    // Assignee
    changeGumastaApplicationAssignee: builder.mutation({
      invalidatesTags: ["gumasta-application"],
      query: ({ body, id }: updateAssignee) => ({
        url: `/gumasta-application/assign-to`,
        params: { id },
        method: "POST",
        body,
      }),
    }),

    // GET STATUS COUNT
    getGumastaStatusWiseCount: builder.query({
      providesTags: ["gumasta-application"],
      query: () => ({
        url: "/gumasta-application/get-allstatuscounts",
        method: "GET",
      }),
    }),

    // Export Data
    exportHistoryGumastaData: builder.mutation({
      query: (body: PaginationType) => ({
        url: "/gumasta-application/list/pagination",
        method: "POST",
        body,
      }),
    }),

     // GET STATUS WISE APPLICATIONS

    //PENDING  REQUEST
    getGumastaPendingApplications: builder.query({
      providesTags: ["gumasta-application"],
      query: (body: PaginationType) => ({
        url: "/gumasta-application/get-pending-applications",
        method: "POST",
        body,
      }),
    }),

    //VERIFIED  REQUEST
    getGumastaVerifiedApplications: builder.query({
      providesTags: ["gumasta-application"],
      query: (body: PaginationType) => ({
        url: "/gumasta-application/get-verified-applications",
        method: "POST",
        body,
      }),
    }),
    //REJECTED  REQUEST
    getGumastaRejectedApplications: builder.query({
      providesTags: ["gumasta-application"],
      query: (body: PaginationType) => ({
        url: "/gumasta-application/get-rejected-applications",
        method: "POST",
        body,
      }),
    }),
    //IN RPOGRESS  REQUEST
    getGumastaInProgressApplications: builder.query({
      providesTags: ["gumasta-application"],
      query: (body: PaginationType) => ({
        url: "/gumasta-application/get-inprogress-applications",
        method: "POST",
        body,
      }),
    }),
    //Done REQUEST
    getGumastaDoneApplications: builder.query({
      providesTags: ["gumasta-application"],
      query: (body: PaginationType) => ({
        url: "/gumasta-application/get-done-applications",
        method: "POST",
        body,
      }),
    }),

    //CANCELLED REQUEST
    getGumastaCancelledApplications: builder.query({
      providesTags: ["gumasta-application"],
      query: (body: PaginationType) => ({
        url: "/gumasta-application/get-cancelled-applications",
        method: "POST",
        body,
      }),
    }),

    //Generate REQUEST
    getGumastaGenerateApplications: builder.query({
      providesTags: ["gumasta-application"],
      query: (body: PaginationType) => ({
        url: "/gumasta-application/get-generate-applications",
        method: "POST",
        body,
      }),
    }),


  }),
});

export const {
  useGetGumastaQuery,
  useExportHistoryGumastaDataMutation,
  useGetSingleGumastaQuery,
  useGetGumastaZipMutation,
  useChangeGumastaApplicationAssigneeMutation,
  useGetGumastaCancelledApplicationsQuery,
  useGetGumastaDoneApplicationsQuery,
  useGetGumastaGenerateApplicationsQuery,
  useGetGumastaInProgressApplicationsQuery,
  useGetGumastaPendingApplicationsQuery,
  useGetGumastaRejectedApplicationsQuery,
  useGetGumastaVerifiedApplicationsQuery,
  useChangeGumastaStatusMutation,
  useGetGumastaStatusWiseCountQuery,
  useGetGumastaFlowDataMutation
} = gumastaApi;
