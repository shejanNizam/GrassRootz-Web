import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    // credentials: "include",
    // prepareHeaders: (headers) => {
    //   // Add any custom headers here
    //   headers.set("Content-Type", "application/json");
    //   return headers;
    // },
  }),

  endpoints: () => ({}),
});

export default baseApi;
