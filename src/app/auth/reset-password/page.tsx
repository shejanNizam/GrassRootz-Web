// app/auth/reset-password/page.jsx

"use client"; // Enables client-side rendering for hooks and interactivity

import { SuccessSwal } from "@/components/utils/allSwalFire";
import { Button, Form, Input, message } from "antd";
import Link from "next/link"; // Next.js Link component
import { useRouter } from "next/navigation"; // For Next.js App Router
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa"; // Importing the back arrow icon

const ResetPassword = () => {
  const router = useRouter(); // Initialize Next.js router
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state for form submission
  const [form] = Form.useForm(); // Initialize Ant Design form instance

  // Handle form submission
  const onFinish = async (values: {
    password: string;
    confirmPassword: string;
  }) => {
    const { password, confirmPassword } = values;

    // Validate if passwords match
    if (password !== confirmPassword) {
      message.error("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      // TODO: Replace with actual reset password API call
      // Example:
      // const response = await fetch('/api/reset-password', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ password }),
      // });

      // Mock response for demonstration
      await new Promise((resolve) => setTimeout(resolve, 2000));
      SuccessSwal({
        title: "Password reset successful!",
        text: "Your password has been successfully updated.You can now log in with your new password.",
      });

      router.push("/auth/login");
    } catch (error) {
      console.error("Reset Password error:", error);
      message.error("Failed to reset password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle back button click
  const handleBack = () => {
    router.back(); // Navigate to the previous page
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center p-4 ">
      {/* Back Button */}

      {/* Reset Password Container */}
      <div className="bg-gray-950 border border-primary shadow-lg rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 text-gray-500 hover:text-gray-300 focus:outline-none"
          aria-label="Go Back"
        >
          <FaArrowLeft size={24} />
        </button>
        {/* Heading */}
        <div className="flex flex-col items-center mb-6">
          <h2 className=" text-primary text-2xl font-semibold mt-4 border-b-2 border-b-gray-100">
            Reset Your Password
          </h2>
          <p className="text-center text-white mt-2">
            Please enter your new password below.
          </p>
        </div>

        {/* Reset Password Form */}
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="space-y-6"
        >
          {/* New Password Field */}
          <Form.Item
            label={<span className="font-semibold"> New Password </span>}
            name="password"
            rules={[
              { required: true, message: "Please enter your new password." },
              { min: 6, message: "Password must be at least 6 characters." },
            ]}
            hasFeedback
          >
            <Input.Password
              placeholder="Enter your new password"
              size="large"
              aria-label="New Password"
            />
          </Form.Item>

          {/* Confirm Password Field */}
          <Form.Item
            label={
              <span className="font-semibold"> Confirm New Password </span>
            }
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your new password." },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match."));
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password
              placeholder="Confirm your new password"
              size="large"
              aria-label="Confirm New Password"
            />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isSubmitting}
              className="w-full"
            >
              Reset Password
            </Button>
          </Form.Item>

          {/* Navigation Link to Login Page */}
          <p className="text-center">
            <span className="text-white">Remembered your password? </span>
            <Link href="/auth/login" className="text-primary">
              Log In
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
