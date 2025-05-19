// "use client";

// import {
//   useGetUserDataQuery,
//   useUpdateUserDataMutation,
// } from "@/redux/features/userApi";
// import { Button, Form, Input, message, Modal } from "antd";
// import Image from "next/image";
// import { useState } from "react";
// import defaultImg from "../../../assets/profile/profile_img.png";

// export default function UserProfile() {
//   const { data, isLoading } = useGetUserDataQuery({});
//   const [updateProfile] = useUpdateUserDataMutation();

//   const [modalVisible, setModalVisible] = useState(false);
//   const [form] = Form.useForm();

//   // Image preview and file state
//   const [imagePreview, setImagePreview] = useState(null);
//   const [imageFile, setImageFile] = useState(null);

//   const user = data?.data || {};
//   const baseImageUrl = process.env.NEXT_PUBLIC_IMAGE_URL;
//   const userImage = user.image || null;
//   // console.log(userImage);

//   // Open modal and fill form values + reset image state
//   const openModal = () => {
//     form.setFieldsValue({
//       name: user.name || "",
//       email: user.email || "",
//       phone: user.phone || "",
//       address: user.address || "",
//       country: user.country || "",
//       states: user.states || "",
//       zipCode: user.zipCode || "",
//     });
//     setImagePreview(userImage);
//     setImageFile(null);
//     setModalVisible(true);
//   };

//   // Image file selection handler
//   const onImageChange = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setImageFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => setImagePreview(reader.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   // Form submit handler with multipart/form-data
//   const onFinish = async (values) => {
//     try {
//       const formData = new FormData();

//       // Append all fields except email (optional: but including email is ok too if backend accepts)
//       Object.entries(values).forEach(([key, val]) => {
//         formData.append(key, val);
//       });

//       // Append image file if selected
//       if (imageFile) {
//         formData.append("image", imageFile);
//       }

//       // Call RTK query mutation with FormData
//       await updateProfile(formData).unwrap();

//       message.success("Profile updated successfully");
//       setModalVisible(false);
//     } catch (error) {
//       console.error(error);
//       message.error("Failed to update profile. Please try again.");
//     }
//   };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen flex flex-col gap-4 px-4 py-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-black text-white rounded-lg p-6">
//         {/* Profile Card */}
//         <div className="bg-gray-900 p-6 rounded-lg flex flex-col items-center text-center border border-gray-700">
//           <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
//             {userImage ? (
//               <Image
//                 src={baseImageUrl + userImage}
//                 alt={user.name || "User Image"}
//                 width={80}
//                 height={80}
//                 className="object-cover"
//               />
//             ) : (
//               <Image
//                 src={defaultImg}
//                 alt="Default Profile"
//                 width={80}
//                 height={80}
//               />
//             )}
//           </div>
//           <h3 className="text-lg font-semibold">{user.name || "No Name"}</h3>
//           <p className="text-gray-400 capitalize">{user.role || "User"}</p>
//         </div>

//         {/* Profile Info Card */}
//         <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 flex flex-col justify-between">
//           <div>
//             <h4 className="text-gray-400 text-sm mb-2">PROFILE DETAILS</h4>
//             <h3 className="text-lg font-semibold">{user.name || "No Name"}</h3>
//             <p className="text-gray-400">{user.address || "N/A"}</p>
//             <p className="text-white mt-2">{user.email || "N/A"}</p>
//             <p className="text-white">{user.phone || "N/A"}</p>
//             <p className="text-white">{user.country || "N/A"}</p>
//             <p className="text-white">{user.states || "N/A"}</p>
//             <p className="text-white">{user.zipCode || "N/A"}</p>
//           </div>
//           <Button type="primary" className="mt-4" onClick={openModal}>
//             Update Profile
//           </Button>
//         </div>
//       </div>

//       {/* Modal with Update Form */}
//       <Modal
//         title="Update Profile"
//         open={modalVisible}
//         onCancel={() => setModalVisible(false)}
//         footer={null}
//         destroyOnClose
//       >
//         <Form
//           form={form}
//           layout="vertical"
//           onFinish={onFinish}
//           initialValues={{
//             name: user.name || "",
//             email: user.email || "",
//             phone: user.phone || "",
//             address: user.address || "",
//             country: user.country || "",
//             states: user.states || "",
//             zipCode: user.zipCode || "",
//           }}
//         >
//           {/* Image preview and upload */}
//           <Form.Item label="Profile Image">
//             <div className="mb-2">
//               {imagePreview ? (
//                 <Image
//                   src={imagePreview}
//                   alt="Image Preview"
//                   width={80}
//                   height={80}
//                   className="rounded-full"
//                 />
//               ) : (
//                 <Image
//                   src={defaultImg}
//                   alt="Default Profile"
//                   width={80}
//                   height={80}
//                   className="rounded-full"
//                 />
//               )}
//             </div>
//             <input type="file" accept="image/*" onChange={onImageChange} />
//           </Form.Item>

//           <Form.Item
//             label="Name"
//             name="name"
//             rules={[{ required: true, message: "Please enter your name" }]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item label="Email" name="email">
//             <Input readOnly className="bg-gray-200 cursor-not-allowed" />
//           </Form.Item>

//           <Form.Item
//             label="Phone"
//             name="phone"
//             rules={[
//               { required: true, message: "Please enter your phone number" },
//             ]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             label="Address"
//             name="address"
//             rules={[{ required: true, message: "Please enter your address" }]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             label="Country"
//             name="country"
//             rules={[{ required: true, message: "Please enter your country" }]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             label="States"
//             name="states"
//             rules={[{ required: true, message: "Please enter your states" }]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             label="Zip Code"
//             name="zipCode"
//             rules={[{ required: true, message: "Please enter your zip code" }]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item className="text-right">
//             <Button onClick={() => setModalVisible(false)} className="mr-3">
//               Cancel
//             </Button>
//             <Button type="primary" htmlType="submit">
//               Update
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// }

"use client";

import {
  useGetUserDataQuery,
  useUpdateUserDataMutation,
} from "@/redux/features/userApi";
import { Button, Form, Input, message, Modal } from "antd";
import Image from "next/image";
import { useState } from "react";
import { FiPlus } from "react-icons/fi"; // plus icon
import defaultImg from "../../../assets/profile/profile_img.png";

export default function UserProfile() {
  const { data, isLoading } = useGetUserDataQuery({});
  const [updateProfile] = useUpdateUserDataMutation();

  const [modalVisible, setModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [form] = Form.useForm();

  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const user = data?.data || {};
  const baseImageUrl = process.env.NEXT_PUBLIC_IMAGE_URL || "";

  // Compute full image URL or null
  const userImageUrl = user.image ? baseImageUrl + user.image : null;

  // Open modal: set form values and set image preview correctly
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

  // Handle image file input change: preview + file state
  const onImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Submit handler with FormData for multipart/form-data
  const onFinish = async (values) => {
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
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen px-6 py-8">
      {/* Static title */}
      <h1 className="text-3xl font-bold mb-8 text-gray-600 text-center">
        User Profile
      </h1>

      {/* Single card container */}
      <div className="max-w-3xl mx-auto bg-gray-900 text-white rounded-lg p-8 shadow-lg">
        {/* Profile top: image + basic info */}
        <div className="flex items-center gap-6 mb-8">
          <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-gray-700 relative">
            {userImageUrl ? (
              <Image
                src={userImageUrl}
                alt={user.name || "User Image"}
                fill
                sizes="112px"
                style={{ objectFit: "cover" }}
                className="rounded-full"
              />
            ) : (
              <Image
                src={defaultImg}
                alt="Default Profile"
                fill
                sizes="112px"
                style={{ objectFit: "cover" }}
                className="rounded-full"
              />
            )}
          </div>
          <div>
            <h2 className="text-primary text-2xl font-semibold">
              {user.name || "No Name"}
            </h2>
            <p className="text-primary  capitalize">{user.role || "User"}</p>
            <p className="text-primary mt-1 ">{user.email || "No Email"}</p>
          </div>
        </div>

        {/* Profile details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 text-gray-300">
          <div>
            <h3 className="font-semibold text-white mb-1">Phone: </h3>
            <p className="text-primary">{user.phone || "N/A"}</p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-1">Address: </h3>
            <p className="text-primary">{user.address || "N/A"}</p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-1">Country: </h3>
            <p className="text-primary">{user.country || "N/A"}</p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-1">States: </h3>
            <p className="text-primary">{user.states || "N/A"}</p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-1">Zip Code: </h3>
            <p className="text-primary">{user.zipCode || "N/A"}</p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          {/* Update button */}
          <Button type="primary" size="large" onClick={openModal}>
            Update Profile
          </Button>
          {/* <Button type="primary" size="large" onClick={openModal}>
            Update Profile
          </Button> */}
          <Button type="primary" size="large" onClick={showModal}>
            Change Password
          </Button>
        </div>
      </div>

      {/* Modal with update form */}
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
          {/* Image preview with + icon overlay */}
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

              {/* Hidden file input */}
              <input
                type="file"
                accept="image/*"
                onChange={onImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                title="Change profile image"
              />

              {/* Plus icon overlay */}
              <div className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-1 m-1">
                <FiPlus className="text-white" size={18} />
              </div>
            </div>
          </Form.Item>

          {/* All labels text color black */}
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
