import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (userData) => ({
        url: "/user/register",
        method: "POST",
        body: userData,
      }),
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: "/user/login",
        method: "POST",
        body: credentials,
      }),
    }),

    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "/user/forget-password",
        method: "POST",
        body,
      }),
    }),

    verifyForgetOtp: builder.mutation({
      query: ({ email, otp }) => ({
        url: `/user/verify-forget-otp?email=${email}`,
        method: "POST",
        body: { otp },
      }),
    }),

    resetPassword: builder.mutation({
      query: ({ token, password }) => ({
        url: "/user/reset-password",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { password },
      }),
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
  useSignupMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useVerifyForgetOtpMutation,
  useResetPasswordMutation,
  useVerifyEmailMutation,
  useLogoutMutation,
} = authApi;
