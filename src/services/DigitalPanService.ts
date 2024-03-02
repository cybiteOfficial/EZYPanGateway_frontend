import { PaginationType } from "src/models/common/PaginationType.model";
import apiSlice from "./ApiSlice";

export const digitalPanApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //PENDING  REQUEST
    getDigitalPanPendingApplications: builder.query({
      providesTags: ["Digitalpan-app"],
      query: (body: PaginationType) => ({
        url: "/digital-pan/admin/list",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetDigitalPanPendingApplicationsQuery,
} = digitalPanApi;
