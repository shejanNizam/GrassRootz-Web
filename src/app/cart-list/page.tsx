"use client";

import SecondaryBanner from "@/components/Home/Banner/SecondaryBanner";
import {
  CloseCircleOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Table } from "antd";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useState } from "react";
import img from "../../assets/shop/shop_product_img.png";

// Sample Product Data
const initialCartItems = [
  {
    key: "1",
    product: "Green Capsicum",
    price: 14.0,
    quantity: 5,
    image: img,
  },
  {
    key: "2",
    product: "Red Capsicum",
    price: 14.0,
    quantity: 1,
    image: img,
  },
  {
    key: "11",
    product: "Green Capsicum",
    price: 14.0,
    quantity: 5,
    image: img,
  },
  {
    key: "12",
    product: "Red Capsicum",
    price: 14.0,
    quantity: 1,
    image: img,
  },
  {
    key: "21",
    product: "Green Capsicum",
    price: 14.0,
    quantity: 5,
    image: img,
  },
  {
    key: "22",
    product: "Red Capsicum",
    price: 14.0,
    quantity: 1,
    image: img,
  },
];

export default function CartList() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  // Function to handle quantity changes
  const updateQuantity = (key: string, type: "increase" | "decrease") => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.key === key
          ? {
              ...item,
              quantity:
                type === "increase"
                  ? item.quantity + 1
                  : Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
  };

  // Function to remove product from cart
  const removeProduct = (key: string) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.key !== key));
  };

  // Calculate total cart price
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Table columns for Ant Design Table
  const columns = [
    {
      title: "PRODUCT",
      dataIndex: "product",
      key: "product",
      render: (text: string, record: { image: StaticImageData }) => (
        <div className="flex items-center space-x-4">
          <Image
            src={record.image}
            alt={text}
            width={50}
            height={50}
            className="rounded-lg"
          />
          <span className="text-white">{text}</span>
        </div>
      ),
    },
    {
      title: "PRICE",
      dataIndex: "price",
      key: "price",
      render: (price: number) => (
        <span className="text-white">${price.toFixed(2)}</span>
      ),
    },
    {
      title: "QUANTITY",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity: number, record: { key: string }) => (
        <div className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-full">
          <Button
            shape="circle"
            size="small"
            icon={<MinusOutlined />}
            onClick={() => updateQuantity(record.key, "decrease")}
          />
          <span className="text-white">{quantity}</span>
          <Button
            shape="circle"
            size="small"
            icon={<PlusOutlined />}
            onClick={() => updateQuantity(record.key, "increase")}
          />
        </div>
      ),
    },
    {
      title: "SUBTOTAL",
      key: "subtotal",
      render: (_: unknown, record: { price: number; quantity: number }) => (
        <span className="text-white">
          ${(record.price * record.quantity).toFixed(2)}
        </span>
      ),
    },
    {
      title: "Action",
      key: "remove",
      render: (_: unknown, record: { key: string }) => (
        <Button
          type="text"
          danger
          icon={<CloseCircleOutlined />}
          // icon={<DeleteOutlined />}
          onClick={() => removeProduct(record.key)}
        />
      ),
    },
  ];

  return (
    <>
      <SecondaryBanner heading="My Cart List" />
      <div className="min-h-screen container py-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Cart Table */}
          <div className="lg:col-span-2 bg-black p-6 rounded-lg border border-gray-700">
            <div className="overflow-x-auto">
              <Table
                columns={columns}
                dataSource={cartItems}
                pagination={{ pageSize: 3 }}
                className="bg-gray-900 text-white rounded-lg"
              />
            </div>
            <div className="flex flex-col sm:flex-row justify-between mt-6 space-y-4 sm:space-y-0">
              <Link href={`/shop`}>
                <span className="bg-white hover:bg-primary text-black font-semibold px-6 py-4 rounded-full">
                  Return to Shop
                </span>
              </Link>
            </div>
          </div>

          {/* Cart Total Summary */}
          <div className="bg-black p-6 rounded-lg border border-gray-700 w-full md:w-2/3 lg:w-full">
            <h3 className="text-xl font-bold mb-8 text-primary">Cart Total</h3>
            <div className="flex justify-between mb-4 text-white">
              <span>Subtotal:</span>
              <span className="font-bold text-xl">${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-white mt-2">
              <span>Shipping:</span>
              <span className="text-green-400">Free</span>
            </div>
            <hr className="my-4 border-gray-600" />
            <div className="flex justify-between text-white font-semibold text-lg">
              <span>Total:</span>
              <span className="font-bold text-xl">${cartTotal.toFixed(2)}</span>
            </div>
            <br /> <br />
            <Link href={`/checkout`}>
              <span className="w-full flex justify-center bg-white hover:bg-primary text-black font-semibold px-6 py-4 mt-4 rounded-full">
                Proceed to Checkout
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
