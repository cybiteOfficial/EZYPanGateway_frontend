import { UpdateSubscription } from "src/models/Subscription.model";
import apiSlice from "./ApiSlice";

export const subscriptionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // POST REQUEST
    getSubscription: builder.query({
      providesTags: ["subscription"],
      query: () => ({
        url: "/subscription/admin/get-all",
        method: "GET",
      }),
    }),

    // ADD
    addSubscription: builder.mutation({
      invalidatesTags: ["subscription"],
      query: (body) => ({
        url: "/subscription/add",
        method: "POST",
        body,
      }),
    }),

    // GET REQUEST
    getSubscriptionById: builder.query({
      providesTags: ["subscription"],
      query: (id: string) => ({
        url: `/subscription/view/admin`,
        params : {id},
        method: "GET",
      }),
    }),

    // UPDATE
    UpdateSubscription: builder.mutation({
      invalidatesTags: ["subscription"],
      query: ({ body, id }: UpdateSubscription) => ({
        url: `/subscription/admin/update`,
        params : {id},
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useGetSubscriptionQuery,
  useAddSubscriptionMutation,
  useGetSubscriptionByIdQuery,
  useUpdateSubscriptionMutation,
} = subscriptionApi;
