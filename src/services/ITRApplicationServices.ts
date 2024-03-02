import { PaginationType } from "src/models/common/PaginationType.model";
import { updateAssignee, UpdateITR } from "src/models/ITR.model";
import apiSlice from "./ApiSlice";

export const itrApplicationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET
    getITRApplication: builder.query({
      providesTags: ["itr-application"],
      query: (body: PaginationType) => ({
        url: "/itr-application/list/pagination",
        method: "POST",
        body,
      }),
    }),

    // GET
    getSingleITRApplication: builder.query({
      providesTags: ["itr-application"],
      query: (applicationId) => ({
        url: `/itr-application/admin/view`,
        params: { id: applicationId },
        method: "GET",
      }),
    }),

      // GET
      getITRflowData: builder.mutation({
        query: (applicationId) => ({
          url: `/itr-application/get-status-history`,
          params: { id: applicationId },
          method: "PUT",
        }),
      }),

    // Export Data
    exportHistoryITRData: builder.mutation({
      query: (body: PaginationType) => ({
        url: "/itr-application/list/pagination",
        method: "POST",
        body,
      }),
    }),

    // Change status
    changeITRStatus: builder.mutation({
      invalidatesTags: ["itr-application", "pending-applications"],
      query: ({ body, id }: UpdateITR) => ({
        url: `/itr-application/update-status`,
        params: { id },
        method: "PUT",
        body,
      }),
    }),

    //assignee
    changeITRApplicationAssignee: builder.mutation({
      invalidatesTags: ["itr-application"],
      query: ({ body, id }: updateAssignee) => ({
        url: `/itr-application/assign-to`,
        params: { id },
        method: "POST",
        body,
      }),
    }),
    // GET STATUS COUNT
    getITRStatusWiseCount: builder.query({
      providesTags: ["itr-application"],
      query: () => ({
        url: "/itr-application/get-allstatuscounts",
        method: "GET",
      }),
    }),

    // GET REPORT
    getItrZip: builder.mutation({
      query: (srn) => ({
        url: `/itr-application/zip`,
        params: { srn },
        method: "GET",
      }),
    }),

    // GET STATUS WISE APPLICATIONS

    //PENDING  REQUEST
    getItrPendingApplications: builder.query({
      providesTags: ["itr-application"],
      query: (body: PaginationType) => ({
        url: "/itr-application/get-pending-applications",
        method: "POST",
        body,
      }),
    }),

    //VERIFIED  REQUEST
    getItrVerifiedApplications: builder.query({
      providesTags: ["itr-application"],
      query: (body: PaginationType) => ({
        url: "/itr-application/get-verified-applications",
        method: "POST",
        body,
      }),
    }),
    //REJECTED  REQUEST
    getItrRejectedApplications: builder.query({
      providesTags: ["itr-application"],
      query: (body: PaginationType) => ({
        url: "/itr-application/get-rejected-applications",
        method: "POST",
        body,
      }),
    }),
    //IN RPOGRESS  REQUEST
    getItrInProgressApplications: builder.query({
      providesTags: ["itr-application"],
      query: (body: PaginationType) => ({
        url: "/itr-application/get-inprogress-applications",
        method: "POST",
        body,
      }),
    }),
    //Done REQUEST
    getItrDoneApplications: builder.query({
      providesTags: ["itr-application"],
      query: (body: PaginationType) => ({
        url: "/itr-application/get-done-applications",
        method: "POST",
        body,
      }),
    }),

    //CANCELLED REQUEST
    getItrCancelledApplications: builder.query({
      providesTags: ["itr-application"],
      query: (body: PaginationType) => ({
        url: "/itr-application/get-cancelled-applications",
        method: "POST",
        body,
      }),
    }),

    //Generate REQUEST
    getItrGenerateApplications: builder.query({
      providesTags: ["itr-application"],
      query: (body: PaginationType) => ({
        url: "/itr-application/get-generate-applications",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetITRApplicationQuery,
  useChangeITRStatusMutation,
  useChangeITRApplicationAssigneeMutation,
  useGetITRStatusWiseCountQuery,
  useGetItrZipMutation,
  useExportHistoryITRDataMutation,
  useGetSingleITRApplicationQuery,
  useGetItrCancelledApplicationsQuery,
  useGetItrDoneApplicationsQuery,
  useGetItrGenerateApplicationsQuery,
  useGetItrInProgressApplicationsQuery,
  useGetItrPendingApplicationsQuery,
  useGetItrRejectedApplicationsQuery,
  useGetItrVerifiedApplicationsQuery,
  useGetITRflowDataMutation
} = itrApplicationApi;
