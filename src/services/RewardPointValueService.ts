import { PaginationType } from "src/models/common/PaginationType.model";
import apiSlice from "./ApiSlice";

export const rewardPointValueApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Pagination
    getRewardPointValue: builder.query({
      providesTags: ["reward-point-value"],
      query: (body: PaginationType) => ({
        url: "/reward-point/list/pagination",
        method: "POST",
        body,
      }),
    }),
    // Get All
    getAllRewardPointValue: builder.query({
      providesTags: ["reward-point-value"],
      query: () => ({
        url: "/reward-point/get-all",
        method: "GET",
      }),
    }),

    // ADD
    addRewardPointValue: builder.mutation({
      invalidatesTags: ["reward-point-value"],
      query: (body) => ({
        url: "/reward-point-value/add",
        method: "POST",
        body,
      }),
    }),
    //Update
    updateRewardPointValue: builder.mutation({
      invalidatesTags: ["reward-point-value"],
      query: ({
        body,
        id,
      }: {
        body: {
          perRupeeRewardValue: number;
        };
        id: string;
      }) => ({
        url: `reward-point/update`,
        params : {id},
        method: "PUT",
        body
      }),
    }),
    // GET REQUEST
    getRewardPointValueById: builder.query({
      providesTags: ["reward-point-value"],
      query: (id: string) => ({
        url: `/reward-point-value`,
        params : {id},
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetRewardPointValueQuery,
  useAddRewardPointValueMutation,
  useGetRewardPointValueByIdQuery,
  useUpdateRewardPointValueMutation,
  useGetAllRewardPointValueQuery
} = rewardPointValueApi;
