import { PaginationType } from "src/models/common/PaginationType.model";
import { updateAssignee, UpdateMSME } from "src/models/MSME.model";
import apiSlice from "./ApiSlice";

export const msmeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // POST REQUEST
    getMsme: builder.query({
      providesTags: ["msme-application"],
      query: (body: PaginationType) => ({
        url: "/msme-application/list/pagination",
        method: "POST",
        body,
      }),
    }),

    // GET SINGLE
    getSingleMsme: builder.query({
      providesTags: ["msme-application"],
      query: (msmeId) => ({
        url: `/msme-application/admin/view`,
        params : {id :msmeId},
        method: "GET",
      }),
    }),

    //GET FLOW Data
    getMsmeFlowData: builder.mutation({
      query: (id) => ({
        url: `/msme-application/get-status-history`,
        params : {id :id},
        method: "PUT",
      }),
    }),

  // Change status
  changeMSMEStatus: builder.mutation({
    invalidatesTags: ["msme-application" , "pending-applications"],
    query: ({ body, id }: UpdateMSME) => ({
      url: `/msme-application/update-status`,
      params : {id},
      method: "PUT",
      body,
    }),
  }),

   // GET REPORT
   getMsmeZip: builder.mutation({
    query: (srn) => ({
      url: `/msme-application/zip`,
      params : {srn},
      method: "GET",
    }),
  }),  

  
   //assignee
   changeMSMEApplicationAssignee: builder.mutation({
    invalidatesTags: ["msme-application"],
    query: ({ body, id }: updateAssignee) => ({
      url: `/msme-application/assign-to`,
      params :{id},
      method: "POST",
      body,
    }),
  }),

    // GET STATUS COUNT
    getMSMEStatusWiseCount: builder.query({
      providesTags: ["msme-application"],
      query: () => ({
        url: "/msme-application/get-allstatuscounts",
        method: "GET",
      }),
    }),

    // Export Data
    exportHistoryMSMEData: builder.mutation({
      query: (body: PaginationType) => ({
        url: "/msme-application/list/pagination",
        method: "POST",
        body,
      }),
    }),


    // Pending Tab 
    getMSMEPendingApplications :builder.query({
      providesTags :["msme-application"],
      query: (body :PaginationType)=>({
        url :"/msme-application/get-pending-applications",
        method :"POST",
        body,
      })
    }),
    // In Progress Tab 
    getMSMEInProgressApplications :builder.query({
      providesTags :["msme-application"],
      query :(body:PaginationType)=>({
        url :"/msme-application/get-inprogress-applications",
        method :"POST",
        body,

      })
    }),
    // In MSME Reject Tab 
    getMSMERejectApplications :builder.query({
      providesTags :["msme-application"],
      query:(body:PaginationType)=>({
        url : "/msme-application/get-rejected-applications",
        method :"POST",
        body,
      })
    }),
    // In Verify Tab 
    getMSMEVerifyApplications :builder.query({
      providesTags : ["msme-application"],
      query :(body:PaginationType)=>({
        url :"/msme-application/get-verified-applications",
        method :"POST",
        body
      })
    }),
    // In Generate Tab 
    getMSMEGenerateApplications : builder.query({
      providesTags :["msme-application"],
      query :(body :PaginationType)=>({
        url :"/msme-application/get-generate-applications",
        method :"POST",
        body
      })
    }),
    // In Done Tab 
    getMSMEDoneApplications : builder.query({
      providesTags : ["msme-application"],
      query :(body :PaginationType)=>({
        url:"/msme-application/get-done-applications/",
        method :"POST",
        body,
      })
    }),
    // In Cancelled Tab 
    getMSMECancelledApplications :builder.query({
      providesTags :["msme-application"],
      query:(body :PaginationType) =>({
        url :"/msme-application/get-cancelled-applications",
        method :"POST",
        body,
      })
    })


  }),
});

export const {
  useGetMsmeQuery,
  useGetSingleMsmeQuery,
  useChangeMSMEStatusMutation,
  useGetMsmeZipMutation,
  useGetMSMECancelledApplicationsQuery,
  useGetMSMEDoneApplicationsQuery,
  useGetMSMEGenerateApplicationsQuery,
  useGetMSMEInProgressApplicationsQuery,
  useGetMSMEPendingApplicationsQuery,
  useGetMSMERejectApplicationsQuery,
  useGetMSMEVerifyApplicationsQuery,
  useExportHistoryMSMEDataMutation,
  useChangeMSMEApplicationAssigneeMutation,
  useGetMSMEStatusWiseCountQuery,
  useGetMsmeFlowDataMutation
} = msmeApi;
