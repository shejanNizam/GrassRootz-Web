"use client";

import { ErrorSwal, SuccessSwal } from "@/components/utils/allSwalFire";
import { useAppDispatch } from "@/redux/hooks";
import { Button, Checkbox, Form, Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSignupMutation } from "../../../redux/features/authApi";
import { setCredentials } from "../../../redux/slices/authSlice";

export default function Signup() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const [signup, { isLoading }] = useSignupMutation();

  const onFinish = async (values: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      const response = await signup({
        name: values.name,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      }).unwrap();

      dispatch(
        setCredentials({
          user: response?.data?.user,
          token: response?.data?.token,
        })
      );

      SuccessSwal({
        title: "Account created successfully!",
        text: "You have successfully created your account. Please log in.",
      });

      router.push("/login");
    } catch (error) {
      if (error) {
        ErrorSwal({
          title: "Signup failed. Please try again.",
          text: ` ${(error as { data: { message: string } }).data?.message} `,
        });
      } else {
        ErrorSwal({
          title: "Signup failed. Please try again.",
          text: ``,
        });
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-secondary pt-20 px-4">
      <div className="bg-gray-950 border border-primary shadow-2xl rounded-2xl w-full max-w-xl p-8 md:p-16">
        <h2 className="text-primary text-center text-2xl md:text-4xl font-semibold mb-8 border-b-2 border-b-gray-100">
          Create Your Account
        </h2>

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
              loading={isLoading}
              className="w-full transition-colors"
            >
              Create Account
            </Button>
          </Form.Item>

          <p className="text-center">
            <span className="text-white">Already have an account? </span>
            <Link href="/login" className="text-primary">
              Log In
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
}
