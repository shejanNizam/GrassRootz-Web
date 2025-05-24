"use client";

import SecondaryBanner from "@/components/Home/Banner/SecondaryBanner";
import { useCartWishlist } from "@/context/CartWishlistContext";
import {
  CloseCircleOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Table } from "antd";
import Image from "next/image";
import Link from "next/link";

export default function CartList() {
  const { cart, updateCartQuantity, removeFromCart } = useCartWishlist();

  const columns = [
    {
      title: "PRODUCT",
      dataIndex: "name",
      key: "product",
      render: (text: string, record: any) => (
        <div className="flex items-center space-x-4">
          {record.image && (
            <Image
              src={record.image}
              alt={text}
              width={50}
              height={50}
              className="rounded-lg"
            />
          )}
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
      render: (quantity: number, record: any) => (
        <div className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-full">
          <Button
            shape="circle"
            size="small"
            icon={<MinusOutlined />}
            onClick={() => updateCartQuantity(record.id, quantity - 1)}
            aria-label={`Decrease quantity of ${record.name}`}
          />
          <span className="text-white">{quantity}</span>
          <Button
            shape="circle"
            size="small"
            icon={<PlusOutlined />}
            onClick={() => updateCartQuantity(record.id, quantity + 1)}
            aria-label={`Increase quantity of ${record.name}`}
          />
        </div>
      ),
    },
    {
      title: "SUBTOTAL",
      key: "subtotal",
      render: (_: unknown, record: any) => (
        <span className="text-white">
          ${(record.price * record.quantity).toFixed(2)}
        </span>
      ),
    },
    {
      title: "Action",
      key: "remove",
      render: (_: unknown, record: any) => (
        <Button
          type="text"
          danger
          icon={<CloseCircleOutlined />}
          onClick={() => removeFromCart(record.id)}
          aria-label={`Remove ${record.name} from cart`}
        />
      ),
    },
  ];

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * (item.quantity ?? 1),
    0
  );

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
                dataSource={cart}
                rowKey="id"
                pagination={{
                  pageSize: 3,
                  position: ["bottomCenter"],
                }}
                scroll={{ x: 600 }}
                className="bg-primary px-1 py-2 text-white rounded-lg"
              />
            </div>
            <div className="flex flex-col sm:flex-row justify-between mt-6 space-y-4 sm:space-y-0">
              <Link href={`/shop`}>
                <span className="bg-white hover:bg-primary text-black font-semibold px-6 py-4 rounded-full cursor-pointer">
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
              <span className="w-full flex justify-center bg-white hover:bg-primary text-black font-semibold px-6 py-4 mt-4 rounded-full cursor-pointer">
                Proceed to Checkout
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
