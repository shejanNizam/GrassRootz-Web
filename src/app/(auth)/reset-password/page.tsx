"use client";

import { SuccessSwal } from "@/components/utils/allSwalFire";
import { useResetPasswordMutation } from "@/redux/api/authApi";
import { Button, Form, Input, message } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form] = Form.useForm();
  const [resetPassword] = useResetPasswordMutation();

  const onFinish = async (values: { password: string }) => {
    setIsSubmitting(true);

    try {
      await resetPassword({ token, password: values?.password }).unwrap();

      SuccessSwal({
        title: "Password Reset Successful!",
        text: "You can now log in.",
      });
      router.push("/login");
    } catch (error) {
      console.log(error);
      message.error("Failed to reset password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center p-4">
      <div className="bg-gray-950 border border-primary shadow-lg rounded-lg w-full max-w-md p-6 relative">
        <h2 className="text-primary text-2xl font-semibold mt-4 border-b-2 border-b-gray-100">
          Reset Your Password
        </h2>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="space-y-6"
        >
          <Form.Item name="password" label="New Password">
            <Input.Password placeholder="Enter new password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isSubmitting}
              className="w-full"
            >
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
