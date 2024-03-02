import { PaginationType } from "src/models/common/PaginationType.model";
import apiSlice from "./ApiSlice";

export const gumastaConfigApi: any = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // POST REQUEST For STATE LIST
    getStatePaginationList: builder.query({
      providesTags: ["location"],
      query: (body: PaginationType) => ({
        url: "/gumasta-state-config/list/pagination",
        method: "POST",
        body,
      }),
    }),

    // ADD STATE
    addState: builder.mutation({
      invalidatesTags: ["location"],
      query: (body) => ({
        url: "/gumasta-state-config/add",
        method: "POST",
        body,
      }),
    }),
    //View State
    getSingleViewState: builder.query({
      providesTags: ["location"],
      query: (id: string) => ({
        url: `/gumasta-state-config/admin/view`,
        params: { id },
        method: "GET",
      }),
    }),

    // **** DELETE BY ID
    DeleteStateById: builder.mutation({
      invalidatesTags: ["location"],
      query: (id: string) => ({
        url: `/gumasta-state-config/delete`,
        params: { id },
        method: "DELETE",
      }),
    }),

    

    // UPDATE STATE
    updateState: builder.mutation({
      invalidatesTags: ["location"],
      query: ({ body, id }: any) => ({
        url: `/gumasta-state-config/update`,
        params: { id },
        method: "PUT",
        body,
      }),
    }),

    //  DISTRICT
    getDistrictPaginationList: builder.query({
      providesTags: ["location"],
      query: (body: PaginationType) => ({
        url: "/gumasta-district-config/admin/list/pagination",
        method: "POST",
        body,
      }),
    }),

    getAllStateList: builder.query({
      providesTags: ["location"],
      query: () => ({
        url: "/gumasta-state-config/admin/get-all",
        method: "GET",
      }),
    }),

    // ADD DISTRICT
    addDistrict: builder.mutation({
      invalidatesTags: ["location"],
      query: (body) => ({
        url: "/gumasta-district-config/add",
        method: "POST",
        body,
      }),
    }),
    // **** DELETE BY ID DISTRICT
    DeleteDistrictById: builder.mutation({
      invalidatesTags: ["location"],
      query: (id: string) => ({
        url: `/gumasta-district-config/delete`,
        params: { id },
        method: "DELETE",
      }),
    }),

    // UPDATE DISTRICT
    updateDistrict: builder.mutation({
        invalidatesTags: ["location"],
        query: ({ body, id }: any) => ({
          url: `/gumasta-district-config/update`,
          params: { id },
          method: "PUT",
          body,
        }),
      }),
      //View district
    getSingleViewDistrict: builder.query({
      providesTags: ["location"],
      query: (id: string) => ({
        url: `/gumasta-district-config/admin/view`,
        params: { id },
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetStatePaginationListQuery,
  useAddStateMutation,
  useGetAllStateListQuery,
  useUpdateStateMutation,
  useDeleteStateByIdMutation,
  useGetDistrictPaginationListQuery,
  useAddDistrictMutation,
  useDeleteDistrictByIdMutation,
  useGetSingleViewStateQuery,
  useGetSingleViewDistrictQuery,
  useUpdateDistrictMutation
} = gumastaConfigApi;
