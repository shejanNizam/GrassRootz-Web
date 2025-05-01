import { baseApi } from "../api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "/auth/forget-password",
        method: "POST",
        body,
      }),
    }),

    verifyForgetOtp: builder.mutation({
      query: ({ email, otp }) => ({
        url: `/auth/verify-forget-otp?email=${encodeURIComponent(email)}`,
        method: "POST",
        body: { otp },
      }),
    }),

    resetPassword: builder.mutation({
      query: ({ password }) => {
        return {
          url: "/auth/reset-password",
          method: "POST",
          body: { password },
        };
      },
    }),

    verifyEmail: builder.mutation({
      query: (email) => ({
        url: `/auth/verify-email?email=${encodeURIComponent(email)}`,
        method: "POST",
      }),
    }),

    resendOtp: builder.mutation({
      query: (email) => ({
        url: `/auth/resend?email=${encodeURIComponent(email)}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useVerifyForgetOtpMutation,
  useResetPasswordMutation,
  useVerifyEmailMutation,
  useResendOtpMutation,
} = authApi;
