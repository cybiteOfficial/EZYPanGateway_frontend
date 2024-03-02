import apiSlice from "./ApiSlice";

export const accessModulesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET REQUEST
    getAllAccessModuleList: builder.query({
      providesTags: ["access-modules"],
      query: () => ({
        url: "/access-modules/get-access-modules",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllAccessModuleListQuery } = accessModulesApi;
