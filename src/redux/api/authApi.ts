import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    profileData: builder.query({
      query: () => ({
        url: "user/my-profile", // ok
        method: "GET",
      }),
    }),

    signup: builder.mutation({
      query: (userData) => ({
        url: "/user/register", // ok
        method: "POST",
        body: userData,
      }),
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: "/user/login", // ok
        method: "POST",
        body: credentials,
      }),
    }),

    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "/user/forget-password", // ok
        method: "POST",
        body,
      }),
    }),

    verifyForgetOtp: builder.mutation({
      query: ({ email, otp }) => ({
        url: `/user/verify-forget-otp?email=${encodeURIComponent(email)}`, // ok
        method: "POST",
        body: { otp },
      }),
    }),

    resetPassword: builder.mutation({
      query: ({ password, token }) => {
        return {
          url: "/user/reset-password",
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: { password },
        };
      },
    }),

    verifyEmail: builder.mutation({
      query: (email) => ({
        url: `/user/verify-email?email=${encodeURIComponent(email)}`,
        method: "POST",
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useProfileDataQuery,
  useSignupMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useVerifyForgetOtpMutation,
  useResetPasswordMutation,
  useVerifyEmailMutation,
  useLogoutMutation,
} = authApi;
