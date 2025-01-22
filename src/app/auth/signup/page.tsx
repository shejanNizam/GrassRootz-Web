"use client";

import { SuccessSwal } from "@/components/utils/allSwalFire";
import { Button, Checkbox, Form, Input, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Signup = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish = async (values: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    console.log(values);
    setIsSubmitting(true);
    try {
      // Handle form submission logic here
      // Example: Send data to your API endpoint
      // const response = await fetch('/api/signup', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(values),
      // });

      await new Promise((resolve) => setTimeout(resolve, 2000));
      SuccessSwal({
        title: "Creat account successfully!",
        text: "You create your account successfully, Please Login ",
      });
      router.push("/auth/login");
    } catch (error) {
      console.log(error);
      message.error("Signup failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-secondary">
      <div className="bg-gray-950 border border-primary shadow-2xl rounded-2xl rounded-tl-[8rem] md:rounded-tl-[10rem] rounded-br-[8rem] md:rounded-br-[10rem] w-full max-w-xl p-8 md:p-16 mt-[-60px]">
        <div className="flex flex-col items-center">
          <h2 className=" text-primary text-2xl md:text-4xl font-semibold mb-8 border-b-2 border-b-gray-100">
            Create Your Account
          </h2>
        </div>

        {/* Signup Form */}
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="space-y-2"
        >
          {/* User Information Fields */}
          <div className="grid grid-cols-1">
            {/* Name */}
            <Form.Item
              label={<span className="font-semibold"> Name </span>}
              name="name"
              rules={[
                { required: true, message: "Please enter your name" },
                { min: 2, message: "Name must be at least 2 characters" },
              ]}
            >
              <Input placeholder="Enter your name" size="large" />
            </Form.Item>

            {/* Email */}
            <Form.Item
              label={<span className="font-semibold"> Email </span>}
              name="email"
              rules={[
                {
                  type: "email",
                  message: "Please enter a valid email address",
                },
                { required: true, message: "Please enter your valid email" },
              ]}
            >
              <Input placeholder="Enter your email" size="large" />
            </Form.Item>

            {/* Password */}
            <Form.Item
              label={<span className="font-semibold"> Password </span>}
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
                { min: 6, message: "Password must be at least 6 characters" },
              ]}
              hasFeedback
            >
              <Input.Password placeholder="Enter your password" size="large" />
            </Form.Item>

            {/* Confirm Password */}
            <Form.Item
              label={<span className="font-semibold"> Confirm Password </span>}
              name="confirmPassword"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Please confirm your password" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match"));
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Confirm your password"
                size="large"
              />
            </Form.Item>
          </div>

          {/* I Agree Checkbox */}
          <Form.Item
            name="agree"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("You must agree to the terms")),
              },
            ]}
          >
            <Checkbox>
              <span className="text-white">
                I have read & agreed to Peared{" "}
              </span>
              <Link href="/terms-of-use">
                <span className="text-primary">Terms of Use</span>
              </Link>{" "}
              <span className="text-white">and </span>
              <Link href="/privacy-policy">
                <span className="text-primary">Privacy Policy</span>
              </Link>
            </Checkbox>
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isSubmitting}
              className="w-full transition-colors"
            >
              Create Account
            </Button>
          </Form.Item>

          <p className="text-center">
            <span className="text-white">Already have an account? </span>
            <Link href="/auth/login" className="text-primary">
              Log In
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
