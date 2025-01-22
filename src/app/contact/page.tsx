"use client";

import { ErrorSwal, SuccessSwal } from "@/components/utils/allSwalFire";
import CustomHeading from "@/components/utils/CustomHeading";
import { Button, Form, Input } from "antd";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

export default function Contact() {
  // Handle form submission
  const onFinish = (values: {
    name: string;
    email: string;
    message: string;
  }) => {
    console.log(values);

    // Show success alert
    SuccessSwal({
      title: "Message Sent!",
      text: "",
    });

    // Reset the form
    form.resetFields();

    // Here, you can integrate with your backend or email service
  };

  // Handle form submission failure
  const onFinishFailed = () => {
    ErrorSwal({
      title: "Please check the form and try again!",
      text: "",
    });
  };

  // Use useForm hook for form control
  const [form] = Form.useForm();

  return (
    <section className="py-12">
      <div className="container mx-auto md:px-4">
        <div className="text-center">
          <CustomHeading> Contact Us </CustomHeading>
        </div>
        <div className="grid grid-col-1 md:grid-cols-1 lg:grid-cols-2 gap-4 justify-center items-center md:py-4 md:px-40">
          {/* Left Side - Contact Information */}
          <div className="p-8">
            <div className="flex items-center mb-6 px-4 py-3 bg-secondary border border-primary rounded ">
              <FaPhoneAlt className="text-primary text-3xl mr-4 mt-1" />
              <div>
                <h3 className="text-lg font-medium">Call Us</h3>
                <p className="text-sm text-gray-600">+(08) 255 201 888</p>
              </div>
            </div>
            <div className="flex items-center mb-6 px-4 py-3 bg-secondary border border-primary rounded ">
              <FaEnvelope className="text-primary text-3xl mr-4 mt-1" />
              <div>
                <h3 className="text-lg font-medium">Email Now</h3>
                <p className="text-sm text-gray-600">a@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center mb-6 px-4 py-3 bg-secondary border border-primary rounded ">
              <FaMapMarkerAlt className="text-primary text-3xl mr-4 mt-1" />
              <div>
                <h3 className="text-lg font-medium">Address</h3>
                <p className="text-sm text-gray-600">
                  7510, Brand Tower, New York, USA
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="p-8">
            <Form
              form={form}
              name="contact_form"
              layout="vertical"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                name="name"
                rules={[{ required: true, message: "Please enter your name!" }]}
              >
                <Input placeholder="Your Name" />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please enter your email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input placeholder="Your Email" />
              </Form.Item>

              <Form.Item
                name="message"
                rules={[
                  { required: true, message: "Please enter your message!" },
                ]}
              >
                <Input.TextArea rows={7} placeholder="Your Message" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full bg-primary text-white hover:bg-white hover:text-primary"
                >
                  Send Message
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
