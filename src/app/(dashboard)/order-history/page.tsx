"use client";

import { Table } from "antd";
import { useRouter } from "next/navigation";

export default function OrderHistory() {
  const router = useRouter();

  const columns = [
    {
      title: "ORDER ID",
      dataIndex: "orderId",
      key: "orderId",
      _id: 24,
      render: (text: string) => <span className="text-white">{text}</span>,
    },
    {
      title: "DATE",
      dataIndex: "date",
      key: "date",
      _id: 24,
      render: (text: string) => <span className="text-white">{text}</span>,
    },
    {
      title: "TOTAL",
      dataIndex: "total",
      key: "total",
      _id: 24,
      render: (text: string) => (
        <span className="text-white font-semibold">{text}</span>
      ),
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      _id: 24,
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
      _id: 24,
      // render: () => (
      //   <a href="#" className="text-yellow-400 hover:underline">
      //     View Details
      //   </a>
      // ),
      render: (_: any, record: any) => (
        <span
          onClick={() => router.push(`/order-history/${record._id}`)}
          className="text-yellow-400 hover:underline cursor-pointer"
        >
          View Details
        </span>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      _id: 241,
      orderId: "#738",
      date: "8 Sep, 2020",
      total: "$135.00 (5 Products)",
      status: "Processing",
    },
    {
      key: "2",
      _id: 242,
      orderId: "#5045",
      date: "27 Mar, 2021",
      total: "$25.00 (1 Product)",
      status: "Completed",
    },
    {
      key: "3",
      _id: 243,
      orderId: "#5028",
      date: "20 Mar, 2021",
      total: "$250.00 (4 Products)",
      status: "Processing",
    },
    {
      key: "4",
      _id: 244,
      orderId: "#4600",
      date: "19 Mar, 2021",
      total: "$35.00 (1 Product)",
      status: "Completed",
    },
    {
      key: "5",
      _id: 245,
      orderId: "#4152",
      date: "18 Mar, 2021",
      total: "$578.00 (13 Products)",
      status: "Completed",
    },
    {
      key: "6",
      _id: 246,
      orderId: "#6811",
      date: "10 Mar, 2021",
      total: "$345.00 (7 Products)",
      status: "Completed",
    },
    {
      key: "7",
      _id: 247,
      orderId: "#3536",
      date: "5 Mar, 2021",
      total: "$560.00 (2 Products)",
      status: "Completed",
    },
    {
      key: "8",
      _id: 248,
      orderId: "#3174",
      date: "2 Mar, 2021",
      total: "$560.00 (2 Products)",
      status: "Completed",
    },
    {
      key: "9",
      _id: 249,
      orderId: "#7791",
      date: "25 Feb, 2021",
      total: "$560.00 (2 Products)",
      status: "Completed",
    },
    {
      key: "10",
      _id: 240,
      orderId: "#4848",
      date: "24 Feb, 2021",
      total: "$23.00 (1 Product)",
      status: "Completed",
    },
    {
      key: "11",
      _id: 2411,
      orderId: "#5648",
      date: "20 Feb, 2021",
      total: "$23.00 (1 Product)",
      status: "Completed",
    },
    {
      key: "12",
      _id: 2422,
      orderId: "#1577",
      date: "12 Oct, 2020",
      total: "$23.00 (1 Product)",
      status: "Completed",
    },
  ];

  return (
    <div className="bg-black text-white p-6 rounded-lg border border-gray-700">
      <h3 className="text-lg font-semibold mb-4">Order History</h3>
      <div className="overflow-x-auto">
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 8, position: ["bottomCenter"] }} // Shows 6 orders per page
          className="bg-gray-900 rounded-lg"
          rowClassName={(record) =>
            record.status === "Processing"
              ? "bg-gray-700 text-white"
              : "bg-black text-white"
          }
          scroll={{ x: 600 }} // Ensures responsiveness
        />
      </div>
    </div>
  );
}
