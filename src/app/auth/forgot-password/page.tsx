// app/forgot-password/page.jsx

"use client"; // Enables client-side rendering for hooks and interactivity

import { SuccessSwal } from "@/components/utils/allSwalFire";
import { Button, Form, Input, message } from "antd";
import Link from "next/link"; // Next.js Link component
import { useRouter } from "next/navigation"; // For Next.js App Router
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6"; // Importing the back arrow icon

const ForgotPassword = () => {
  const router = useRouter(); // Initialize Next.js router
  const [form] = Form.useForm(); // Initialize Ant Design form instance
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state for form submission

  const onFinish = async (values: { email: string }) => {
    console.log(values); // Use the 'values' parameter
    setIsSubmitting(true);
    try {
      // Handle form submission logic here
      // Example: Send data to your API endpoint
      // const response = await fetch('/api/forgot-password', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(values),
      // });

      // Mock response for demonstration
      await new Promise((resolve) => setTimeout(resolve, 2000));

      SuccessSwal({
        title: "OTP has been sent to your email!",
        text: "",
      });
      router.push("/auth/verify-email");
    } catch (error) {
      console.error("Forgot Password error:", error);
      message.error("Failed to send OTP. Please try again.");
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
      {/* Forgot Password Container */}
      <div className="bg-gray-950 border border-primary shadow-lg rounded-lg w-full max-w-md p-6 relative">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 text-gray-500 hover:text-gray-300 focus:outline-none"
          aria-label="Go Back"
        >
          <FaArrowLeft size={24} />
        </button>

        {/* Logo and Heading */}
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-primary text-2xl font-semibold mt-4 border-b-2 border-b-gray-100">
            Forgot Password
          </h2>
          <p className="text-center text-white mt-2">
            Enter your email address below and well send you an OTP to reset
            your password.
          </p>
        </div>

        {/* Forgot Password Form */}
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="space-y-4"
        >
          {/* Email Field */}
          <Form.Item
            label={<span className="font-semibold"> Email </span>}
            name="email"
            rules={[
              { type: "email", message: "Please enter a valid email address!" },
              { required: true, message: "Email is required!" },
            ]}
          >
            <Input
              size="large"
              placeholder="Enter your email"
              aria-label="Email Address"
            />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isSubmitting}
              className="w-full bg-green-500 hover:bg-green-600 transition-colors"
            >
              Send OTP
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

export default ForgotPassword;
