"use client";

import {
  useGetUserDataQuery,
  useUpdateUserDataMutation,
} from "@/redux/features/userApi";
import { Button, Form, Input, message, Modal, Spin } from "antd";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { FiPlus } from "react-icons/fi";
import defaultImg from "../../../assets/profile/profile_img.png";

interface User {
  _id?: string;
  name?: string;
  email?: string;
  role?: string;
  phone?: string;
  address?: string;
  image?: string;
  country?: string;
  states?: string;
  zipCode?: string;
}

interface UserApiResponse {
  data?: User;
}

export default function UserProfile() {
  // Fetch user data (typed)
  const { data, isLoading } = useGetUserDataQuery({});

  const [updateProfile] = useUpdateUserDataMutation();

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [form] = Form.useForm();

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const user: User = data?.data || {};
  const baseImageUrl = process.env.NEXT_PUBLIC_IMAGE_URL || "";

  const userImageUrl = user.image ? baseImageUrl + user.image : null;

  const openModal = () => {
    form.setFieldsValue({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      address: user.address || "",
      country: user.country || "",
      states: user.states || "",
      zipCode: user.zipCode || "",
    });
    setImagePreview(userImageUrl);
    setImageFile(null);
    setModalVisible(true);
  };

  // Typed event for file input change
  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onFinish = async (values: Record<string, any>) => {
    try {
      const formData = new FormData();

      Object.entries(values).forEach(([key, val]) => {
        formData.append(key, val);
      });

      if (imageFile) {
        formData.append("image", imageFile);
      }

      await updateProfile(formData).unwrap();
      message.success("Profile updated successfully");
      setModalVisible(false);
    } catch (error) {
      console.error(error);
      message.error("Failed to update profile. Please try again.");
    }
  };

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="w-full mx-auto min-h-screen">
      <h1 className="text-2xl font-bold mb-8 text-primary text-center">
        User Profile
      </h1>

      <div className="max-w-5xl mx-auto bg-gray-900 rounded-lg p-4 shadow-lg">
        <div className="flex  items-center gap-6 mb-8">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-gray-700 relative flex-shrink-0">
            {userImageUrl ? (
              <Image
                src={userImageUrl}
                alt={user.name || "User Image"}
                fill
                sizes="112px"
                style={{ objectFit: "cover" }}
                className="rounded-full"
                priority
              />
            ) : (
              <Image
                src={defaultImg}
                alt="Default Profile"
                fill
                sizes="112px"
                style={{ objectFit: "cover" }}
                className="rounded-full"
                priority
              />
            )}
          </div>
          <div className="text-left">
            <h2 className="text-primary text-xl sm:text-2xl font-semibold">
              {user.name || "No Name"}
            </h2>
            <p className="text-primary capitalize">{user.role || "User"}</p>
            <p className="text-primary mt-1 text-sm sm:text-base">
              {user.email || "No Email"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 text-gray-300 text-sm sm:text-base">
          <div>
            <h3 className="font-semibold text-white mb-1">Phone:</h3>
            <p className="text-primary">{user.phone || "N/A"}</p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-1">Address:</h3>
            <p className="text-primary">{user.address || "N/A"}</p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-1">Country:</h3>
            <p className="text-primary">{user.country || "N/A"}</p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-1">States:</h3>
            <p className="text-primary">{user.states || "N/A"}</p>
          </div>
          <div className="sm:col-span-2">
            <h3 className="font-semibold text-white mb-1">Zip Code:</h3>
            <p className="text-primary">{user.zipCode || "N/A"}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <Button
            type="primary"
            size="large"
            className="w-full sm:w-auto"
            onClick={openModal}
          >
            Update Profile
          </Button>
          <Button
            type="primary"
            size="large"
            className="w-full sm:w-auto"
            onClick={showModal}
          >
            Change Password
          </Button>
        </div>
      </div>

      <Modal
        title="Update Profile"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        destroyOnClose
        centered
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            name: user.name || "",
            email: user.email || "",
            phone: user.phone || "",
            address: user.address || "",
            country: user.country || "",
            states: user.states || "",
            zipCode: user.zipCode || "",
          }}
        >
          <Form.Item
            label={
              <span className="text-black font-medium">Profile Image</span>
            }
          >
            <div className="relative w-20 h-20 rounded-full overflow-hidden border border-gray-300 cursor-pointer mx-auto">
              {imagePreview ? (
                <Image
                  src={
                    typeof imagePreview === "string" ? imagePreview : defaultImg
                  }
                  alt="Image Preview"
                  fill
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <Image
                  src={defaultImg}
                  alt="Default Profile"
                  fill
                  style={{ objectFit: "cover" }}
                />
              )}

              <input
                type="file"
                accept="image/*"
                onChange={onImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                title="Change profile image"
              />

              <div className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-1 m-1">
                <FiPlus className="text-white" size={18} />
              </div>
            </div>
          </Form.Item>

          <Form.Item
            label={<span className="text-black font-medium">Name</span>}
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={<span className="text-black font-medium">Email</span>}
            name="email"
          >
            <Input readOnly className="bg-gray-200 cursor-not-allowed" />
          </Form.Item>

          <Form.Item
            label={<span className="text-black font-medium">Phone</span>}
            name="phone"
            rules={[
              { required: true, message: "Please enter your phone number" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={<span className="text-black font-medium">Address</span>}
            name="address"
            rules={[{ required: true, message: "Please enter your address" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={<span className="text-black font-medium">Country</span>}
            name="country"
            rules={[{ required: true, message: "Please enter your country" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={<span className="text-black font-medium">States</span>}
            name="states"
            rules={[{ required: true, message: "Please enter your states" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={<span className="text-black font-medium">Zip Code</span>}
            name="zipCode"
            rules={[{ required: true, message: "Please enter your zip code" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item className="text-right">
            <Button
              onClick={() => setModalVisible(false)}
              className="mr-3"
              size="large"
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" size="large">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Change Password"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <Form
          layout="vertical"
          className="p-4"
          onFinish={(values) => {
            // TODO: Implement change password logic
            console.log("Change password values:", values);
            // Close modal after submission
            setIsModalVisible(false);
          }}
        >
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
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Please confirm your new password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
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
  );
}
