import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
    // prepareHeaders: (headers) => {
    //   headers.set("X-Custom-Header", "foobar");
    //   return headers;
    // },
  }),

  endpoints: () => ({}),
});

export default baseApi;
