"use client";

import SecondaryBanner from "@/components/Home/Banner/SecondaryBanner";
import { useCartWishlist } from "@/context/CartWishlistContext";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import Image from "next/image";

export default function WishList() {
  const { wishlist, removeFromWishlist, addToCart } = useCartWishlist();

  const columns = [
    {
      title: "PRODUCT",
      dataIndex: "name",
      key: "product",
      responsive: ["md" as const],
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
      render: (price: number) => <span className="text-white">${price}</span>,
    },
    {
      title: "ACTION",
      key: "action",
      render: (_: unknown, record: any) => (
        <div className="flex items-center space-x-2">
          <Button
            type="primary"
            size="small"
            onClick={() =>
              addToCart({
                id: record.id,
                name: record.name,
                price: record.price,
                image: record.image,
                quantity: 1,
              })
            }
            aria-label={`Add ${record.name} to cart`}
          >
            Add to Cart
          </Button>
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => removeFromWishlist(record.id)}
            aria-label={`Remove ${record.name} from wishlist`}
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
            dataSource={wishlist}
            rowKey="id"
            pagination={{ pageSize: 5 }}
            className="bg-gray-900 text-white rounded-lg"
            scroll={{ x: 600 }}
          />
        </div>
      </div>
    </>
  );
}
