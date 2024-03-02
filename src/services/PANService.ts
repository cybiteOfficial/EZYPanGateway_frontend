import { PaginationType } from "src/models/common/PaginationType.model";
import { updateAssignee, UpdatePAN } from "src/models/PAN.model";
import apiSlice from "./ApiSlice";

export const panApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // POST REQUEST
    getPan: builder.query({
      providesTags: ["pan-app"],
      query: (body: PaginationType) => ({
        url: "/pan-app/list/pagination",
        method: "POST",
        body,
      }),
    }),

    // GET REPORT
    getPanZip: builder.mutation({
      query: (srn) => ({
        url: `/pan-app/zip`,
        params: { srn },
        method: "GET",
      }),
    }),

    // Export Data
    exportHistoryPanData: builder.mutation({
      query: (body: PaginationType) => ({
        url: "/pan-app/list/pagination",
        method: "POST",
        body,
      }),
    }),

    // GET SINGLE
    getSinglePan: builder.query({
      providesTags: ["pan-app"],
      query: (panId) => ({
        url: `/pan-app/admin/view`,
        params: { id: panId },
        method: "GET",
      }),
    }),
   
     // GET FLOW
     getPanApplicationFlow: builder.mutation({
      query: (id) => ({
        url: `/pan-app/get-status-history`,
        params: { id: id },
        method: "PUT",
      }),
    }),  

    // Change status
    changePANStatus: builder.mutation({
      invalidatesTags: ["pan-app", "pending-applications"],
      query: ({ body, id }: UpdatePAN) => ({
        url: `/pan-app/update-status`,
        params: { id },
        method: "PUT",
        body,
      }),
    }),

    //assignee
    changePANApplicationAssignee: builder.mutation({
      invalidatesTags: ["pan-app"],
      query: ({ body, id }: updateAssignee) => ({
        url: `/pan-app/assign-to`,
        params: { id },
        method: "POST",
        body,
      }),
    }),

    // GET STATUS COUNT
    getPANStatusWiseCount: builder.query({
      providesTags: ["pan-app"],
      query: () => ({
        url: "/pan-app/get-allstatuscounts",
        method: "GET",
      }),
    }),

    // GET STATUS WISE APPLICATIONS

    //PENDING  REQUEST
    getPanPendingApplications: builder.query({
      providesTags: ["pan-app"],
      query: (body: PaginationType) => ({
        url: "/pan-app/get-pending-applications",
        method: "POST",
        body,
      }),
    }),

    //VERIFIED  REQUEST
    getPanVerifiedApplications: builder.query({
      providesTags: ["pan-app"],
      query: (body: PaginationType) => ({
        url: "/pan-app/get-verified-applications",
        method: "POST",
        body,
      }),
    }),
    //REJECTED  REQUEST
    getPanRejectedApplications: builder.query({
      providesTags: ["pan-app"],
      query: (body: PaginationType) => ({
        url: "/pan-app/get-rejected-applications",
        method: "POST",
        body,
      }),
    }),
    //IN RPOGRESS  REQUEST
    getPanInProgressApplications: builder.query({
      providesTags: ["pan-app"],
      query: (body: PaginationType) => ({
        url: "/pan-app/get-inprogress-applications",
        method: "POST",
        body,
      }),
    }),
    //Done REQUEST
    getPanDoneApplications: builder.query({
      providesTags: ["pan-app"],
      query: (body: PaginationType) => ({
        url: "/pan-app/get-done-applications",
        method: "POST",
        body,
      }),
    }),

    //CANCELLED REQUEST
    getPanCancelledApplications: builder.query({
      providesTags: ["pan-app"],
      query: (body: PaginationType) => ({
        url: "/pan-app/get-cancelled-applications",
        method: "POST",
        body,
      }),
    }),

    //Generate REQUEST
    getPanGenerateApplications: builder.query({
      providesTags: ["pan-app"],
      query: (body: PaginationType) => ({
        url: "/pan-app/get-generate-applications",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetPanQuery,
  useGetSinglePanQuery,
  useChangePANApplicationAssigneeMutation,
  useGetPanPendingApplicationsQuery,
  useChangePANStatusMutation,
  useExportHistoryPanDataMutation,
  useGetPanZipMutation,
  useGetPANStatusWiseCountQuery,
  useGetPanCancelledApplicationsQuery,
  useGetPanDoneApplicationsQuery,
  useGetPanGenerateApplicationsQuery,
  useGetPanInProgressApplicationsQuery,
  useGetPanRejectedApplicationsQuery,
  useGetPanVerifiedApplicationsQuery,
  useGetPanApplicationFlowMutation
} = panApi;
