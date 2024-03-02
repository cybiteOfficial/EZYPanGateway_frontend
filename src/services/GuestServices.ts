import { PaginationType } from "src/models/common/PaginationType.model";
import apiSlice from "./ApiSlice";

export const guestApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // POST REQUEST
    getGuest: builder.query({
      providesTags: ["guest"],
      query: (body: PaginationType) => ({
        url: "/guest/list/pagination",
        method: "POST",
        body,
      }),
    }),

    // GET SINGLE
    getSingleGuest: builder.query({
      providesTags: ["guest"],
      query: (guestId) => ({
        url: `/guest/admin/view`,
        params : {id : guestId},
        method: "GET",
      }),
    }),

    // CHANGE STATUS
    changeGuestStatus: builder.mutation({
      invalidatesTags: ["guest"],
      query: ({
        body,
        guestId,
      }: {
        body: {
          requestedStatus: "BLOCKED" | "UN_BLOCK";
        };
        guestId: string;
      }) => ({
        url: `/guest/block-user`,
        params : {id : guestId},
        method: "PUT",
        body,
      }),
    }),

    // Export Data
    exportGuestData: builder.mutation({
      query: (body: PaginationType) => ({
        url: "/guest",
        params: {
          _page: body.page,
          _limit: body.limit,
          q: body.searchValue,
        },
        method: "GET",
        // body
      }),
    }),
    // GetAll
    getAllGuest :builder.query({
      providesTags :["guest"],
      query :(searchValue)=>({
        params:{
          search:searchValue
        },
        url :"/guest/get-all",
        method:"GET",
      })
    })
  }),
});

export const {
  useGetAllGuestQuery,
  useGetGuestQuery,
  useExportGuestDataMutation,
  useGetSingleGuestQuery,
  useChangeGuestStatusMutation,
} = guestApi;
