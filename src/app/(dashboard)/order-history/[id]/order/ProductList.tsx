"use client";

import { Button, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import Image from "next/image";

interface Product {
  id: string;
  image: string;
  name: string;
  price: string;
  quantity: number;
  subtotal: string;
}

const products: Product[] = [
  {
    id: "1",
    image: "/images/red-capsicum.png",
    name: "Red Capsicum",
    price: "$14.00",
    quantity: 5,
    subtotal: "$70.00",
  },
  {
    id: "2",
    image: "/images/green-capsicum.png",
    name: "Green Capsicum",
    price: "$14.00",
    quantity: 2,
    subtotal: "$28.00",
  },
  {
    id: "3",
    image: "/images/green-chili.png",
    name: "Green Chili",
    price: "$26.70",
    quantity: 10,
    subtotal: "$267.00",
  },
];

export default function ProductList({ type }: { type: string }) {
  const isDelivered = type === "delivered";

  const columns: ColumnsType<Product> = [
    {
      title: "PRODUCT",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div className="flex items-center gap-3">
          <Image
            src={record.image}
            alt={record.name}
            className="w-12 h-12 object-contain"
          />
          <span className="text-white">{text}</span>
        </div>
      ),
    },
    {
      title: "PRICE",
      dataIndex: "price",
      key: "price",
      render: (text) => <span className="text-white">{text}</span>,
    },
    {
      title: "QUANTITY",
      dataIndex: "quantity",
      key: "quantity",
      render: (qty) => <span className="text-white">x{qty}</span>,
    },
    {
      title: "SUBTOTAL",
      dataIndex: "subtotal",
      key: "subtotal",
      render: (text) => (
        <span className="text-white font-semibold">{text}</span>
      ),
    },
  ];

  // Add Feedback column only for delivered products
  if (isDelivered) {
    columns.push({
      title: "FEEDBACK",
      key: "feedback",
      render: () => (
        <Button
          type="primary"
          style={{
            backgroundColor: "#00FF00",
            borderColor: "#00FF00",
            color: "black",
          }}
        >
          Review
        </Button>
      ),
    });
  }

  return (
    <div className="bg-black p-6 rounded-lg border border-gray-700 max-w-4xl mx-auto mt-8">
      <h3 className={`text-yellow-500 font-semibold mb-4`}>
        {isDelivered ? "Delivered" : "Processing"}
      </h3>
      <Table
        columns={columns}
        dataSource={products}
        rowKey="id"
        pagination={false}
        className="bg-black"
        bordered={false}
        style={{ borderColor: "#D9A94F" }}
        scroll={{ x: true }}
        // Customize table header style
        components={{
          header: {
            cell: (props: any) => (
              <th
                {...props}
                className="bg-yellow-600 text-white text-left"
                style={{ padding: "12px" }}
              >
                {props.children}
              </th>
            ),
          },
        }}
      />
    </div>
  );
}
