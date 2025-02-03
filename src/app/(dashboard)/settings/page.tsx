"use client";

import { Button, Form, Input, Modal, Select, Upload } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Settings() {
  const [form] = Form.useForm();
  // const [passwordForm] = Form.useForm();
  const [addressForm] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  // const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch logged-in user data
    const fetchUserData = async () => {
      const response = await fetch("/api/user"); // Replace with actual API
      const data = await response.json();
      // setUser(data);
      form.setFieldsValue(data);
      addressForm.setFieldsValue(data);
      setImageUrl(data.image || "https://via.placeholder.com/100"); // Default user image if none found
    };
    fetchUserData();
  }, [addressForm, form]);

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const handleUpload = (info) => {
    if (info.file.status === "done" && info.file.originFileObj) {
      setImageUrl(URL.createObjectURL(info.file.originFileObj));
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center py-10">
      <div className="w-full max-w-4xl">
        {/* Account Settings */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg mb-6 flex justify-between">
          <div className="w-1/3 flex flex-col items-center">
            <Image
              src={imageUrl}
              alt="Profile Picture"
              width={100}
              height={100}
              className="rounded-full w-32 h-32"
            />
            <Upload
              showUploadList={false}
              beforeUpload={() => true}
              onChange={handleUpload}
            >
              <Button type="primary" size="middle">
                Choose Image
              </Button>
            </Upload>
          </div>

          <div className="w-2/3">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Account Settings</h3>
              <Button type="primary" size="large" onClick={showModal}>
                Change Password
              </Button>
            </div>
            <Form form={form} layout="vertical">
              <div className="flex gap-6">
                <Form.Item
                  label="First Name"
                  className="w-1/2"
                  name="firstName"
                  rules={[
                    { required: true, message: "First name is required" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Email"
                  className="w-1/2"
                  name="email"
                  rules={[{ required: true, message: "Email is required" }]}
                >
                  <Input />
                </Form.Item>
              </div>
              <Form.Item
                label="Phone Number"
                name="phone"
                rules={[
                  { required: true, message: "Phone number is required" },
                ]}
              >
                <Input />
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="w-full"
              >
                Save Changes
              </Button>
            </Form>
          </div>
        </div>

        {/* Address Section */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Address</h3>
          <Form layout="vertical" form={addressForm}>
            <div className="flex gap-6">
              <Form.Item
                label="Full Name"
                className="w-1/2"
                name="firstName"
                rules={[{ required: true, message: "Full name is required" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Street Address"
                className="w-1/2"
                name="address"
                rules={[
                  { required: true, message: "Street address is required" },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="flex gap-6">
              <Form.Item
                label="Country / Region"
                className="w-1/3"
                name="country"
                rules={[{ required: true, message: "Country is required" }]}
              >
                <Select>
                  <Select.Option value="United States">
                    United States
                  </Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="State"
                className="w-1/3"
                name="state"
                rules={[{ required: true, message: "State is required" }]}
              >
                <Select>
                  <Select.Option value="Washington DC">
                    Washington DC
                  </Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Zip Code"
                className="w-1/3"
                name="zip"
                rules={[{ required: true, message: "Zip code is required" }]}
              >
                <Input />
              </Form.Item>
            </div>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full"
            >
              Save Changes
            </Button>
          </Form>
        </div>

        {/* Change Password Modal */}
        <Modal
          title="Change Password"
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          centered
        >
          <Form layout="vertical" className="p-4">
            <Form.Item
              name="oldPassword"
              rules={[
                { required: true, message: "Please enter your old password" },
              ]}
            >
              <Input.Password placeholder="Current Password" />
            </Form.Item>
            <Form.Item
              name="newPassword"
              rules={[
                { required: true, message: "Please enter your new password" },
              ]}
            >
              <Input.Password placeholder="New Password" />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              rules={[
                { required: true, message: "Please confirm your new password" },
              ]}
            >
              <Input.Password placeholder="Confirm Password" />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full"
            >
              Change Password
            </Button>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
