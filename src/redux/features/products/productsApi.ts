import baseApi from "@/redux/api/baseApi";

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // getAllProducts: builder.query({
    //   query: ({
    //     page = 1,
    //     limit = 10,
    //     color,
    //     name,
    //     brandName,
    //     stockStatus,
    //     lowPrice,
    //     highPrice,
    //     latest,
    //     popular,
    //   }) => ({
    //     url: "/product",
    //     method: "GET",
    //     params: {
    //       page,
    //       limit,
    //       color,
    //       name,
    //       brandName,
    //       stockStatus,
    //       lowPrice,
    //       highPrice,
    //       latest,
    //       popular,
    //     },
    //   }),
    // }),

    getAllProducts: builder.query({
      query: (args: { name: string; value: string }[]) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: { name: string; value: string | number }) => {
            params.append(item.name, item.value.toString());
          });
        }
        return {
          url: `/product`,
          method: "GET",
          params,
        };
      },
      providesTags: ["product"],
    }),

    // Example: Update user data
    // updateUserData: builder.mutation({
    //   query: (data) => ({
    //     url: "/user/update",
    //     method: "PATCH",
    //     body: data,
    //   }),
    // }),
  }),
});

export const { useGetAllProductsQuery } = productsApi;
