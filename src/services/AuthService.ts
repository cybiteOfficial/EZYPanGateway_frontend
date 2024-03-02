import apiSlice from "./ApiSlice";
import { v4 } from "uuid";

const deviceId = localStorage.getItem("deviceId") || v4();

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Login
    login: builder.mutation({
      query: (body: { userName: string; password: string }) => {
        localStorage.setItem("deviceId", deviceId);
        return {
          url: "/admin/login",
          headers: {
            deviceId: deviceId,
          },
          method: "POST",
          body,
        };
      },
    }),

    // Login
    getAccessToken: builder.mutation({
      query: (body) => {
        return {
          url: "/admin/refresh-token",
          headers: {
            deviceId: deviceId,
          },
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useLoginMutation, useGetAccessTokenMutation } = authApi;
