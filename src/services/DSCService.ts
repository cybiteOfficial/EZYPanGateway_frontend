import { PaginationType } from "src/models/common/PaginationType.model";
import { updateAssignee, UpdateDSC } from "src/models/DSC.model";
import apiSlice from "./ApiSlice";

export const dscApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // POST REQUEST
    getDsc: builder.query({
      providesTags: ["dsc-application"],
      query: (body: PaginationType) => ({
        url: "/dsc-application/list/pagination",
        method: "POST",
        body,
      }),
    }),

    // GET REPORT
    getDscZip: builder.mutation({
      query: (srn) => ({
        url: `/dsc-application/zip`,
        params: { srn },
        method: "GET",
      }),
    }),

    // GET SINGLE
    getSingleDsc: builder.query({
      providesTags: ["dsc-application"],
      query: (dscId) => ({
        url: `/dsc-application/admin/view`,
        params: { id: dscId },
        method: "GET",
      }),
    }),

    // GET FlowData
    getDscFlowData: builder.mutation({
      query: (dscId) => ({
        url: `/dsc-application/get-status-history`,
        params: { id: dscId },
        method: "PUT",
      }),
    }),

    //assignee
    changeDSCApplicationAssignee: builder.mutation({
      invalidatesTags: ["dsc-application"],
      query: ({ body, id }: updateAssignee) => ({
        url: `/dsc-application/assign-to`,
        params: { id },
        method: "POST",
        body,
      }),
    }),

    // Change status
    changeDSCStatus: builder.mutation({
      invalidatesTags: ["dsc-application", "pending-applications"],
      query: ({ body, id }: UpdateDSC) => ({
        url: `/dsc-application/update-status`,
        params: { id },
        method: "PUT",
        body,
      }),
    }),

    // GET STATUS COUNT
    getDSCStatusWiseCount: builder.query({
      providesTags: ["dsc-application"],
      query: () => ({
        url: "/dsc-application/get-allstatuscounts",
        method: "GET",
      }),
    }),

    // Export Data
    exportHistoryDSCData: builder.mutation({
      query: (body: PaginationType) => ({
        url: "/dsc-application/list/pagination",
        method: "POST",
        body,
      }),
    }),
    // Pending Tab 
    getDSCPendingApplications :builder.query({
      providesTags :["dsc-application"],
      query: (body :PaginationType)=>({
        url :"/dsc-application/get-pending-applications",
        method :"POST",
        body,
      })
    }),
    // In Progress Tab 
    getDSCInProgressApplications :builder.query({
      providesTags :["dsc-application"],
      query :(body:PaginationType)=>({
        url :"/dsc-application/get-inprogress-applications",
        method :"POST",
        body,

      })
    }),
    // In DSC Reject Tab 
    getDSCRejectApplications :builder.query({
      providesTags :["dsc-application"],
      query:(body:PaginationType)=>({
        url : "/dsc-application/get-rejected-applications",
        method :"POST",
        body,
      })
    }),
    // In Verify Tab 
    getDSCVerifyApplications :builder.query({
      providesTags : ["dsc-application"],
      query :(body:PaginationType)=>({
        url :"/dsc-application/get-verified-applications",
        method :"POST",
        body
      })
    }),
    // In Generate Tab 
    getDSCGenerateApplications : builder.query({
      providesTags :["dsc-application"],
      query :(body :PaginationType)=>({
        url :"/dsc-application/get-generate-applications",
        method :"POST",
        body
      })
    }),
    // In Done Tab 
    getDSCDoneApplications : builder.query({
      providesTags : ["dsc-application"],
      query :(body :PaginationType)=>({
        url:"/dsc-application/get-done-applications/",
        method :"POST",
        body,
      })
    }),
    // In Cancelled Tab 
    getDSCCancelledApplications :builder.query({
      providesTags :["dsc-application"],
      query:(body :PaginationType) =>({
        url :"/dsc-application/get-cancelled-applications",
        method :"POST",
        body,
      })
    })
  }),
});

export const {
  useGetDscQuery,
  useGetSingleDscQuery,
  useGetDscZipMutation,
  useExportHistoryDSCDataMutation,
  useChangeDSCStatusMutation,
  useChangeDSCApplicationAssigneeMutation,
  useGetDSCStatusWiseCountQuery,
  useGetDSCInProgressApplicationsQuery,
  useGetDSCCancelledApplicationsQuery,
  useGetDSCDoneApplicationsQuery,
  useGetDSCGenerateApplicationsQuery,
  useGetDSCPendingApplicationsQuery,
  useGetDSCRejectApplicationsQuery,
  useGetDSCVerifyApplicationsQuery,
  useGetDscFlowDataMutation
} = dscApi;
