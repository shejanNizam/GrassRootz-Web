import { baseApi } from "./baseApi";

// Define user-related endpoints
export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserData: builder.query({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "GET",
      }),
    }),

    updateUserData: builder.mutation({
      query: (updatedData) => ({
        url: `/users/update`,
        method: "PATCH",
        body: updatedData,
      }),
    }),
  }),
});

export const { useGetUserDataQuery, useUpdateUserDataMutation } = userApi;
