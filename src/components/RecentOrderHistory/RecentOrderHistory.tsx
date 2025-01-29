"use client";

import { Table } from "antd";
import Link from "next/link";

export default function RecentOrderHistory() {
  const columns = [
    {
      title: "ORDER ID",
      dataIndex: "orderId",
      key: "orderId",
      render: (text: string) => <span className="text-white">{text}</span>,
    },
    {
      title: "DATE",
      dataIndex: "date",
      key: "date",
      render: (text: string) => <span className="text-white">{text}</span>,
    },
    {
      title: "TOTAL",
      dataIndex: "total",
      key: "total",
      render: (text: string) => (
        <span className="text-white font-semibold">{text}</span>
      ),
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (text: string) => (
        <span
          className={text === "Processing" ? "text-gray-300" : "text-white"}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Action",
      dataIndex: "details",
      key: "details",
      render: () => <Link href={`/`}>View Details</Link>,
    },
  ];

  const data = [
    {
      key: "1",
      orderId: "#738",
      date: "8 Sep, 2020",
      total: "$135.00 (5 Products)",
      status: "Processing",
    },
    {
      key: "2",
      orderId: "#703",
      date: "24 May, 2020",
      total: "$25.00 (1 Product)",
      status: "Completed",
    },
    {
      key: "3",
      orderId: "#130",
      date: "22 Oct, 2020",
      total: "$250.00 (4 Products)",
      status: "Completed",
    },
    {
      key: "4",
      orderId: "#561",
      date: "1 Feb, 2020",
      total: "$35.00 (1 Product)",
      status: "Processing",
    },
    {
      key: "5",
      orderId: "#536",
      date: "21 Sep, 2020",
      total: "$578.00 (13 Products)",
      status: "Completed",
    },
    {
      key: "6",
      orderId: "#492",
      date: "22 Oct, 2020",
      total: "$345.00 (7 Products)",
      status: "Completed",
    },
  ];

  return (
    <div className="bg-black text-white p-6 rounded-lg border border-gray-700">
      <h3 className="text-lg font-semibold mb-4">Recent Order History</h3>
      <div className="overflow-x-auto">
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          className="bg-gray-900 rounded-lg"
          rowClassName={(record) =>
            record.status === "Processing"
              ? "bg-gray-700 text-white"
              : "bg-black text-white"
          }
          scroll={{ x: 600 }} // Ensures mobile responsiveness
        />
      </div>
    </div>
  );
}
