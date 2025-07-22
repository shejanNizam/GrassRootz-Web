"use client";

import { useGetAllOrderHistoryQuery } from "@/redux/features/order/orderApi";
import { Table } from "antd";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

export default function OrderHistory() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const { data: orderListData } = useGetAllOrderHistoryQuery([]);
  console.log(orderListData);

  const data =
    orderListData?.data?.map((order: any) => ({
      key: order._id,
      _id: order._id,
      orderId: order.transactionId || order._id,
      date: new Date(order.createdAt).toLocaleDateString(),
      total: `$${order.totalPrice.toFixed(2)} (${order?.productList?.length} ${
        order?.productList?.length > 1 ? "Products" : "Product"
      })`,
      status: order.status,
      product: order.productList,
    })) || [];

  const columns = [
    {
      title: "ORDER ID",
      dataIndex: "orderId",
      key: "orderId",
      render: (text: string) => (
        <span className="text-white">{text.slice(0, 7) + "..."}</span>
      ),
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
          className={
            text.toLowerCase() === "pending" ? "text-red-600" : "text-green-600"
          }
        >
          {text}
        </span>
      ),
    },

    {
      title: "Action",
      key: "details",
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

  return (
    <div className="min-h-screen">
      <div className="bg-black text-white p-4 sm:p-6 rounded-lg border border-gray-700 mx-2 sm:mx-0">
        <h3 className="text-xl sm:text-2xl text-primary font-bold mb-4 flex justify-start items-center gap-2">
          <FaArrowLeft onClick={handleBack} className="cursor-pointer" />
          Order History
        </h3>

        <div className="flex items-center justify-center p-4">
          <div className="w-full mx-auto bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <Table
              columns={columns}
              dataSource={data}
              rowKey="id"
              pagination={{
                pageSize: 5,
                position: ["bottomCenter"],
              }}
              className="bg-primary px-1 py-2 text-white rounded-lg"
              scroll={{ x: 600 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
