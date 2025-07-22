import baseApi from "@/redux/api/baseApi";

export const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // about
    getAbout: builder.query({
      query: () => ({
        url: "/about",
        method: "GET",
      }),
      providesTags: ["settings"],
    }),
    // terms
    getTerms: builder.query({
      query: () => ({
        url: "/terms",
        method: "GET",
      }),
      providesTags: ["settings"],
    }),
    // privacy
    getPrivacy: builder.query({
      query: () => ({
        url: "/privacy",
        method: "GET",
      }),
      providesTags: ["settings"],
    }),
  }),
});

export const { useGetAboutQuery, useGetTermsQuery, useGetPrivacyQuery } =
  settingsApi;
