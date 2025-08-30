import baseApi from "@/redux/api/baseApi";

export const bannerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBannerData: builder.query({
      query: () => ({
        url: "/banner",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetBannerDataQuery } = bannerApi;
