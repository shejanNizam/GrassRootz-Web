"use client";

import { ErrorSwal, SuccessSwal } from "@/components/utils/allSwalFire";
import { Button, Form, Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";
import { useForgotPasswordMutation } from "../../../redux/api/authApi";

const ForgotPassword = () => {
  const router = useRouter();
  const [form] = Form.useForm();

  // Initialize the forgot password mutation hook
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const onFinish = async (values: { email: string }) => {
    try {
      // Call the forgot password API using the hook
      await forgotPassword({
        email: values.email,
      }).unwrap();

      SuccessSwal({
        title: "OTP has been sent to your email!",
        text: "",
      });
      router.push("/auth/verify-email");
    } catch (error) {
      console.error("Forgot Password error:", error);
      ErrorSwal({
        title: "An error occurred. Please try again later.",
        text: "",
      });
    }
  };

  const handleBack = () => {
    router.back(); // Navigate to the previous page
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center p-4 ">
      <div className="bg-gray-950 border border-primary shadow-lg rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 text-gray-500 hover:text-gray-300 focus:outline-none"
          aria-label="Go Back"
        >
          <FaArrowLeft size={24} />
        </button>

        <div className="flex flex-col items-center mb-6">
          <h2 className="text-primary text-2xl font-semibold mt-4 border-b-2 border-b-gray-100">
            Forgot Password
          </h2>
          <p className="text-center text-white mt-2">
            {
              "Enter your email address below and we'll send you an OTP to reset your password."
            }
          </p>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="space-y-4"
        >
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

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isLoading}
              className="w-full bg-green-500 hover:bg-green-600 transition-colors"
            >
              Send OTP
            </Button>
          </Form.Item>

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
