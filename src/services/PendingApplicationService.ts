import apiSlice from "./ApiSlice";

export const pendingApplicationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // POST REQUEST
    getPendingApplicattionCount: builder.query({
      providesTags: ["pending-applications"],
      query: () => ({
        url: "/pending-app/get-all",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetPendingApplicattionCountQuery } = pendingApplicationApi;
