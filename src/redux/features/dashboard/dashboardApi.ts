import baseApi from "@/redux/api/baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserData: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),

    // Example: Update user data
    updateUserData: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {} = dashboardApi;
