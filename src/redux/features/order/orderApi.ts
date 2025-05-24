import baseApi from "@/redux/api/baseApi";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all categories
    getAllOrderHistory: builder.query({
      query: () => ({
        url: "/order/my-list",
        method: "GET",
      }),
      providesTags: ["order"],
    }),
  }),
});

export const { useGetAllOrderHistoryQuery } = orderApi;
