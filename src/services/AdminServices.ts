import { UpdateAdmin } from "src/models/Admin.model";
import { PaginationType } from "src/models/common/PaginationType.model";
import apiSlice from "./ApiSlice";

export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET REQUEST
    getAdminList: builder.query({
      providesTags: ["admin"],
      query: (body: PaginationType) => ({
        url: "/admin/pagination",
        method: "POST",
        body,
      }),
    }),

    // GET REQUEST
    getAdminById: builder.query({
      providesTags: ["admin"],
      query: (id: string) => ({
        url: `/admin/view`,
        params: { id },
        method: "GET",
      }),
    }),

    // UPDATE
    updateAdmin: builder.mutation({
      invalidatesTags: ["admin"],
      query: ({ body, id }: UpdateAdmin) => ({
        url: `/admin/update`,
        params: { id },
        method: "PUT",
        body,
      }),
    }),

    //Add
    addAdmin: builder.mutation({
      invalidatesTags: ["admin"],
      query: (body) => ({
        url: "/admin/add",
        method: "POST",
        body,
      }),
    }),
    // GET REPORT
    getReports: builder.query({
      providesTags: ["admin"],
      query: (body: PaginationType) => ({
        url: "/admin/report-admin",
        method: "POST",
        body,
      }),
    }),

    // Export REPORT
    exportReports: builder.mutation({
      query: (body: PaginationType) => ({
        url: "/admin/report-admin",
        method: "POST",
        body,
      }),
    }),

    // GET REPORT
    getDistributorReports: builder.query({
      providesTags: ["distributor"],
      query: (body: PaginationType) => ({
        url: "/admin/report-distributor",
        method: "POST",
        body,
      }),
    }),

    // Export REPORT
    exportDistributorReports: builder.mutation({
      query: (body: PaginationType) => ({
        url: "/admin/report-distributor",
        method: "POST",
        body,
      }),
    }),

    // GET REPORT
    getRetailerReports: builder.query({
      providesTags: ["retailer"],
      query: (body: PaginationType) => ({
        url: "/admin/report-retailer",
        method: "POST",
        body,
      }),
    }),

    // Export REPORT
    exportRetailerReports: builder.mutation({
      query: (body: PaginationType) => ({
        url: "/admin/report-retailer",
        method: "POST",
        body,
      }),
    }),

    // **** DELETE BY ID
    DeleteAdminById: builder.mutation({
      invalidatesTags: ["admin"],
      query: (id: string) => ({
        url: `/admin/delete`,
        params: { id },
        method: "DELETE",
      }),
    }),

    // Delete Zip File
    deleteZipFile: builder.mutation({
      query: (body: { folderUrl: string }) => ({
        url: "/admin/delete-zip",
        method: "POST",
        body,
      }),
    }),
    // UserAccess Query
    getuserAccess: builder.mutation({      
      query: (token:string) => {
        return({
          url: "/admin/get-role-access-list",
          method: "GET",  
          headers:{"x-access-token":token}
        })
      },
    }),
 
  }),

  
});

export const {
  useGetAdminListQuery,
  useGetReportsQuery,
  useGetRetailerReportsQuery,
  useExportRetailerReportsMutation,
  useGetDistributorReportsQuery,
  useDeleteAdminByIdMutation,
  useExportDistributorReportsMutation,
  useExportReportsMutation,
  useAddAdminMutation,
  useGetAdminByIdQuery,
  useUpdateAdminMutation,
  useDeleteZipFileMutation,
  useGetuserAccessMutation
} = adminApi;
