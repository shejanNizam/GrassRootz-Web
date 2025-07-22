import baseApi from "@/redux/api/baseApi";

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<
      any,
      {
        search?: string;
        categories?: string[];
        popular?: number;
        page?: number;
        limit?: number;
      }
    >({
      query: (filters = {}) => {
        const params = new URLSearchParams();

        if (filters.search && filters.search.trim() !== "") {
          params.append("name", filters.search.trim());
        }

        if (
          filters.categories &&
          filters.categories.length > 0 &&
          !filters.categories.includes("All")
        ) {
          filters.categories.forEach((cat) => {
            params.append("category", cat);
          });
        }

        if (typeof filters.popular === "number") {
          params.append("popular", filters.popular.toString());
        }

        if (filters.page) {
          params.append("page", filters.page.toString());
        }

        if (filters.limit) {
          params.append("limit", filters.limit.toString());
        }

        return {
          url: "/product",
          method: "GET",
          params,
        };
      },
      providesTags: ["product"],
    }),

    // Get all categories
    getCategories: builder.query<
      { data: { _id: string; name: string }[] },
      void
    >({
      query: () => ({
        url: "/category",
        method: "GET",
      }),
      providesTags: ["category"],
    }),

    // Get product details by productId query param
    getProductDetails: builder.query<any, { productId: string | "" }>({
      query: ({ productId }) => ({
        url: `/product/details`,
        method: "GET",
        params: { productId },
      }),
      providesTags: (result, error, arg) => [
        { type: "product", id: arg.productId },
      ],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetCategoriesQuery,
  useGetProductDetailsQuery,
} = productsApi;
