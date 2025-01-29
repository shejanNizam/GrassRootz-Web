"use client";

import SecondaryBanner from "@/components/Home/Banner/SecondaryBanner";
import { Input, Radio, Select } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import img from "../../assets/shop/shop_product_img.png";

// Ant Design Select Options
const { Option } = Select;

export default function CheckoutPage() {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("credit");

  // Order Summary Data
  const orderItems = [
    {
      id: 1,
      name: "Kashmir Body Spray",
      price: 1500,
      quantity: 2,
      image: img,
    },
    {
      id: 2,
      name: "EFD Nike Shoe",
      price: 1000,
      quantity: 2,
      image: img,
    },
  ];

  const subtotal = orderItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const deliveryCharge = 20;
  const total = subtotal + deliveryCharge;

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <SecondaryBanner heading="Checkout" />
      <div className="min-h-screen container py-16 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side - Delivery Address */}
          <div className="lg:col-span-2 bg-black p-6 rounded-lg border border-gray-700">
            <h3 className="text-lg font-semibold mb-4 text-white">
              Delivery Address
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-white mb-1">Full Name</label>
                <Input
                  placeholder="Full name"
                  defaultValue="Dianne"
                  className="bg-gray-900 text-white"
                />
              </div>

              {/* Street Address */}
              <div>
                <label className="block text-white mb-1">Street Address</label>
                <Input
                  placeholder="Street Address"
                  defaultValue="4140 Park"
                  className="bg-gray-900 text-white"
                />
              </div>

              {/* Country / Region */}
              <div>
                <label className="block text-white mb-1">
                  Country / Region
                </label>
                <Select
                  defaultValue="United States"
                  className="bg-gray-900 text-white w-full"
                >
                  <Option value="United States">United States</Option>
                  <Option value="Canada">Canada</Option>
                  <Option value="UK">United Kingdom</Option>
                </Select>
              </div>

              {/* State */}
              <div>
                <label className="block text-white mb-1">State</label>
                <Select
                  defaultValue="Washington DC"
                  className="bg-gray-900 text-white w-full"
                >
                  <Option value="Washington DC">Washington DC</Option>
                  <Option value="New York">New York</Option>
                  <Option value="California">California</Option>
                </Select>
              </div>

              {/* Zip Code */}
              <div>
                <label className="block text-white mb-1">Zip Code</label>
                <Input
                  placeholder="Zip Code"
                  defaultValue="20033"
                  className="bg-gray-900 text-white"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-white mb-1">Email</label>
                <Input
                  placeholder="Email"
                  defaultValue="dianne.russell@gmail.com"
                  className="bg-gray-900 text-white"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-white mb-1">Phone</label>
                <Input
                  placeholder="Phone"
                  defaultValue="(603) 555-0123"
                  className="bg-gray-900 text-white"
                />
              </div>
            </div>
            <br /> <br />
            <span
              onClick={handleBack}
              className="bg-white hover:bg-primary text-black font-semibold px-6 py-4 rounded-full cursor-pointer"
            >
              Return Back
            </span>
          </div>

          {/* Right Side - Order Summary */}
          <div className="bg-black p-6 rounded-lg border border-gray-700">
            <h3 className="text-lg font-semibold mb-4 text-white">
              Order Summary
            </h3>

            {/* Order Items */}
            {orderItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between mb-4"
              >
                <div className="flex items-center space-x-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={40}
                    height={40}
                    className="rounded-lg"
                  />
                  <span className="text-white">
                    {item.name}{" "}
                    <span className="text-gray-400">x{item.quantity}</span>
                  </span>
                </div>
                <span className="text-white">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}

            {/* Order Price Details */}
            <div className="flex justify-between text-white mt-4">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-white mt-2">
              <span>Delivery Charge:</span>
              <span className="text-green-400">
                ${deliveryCharge.toFixed(2)}
              </span>
            </div>
            <hr className="my-4 border-gray-600" />
            <div className="flex justify-between text-green-400 font-semibold text-lg">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>

            {/* Payment Method */}
            <h3 className="text-lg font-semibold mt-6 text-white">
              Payment Method
            </h3>
            <Radio.Group
              onChange={(e) => setPaymentMethod(e.target.value)}
              value={paymentMethod}
              className="mt-2 text-white"
            >
              <Radio value="credit">
                {" "}
                <span className="text-white">Credit Card</span>{" "}
              </Radio>
              <Radio value="debit">
                {" "}
                <span className="text-white">Debit Card</span>{" "}
              </Radio>
            </Radio.Group>

            {/* Place Order Button */}
            <Link href={`/`}>
              <span className="w-full flex justify-center bg-white hover:bg-primary text-black font-semibold px-6 py-4 mt-4 rounded-full">
                Place to Order
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
