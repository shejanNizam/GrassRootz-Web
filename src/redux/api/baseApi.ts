import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    // credentials: "include",

    //   prepareHeaders: (headers) => {
    //     const token = localStorage.getItem("user_token");
    //     if (token) {
    //       headers.set("Authorization", `Bearer ${token}`);
    //     }
    //     headers.set("Content-Type", "application/json");
    //     return headers;
    //   },
    // }),

    prepareHeaders: (headers) => {
      const token = localStorage.getItem("user_token");
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["auth", "user", "product","category"],
  endpoints: () => ({}),
});

export default baseApi;
