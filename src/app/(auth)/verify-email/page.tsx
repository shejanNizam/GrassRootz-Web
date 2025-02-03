"use client";

import { SuccessSwal } from "@/components/utils/allSwalFire";
import {
  useResendOtpMutation,
  useVerifyForgetOtpMutation,
} from "@/redux/api/authApi";
import { Button, Form, Input, message } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

const VerifyEmail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(180);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [verifyForgetOtp, { isLoading }] = useVerifyForgetOtpMutation();
  const [resendOtp, { isLoading: resendLoading }] = useResendOtpMutation();

  // Handle OTP Input Change
  const onChangeOtp = (index: number, value: string) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 3) inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle Backspace for OTP Navigation
  const onKeyDownOtp = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle OTP Verification
  const onFinish = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length < 4) {
      message.error("Please enter the complete 4-digit OTP.");
      return;
    }

    try {
      const response = await verifyForgetOtp({
        email,
        otp: enteredOtp,
      }).unwrap();

      if (response.success) {
        SuccessSwal({
          title: "OTP Verified!",
          text: "Redirecting to reset password.",
        });

        sessionStorage.setItem("reset_token", response?.data?.accesstoken);
        router.push(`/reset-password`);
      } else {
        message.error(response.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("OTP Verification Error:", error);
      message.error("Something went wrong. Please try again.");
    }
  };

  // Handle Resend OTP
  const handleResendOtp = async () => {
    if (resendDisabled) return;

    try {
      await resendOtp(email).unwrap();
      message.success("A new OTP has been sent to your email.");

      setResendDisabled(true);
      setResendTimer(180);

      const interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            setResendDisabled(false);
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      console.error(
        "Resend OTP Error:",
        (error as { message: string })?.message
      );

      message.error(
        (error as { data: { message: string } })?.data?.message ||
          "Failed to resend OTP. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center p-4">
      <div className="bg-gray-950 border border-primary shadow-lg rounded-lg w-full max-w-md p-6 relative">
        <h2 className="text-primary text-2xl font-semibold mt-4 border-b-2 border-b-gray-100">
          Verify Your Email
        </h2>
        <p className="text-center text-white mt-2">
          Please enter the 4-digit OTP sent to your email.
        </p>

        <Form layout="vertical" onFinish={onFinish} className="space-y-6">
          <div className="flex justify-between space-x-4">
            {otp.map((digit, index) => (
              <Form.Item key={index} className="mb-0">
                <Input
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => onChangeOtp(index, e.target.value)}
                  onKeyDown={(e) => onKeyDownOtp(index, e)}
                  ref={(el) => {
                    inputRefs.current[index] = el as HTMLInputElement | null;
                  }}
                  className="text-center w-16 h-16 text-2xl border-2 border-primary rounded-2xl"
                />
              </Form.Item>
            ))}
          </div>

          {/* Resend OTP Section with Flexbox */}
          <div className="flex justify-between items-center">
            <p className="text-white text-sm">Didn’t receive the OTP?</p>
            <Button
              type="link"
              onClick={handleResendOtp}
              disabled={resendDisabled || resendLoading}
            >
              {resendDisabled ? (
                <span className="text-red-700">
                  Resend OTP in {resendTimer}s{" "}
                </span>
              ) : (
                "Resend OTP"
              )}
            </Button>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isLoading}
              className="w-full"
            >
              Verify
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default VerifyEmail;
