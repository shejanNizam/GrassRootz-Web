"use client";

import SecondaryBanner from "@/components/Home/Banner/SecondaryBanner";
import { useCartWishlist } from "@/context/CartWishlistContext";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Table, Tooltip } from "antd";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";

export default function WishList() {
  const { addToCart, wishlist, removeFromCart, isInCart, removeFromWishlist } =
    useCartWishlist();
  // console.log(wishlist);

  const handleToggleCart = (product: (typeof wishlist)[0]) => {
    // console.log(product);
    if (isInCart(product.id)) {
      removeFromCart(product.id);
    } else {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        stockStatus: product.stockStatus,
        quantity: 1,
      });
    }
  };

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
      render: (_: unknown, record: any) => {
        const inCart = isInCart(record.id);
        const inStock = record.stockStatus === "in-stock";

        return (
          <div className="flex items-center space-x-2">
            <Tooltip title={inCart ? "Remove from cart" : "Add to cart"}>
              <button
                className={`${
                  inStock
                    ? inCart
                      ? "bg-primary text-white"
                      : "bg-gray-300 text-gray-600"
                    : "bg-gray-400 cursor-not-allowed"
                } p-2 rounded-full transition-colors duration-200`}
                onClick={() => inStock && handleToggleCart(record)}
                disabled={!inStock}
                aria-label={inCart ? "Remove from cart" : "Add to cart"}
              >
                <FaShoppingCart size={16} />
              </button>
            </Tooltip>

            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => removeFromWishlist(record.id)}
              aria-label={`Remove ${record.name} from wishlist`}
            />
          </div>
        );
      },
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
            className="bg-primary px-1 py-2 text-white rounded-lg"
            scroll={{ x: 600 }}
          />
        </div>
      </div>
    </>
  );
}
