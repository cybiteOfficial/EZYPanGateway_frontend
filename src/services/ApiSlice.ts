import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "src/utils/constants/baseUrl";

const tagTypes = [
  "dashboard",
  "distributor",
  "pending-applications",
  "retailer",
  "menu-links",
  "video",
  "banner",
  "price-config",
  "guest",
  "popup-banner",
  "pan-app",
  "gumasta-application",
  "msme-application",
  "contact-info",
  "dsc-application",
  "change-password",
  "terms-and-condition",
  "privacy-policy",
  "refund-policy",
  "download-form",
  "file-upload",
  "static-pages",
  "pan-reward-services",
  "itr-reward-services",
  "gumasta-reward-services",
  "dsc-reward-services",
  "msme-reward-services",
  "reward-point",
  "refund-balance",
  "location"
];

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,

    prepareHeaders: (headers, { getState, endpoint }) => {
      const token = (getState() as any)?.auth?.accessToken;
      if (token && endpoint !== "getuserAccess") {
        headers.set("x-access-token", token);
      }
      return headers;
    },
  }),
  tagTypes: tagTypes,
  endpoints: () => ({}),
});

export default apiSlice;
