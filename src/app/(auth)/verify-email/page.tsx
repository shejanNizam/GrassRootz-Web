"use client";

import { SuccessSwal } from "@/components/utils/allSwalFire";
import { useVerifyForgetOtpMutation } from "@/redux/api/authApi";
import { Button, Form, Input, message } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

const VerifyEmail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [verifyForgetOtp, { isLoading }] = useVerifyForgetOtpMutation();

  const onChangeOtp = (index: number, value: string) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 3) inputRefs.current[index + 1]?.focus();
    }
  };

  const onKeyDownOtp = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

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

        // Pass the token to reset-password page
        router.push(`/reset-password?token=${response.data.accesstoken}`);
      } else {
        message.error(response.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong. Please try again.");
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
