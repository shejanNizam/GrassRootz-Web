"use client";

import { HeartOutlined } from "@ant-design/icons";
import { Button, InputNumber, Rate, Select } from "antd";
import Image from "next/image";
import { useState } from "react";
import img2 from "../../../assets/home/latest_products/latest_product_img.png";
import img3 from "../../../assets/home/popular_products/popular_product_img.png";
import img from "../../../assets/shop/shop_product_img.png";

const { Option } = Select;

export default function ProductDetails() {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("White");
  const [selectedSize, setSelectedSize] = useState("M");
  const [mainImage, setMainImage] = useState(img); // State for main image

  const price = 300;
  const totalPrice = price * quantity;

  const thumbnails = [
    { src: img, alt: "Thumb1" },
    { src: img2, alt: "Thumb2" },
    { src: img3, alt: "Thumb3" },
  ];
  return (
    <div>
      <div className="bg-black text-white flex items-start justify-center py-20">
        <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* LEFT COLUMN: Image Thumbnails & Main Image */}
          <div className="flex gap-4 justify-center md:justify-start">
            {/* Thumbnails */}
            <div className="flex flex-col gap-4">
              {thumbnails.map((thumbnail, index) => (
                <Image
                  key={index}
                  src={thumbnail.src}
                  alt={thumbnail.alt}
                  width={100}
                  height={100}
                  className={`w-24 h-24 border object-cover cursor-pointer ${
                    mainImage === thumbnail.src
                      ? "border-yellow-500"
                      : "border-gray-200"
                  }`}
                  onClick={() => setMainImage(thumbnail.src)} // Change main image
                />
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1">
              <Image
                src={mainImage}
                alt="Main T-Shirt"
                className="w-full h-full object-cover"
                style={{
                  maxHeight: "calc(3 * 6rem + 2 * 1rem)", // Matches the height of 3 thumbnails with gaps
                }}
              />
            </div>
          </div>

          {/* RIGHT COLUMN: Product Info */}
          <div className="px-2 md:px-0">
            <h1 className="text-3xl font-semibold mb-2">
              Classic Comfort T-Shirt
            </h1>

            <div className="flex items-center mb-4">
              <Rate disabled defaultValue={4} style={{ color: "#faad14" }} />
              <span className="ml-2 text-sm text-gray-300">(4 Reviews)</span>
            </div>

            <p className="text-xl text-primary font-bold">${price}</p>
            <div className="border-b border-gray-700 mb-2" />

            <p className="text-xl mb-2">
              Brand:
              <span className="font-bold text-primary"> Nike</span>
            </p>

            {/* Inputs aligned with flex */}
            <div className="flex flex-wrap gap-6 items-center">
              {/* Size Selector */}
              <div>
                <label className="block text-sm mb-1 font-semibold text-gray-300">
                  Available Sizes:
                </label>
                <Select
                  value={selectedSize}
                  onChange={setSelectedSize}
                  className="w-40"
                >
                  {["S", "M", "L", "XL", "XXL"].map((size) => (
                    <Option value={size} key={size}>
                      {size}
                    </Option>
                  ))}
                </Select>
              </div>

              {/* Color Selector */}
              <div>
                <label className="block text-sm mb-1 font-semibold text-gray-300">
                  Available Colors:
                </label>
                <Select
                  value={selectedColor}
                  onChange={setSelectedColor}
                  className="w-40"
                >
                  {["White", "Black", "Red", "Blue"].map((color) => (
                    <Option value={color} key={color}>
                      {color}
                    </Option>
                  ))}
                </Select>
              </div>

              {/* Quantity Selector */}
              <div>
                <label className="block text-sm mb-1 font-semibold text-gray-300">
                  Quantity:
                </label>
                <InputNumber
                  min={1}
                  value={quantity}
                  onChange={(val) => val !== null && setQuantity(val)}
                  className="w-20"
                />
              </div>
            </div>

            {/* Total Price */}
            <p className="text-2xl font-bold my-6">
              Total:{" "}
              <span className="text-primary">
                ${totalPrice.toLocaleString()}
              </span>
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Order Now Button */}
              <Button type="primary" className="bg-primary ">
                Order Now
              </Button>

              {/* Add to Cart Button */}
              <Button className="">Add to Cart</Button>

              {/* Wish Button */}
              <Button
                className="bg-transparent"
                icon={<HeartOutlined />}
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
