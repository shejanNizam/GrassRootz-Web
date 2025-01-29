"use client";

import SecondaryBanner from "@/components/Home/Banner/SecondaryBanner";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import img from "../../assets/shop/shop_product_img.png";

export default function WishList() {
  const [wishlistItems, setWishlistItems] = useState([
    {
      key: "1",
      product: "Green Capsicum",
      price: "$14.99",
      stockStatus: "In Stock",
      image: img,
    },
    {
      key: "2",
      product: "Chinese Cabbage",
      price: "$45.00",
      stockStatus: "In Stock",
      image: img,
    },
    {
      key: "3",
      product: "Fresh Sujapuri Mango",
      price: "$09.00",
      stockStatus: "Out of Stock",
      image: img,
    },
  ]);

  const handleRemoveProduct = (key: string) => {
    setWishlistItems((prevItems) =>
      prevItems.filter((item) => item.key !== key)
    );
  };

  const columns = [
    {
      title: "PRODUCT",
      dataIndex: "product",
      key: "product",
      responsive: ["md" as const], // Hide on small screens
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
      render: (text: string) => <span className="text-white">{text}</span>,
    },
    {
      title: "STOCK STATUS",
      dataIndex: "stockStatus",
      key: "stockStatus",
      render: (text: string) => (
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${
            text === "In Stock"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {text}
        </span>
      ),
    },
    {
      title: "ACTION",
      key: "action",
      render: (_: unknown, record: { stockStatus: string; key: string }) => (
        <div className="flex items-center space-x-2">
          <Button
            type="primary"
            size="small"
            disabled={record.stockStatus !== "In Stock"}
          >
            Add to Cart
          </Button>
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleRemoveProduct(record.key)}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <SecondaryBanner heading="My Wish List" />
      <div className="flex items-center justify-center p-4">
        <div className="w-full max-w-4xl mx-auto bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <Table
            columns={columns}
            dataSource={wishlistItems}
            pagination={{ pageSize: 5 }}
            className="bg-gray-900 text-white rounded-lg"
            scroll={{ x: 600 }} // Ensures scrollability on small screens
          />
        </div>
      </div>
    </>
  );
}
