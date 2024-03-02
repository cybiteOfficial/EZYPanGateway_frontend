import apiSlice from "./ApiSlice";

export const fileUploadApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // POST REQUEST UPDATE
    updateFileUploadImage: builder.mutation({
      invalidatesTags: ["file-upload"],
      query: (body: FormData) => ({
        url: "/file-upload/image-upload",
        method: "POST",
        body,
      }),
    }),

    // UPDATE
    updateFileUploadPdf: builder.mutation({
      invalidatesTags: ["file-upload"],
      query: (body: FormData) => ({
        url: `/file-upload/pdf-upload`,
        method: "POST",
        body,
      }),
    }),
  }),
});
export const {
  useUpdateFileUploadImageMutation,
  useUpdateFileUploadPdfMutation,
} = fileUploadApi;
