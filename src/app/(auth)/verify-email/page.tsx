"use client"; // Enables client-side rendering for hooks and interactivity

import { SuccessSwal } from "@/components/utils/allSwalFire";
import { useVerifyEmailMutation } from "@/redux/api/authApi";
import { Button, Form, Input, message } from "antd";
import { useRouter } from "next/navigation"; // For Next.js App Router
import { useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa"; // Importing the back arrow icon

const VerifyEmail = () => {
  const router = useRouter(); // Initialize Next.js router
  const [otp, setOtp] = useState(["", "", "", ""]); // State to hold each OTP digit

  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
  console.log(verifyEmail);

  // Refs for each input to manage focus
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Handle OTP input changes
  const onChangeOtp = (index: number, value: string) => {
    if (/^\d*$/.test(value)) {
      // Ensure only digits are entered
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      // Move focus to next input if value is entered
      if (value && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle key down events for navigation (e.g., Backspace)
  const onKeyDownOtp = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      // Move focus to previous input if Backspace is pressed on empty field
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle form submission
  const onFinish = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length < 4) {
      message.error("Please enter the complete 4-digit OTP.");
      return;
    }

    try {
      // TODO: Replace the mock submission with actual API call
      // Example:
      // const response = await fetch('/api/verify-email', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ otp: enteredOtp }),
      // });

      // Mock response for demonstration
      await new Promise((resolve) => setTimeout(resolve, 2000));
      SuccessSwal({
        title: "Email verified successfully!",
        text: "",
      });

      router.push("/reset-password");
    } catch (error) {
      console.error("Verify Email error:", error);
      message.error("Invalid OTP. Please try again.");
    }
  };

  // Handle Resend OTP functionality
  const handleResend = async () => {
    try {
      // TODO: Replace the mock resend with actual API call
      // Example:
      // const response = await fetch('/api/resend-otp', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });

      // Mock response for demonstration
      await new Promise((resolve) => setTimeout(resolve, 2000));
      SuccessSwal({
        title: "OTP has been resent to your email!",
        text: "",
      });

      setOtp(["", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (error) {
      console.error("Resend OTP error:", error);
      message.error("Failed to resend OTP. Please try again.");
    }
  };

  // Handle back button click
  const handleBack = () => {
    router.back(); // Navigate to the previous page
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center p-4 ">
      {/* Verify Email Container */}
      <div className="bg-gray-950 border border-primary shadow-lg rounded-lg w-full max-w-md p-6 relative">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 text-gray-500 hover:text-gray-300 focus:outline-none z-50"
          aria-label="Go Back"
        >
          <FaArrowLeft size={24} />
        </button>
        {/* Logo and Heading */}
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-primary text-2xl font-semibold mt-4 border-b-2 border-b-gray-100">
            Verify Your Email
          </h2>
          <p className="text-center text-white mt-2">
            Please enter the 4-digit OTP sent to your email address to verify
            your account.
          </p>
        </div>

        {/* OTP Form */}
        <Form layout="vertical" onFinish={onFinish} className="space-y-6">
          {/* OTP Input Fields */}
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
                  aria-label={`OTP Digit ${index + 1}`}
                />
              </Form.Item>
            ))}
          </div>

          {/* Didn't Receive Code & Resend Button */}
          <div className="flex justify-between items-center">
            <span className="text-white">Didnt receive the code?</span>
            <Button
              type="link"
              onClick={handleResend}
              disabled={isLoading}
              className="text-green-500 hover:text-green-600"
            >
              Resend
            </Button>
          </div>

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isLoading}
              className="w-full bg-green-500 hover:bg-green-600 transition-colors"
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
