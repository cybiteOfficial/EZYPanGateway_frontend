import { UpdateHeaderContactInformation } from "src/models/HeaderContactInformation.model";
import apiSlice from "./ApiSlice";

export const contactInfoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET REQUEST
    getContactInformationList: builder.query({
      providesTags: ["contact-info"],
      query: () => ({
        url: "/contact-info/admin/get-all",
        method: "GET",
      }),
    }),

    // GET REQUEST
    getContactInformationById: builder.query({
      providesTags: ["contact-info"],
      query: (id: string) => ({
        url: `/contact-info/view/admin`,
        params : {id},
        method: "GET",
      }),
    }),

    // ADD
    addContactInformation: builder.mutation({
      invalidatesTags: ["contact-info"],
      query: (body) => ({
        url: "/contact-info/add",
        method: "POST",
        body,
      }),
    }),

    // UPDATE
    updateContactInformation: builder.mutation({
      invalidatesTags: ["video"],
      query: ({ body, id }: UpdateHeaderContactInformation) => ({
        url: `/contact-info/update`,
        params : {id},
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useGetContactInformationListQuery,
  useAddContactInformationMutation,
  useGetContactInformationByIdQuery,
  useUpdateContactInformationMutation,
} = contactInfoApi;
