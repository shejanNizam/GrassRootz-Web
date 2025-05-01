// src/redux/api/userApi.ts
import { baseApi } from "../api/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserData: builder.query({
      query: () => ({
        url: "/auth/my-profile",
        method: "GET",
      }),
    }),

    // Example: Update user data
    updateUserData: builder.mutation({
      query: (data) => ({
        url: "/user/update",
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const { useGetUserDataQuery, useUpdateUserDataMutation } = userApi;
