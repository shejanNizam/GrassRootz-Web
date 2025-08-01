import { baseApi } from "../api/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserData: builder.query({
      query: () => ({
        url: "/auth/my-profile",
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    // Example: Update user data
    updateUserData: builder.mutation({
      query: (data) => ({
        url: "/auth/profile-update",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useGetUserDataQuery, useUpdateUserDataMutation } = userApi;
