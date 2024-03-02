import { PaginationType } from "src/models/common/PaginationType.model";
import apiSlice from "./ApiSlice";
export const rolesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET REQUEST
    addRoles: builder.mutation({
      invalidatesTags: ["admin-roles"],
      query: (body) => ({
        url: "/admin-roles/add",
        method: "POST",
        body,
      }),
    }),
    // GET REQUEST
    getRolesList: builder.query({
      providesTags: ["admin-roles"],
      query: (body: PaginationType) => ({
        url: "/admin-roles/list/pagination",
        method: "POST",
        body,
      }),
    }),
    // GET REQUEST
    getRolesById: builder.query({
      providesTags: ["admin-roles"],
      query: (id: string) => ({
        url: `admin-roles/view`,
        params : {id},
        method: "GET",
      }),
    }),
    //update role
    updateRoles: builder.mutation({
      invalidatesTags: ["admin-roles"],
      query: ({ body, id }) => ({
        url: `admin-roles/update`,
        params : {id},
        method: "PUT",
        body,
      }),
    }),
    getRolesListWithoutPagination: builder.query({
      providesTags: ["access-modules"],
      query: () => ({
        url: "/admin-roles/get-role-name",
        method: "GET",
      }),
    }),
  }),
});
export const {
  useAddRolesMutation,
  useGetRolesListQuery,
  useGetRolesByIdQuery,
  useUpdateRolesMutation,
  useGetRolesListWithoutPaginationQuery
} = rolesApi;