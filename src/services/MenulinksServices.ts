import { PaginationType } from "src/models/common/PaginationType.model";
import { UpdateMenuLinks } from "src/models/MenuLinks.model";
import apiSlice from "./ApiSlice";

export const menuLinksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // POST REQUEST
    getMenuLinks: builder.query({
      providesTags: ["menu-links"],
      query: (body: PaginationType) => ({
        url: "/menu-links/list/pagination",
        method: "POST",
        body,
      }),
    }),

    // GET REQUEST
    getMenuLinksById: builder.query({
      providesTags: ["menu-links"],
      query: (id: string) => ({
        url: `/menu-links/admin/view`,
        params : {id},
        method: "GET",
      }),
    }),

    // ADD
    addMenuLinks: builder.mutation({
      invalidatesTags: ["menu-links"],
      query: (body) => ({
        url: "/menu-links/add",
        method: "POST",
        body,
      }),
    }),
    // **** DELETE BY ID
    DeleteMenuLinkById: builder.mutation({
      invalidatesTags: ["menu-links"],
      query: (id: string) => ({
        url: `/menu-links/delete`,
        params : {id},
        method: "DELETE",
      }),
    }),

    // UPDATE
    updateMenuLinks: builder.mutation({
      invalidatesTags: ["menu-links"],
      query: ({ body, id }: UpdateMenuLinks) => ({
        url: `/menu-links/update`,
        params : {id},
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useGetMenuLinksQuery,
  useDeleteMenuLinkByIdMutation,
  useAddMenuLinksMutation,
  useGetMenuLinksByIdQuery,
  useUpdateMenuLinksMutation,
} = menuLinksApi;
