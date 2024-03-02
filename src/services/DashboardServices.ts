import apiSlice from "./ApiSlice";

export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET REQUEST
    getDashboardData: builder.query({
      providesTags: ["dashboard"],
      query: () => ({
        url: "/dashboard/application-count",
        method: "GET",
      }),
    }),
    getTotalUserCount: builder.query({
      providesTags: ["dashboard"],
      query: () => ({
        url: "/dashboard/user-count",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetDashboardDataQuery , useGetTotalUserCountQuery } = dashboardApi;
