"use client";

import ProductCard from "@/components/ProductCard/ProductCard";
import CustomHeading from "@/components/utils/CustomHeading";
import { useGetAllProductsQuery } from "@/redux/features/products/productsApi";
import { Spin } from "antd";

type LatestDataType = {
  _id: string;
  images: { id: string; publicFileURL: string }[];
  name: string;
  price: string;
  avgRating: number;
  stockStatus: string;
  quantity: string;
};

export default function LatestProducts() {
  const { data, isLoading } = useGetAllProductsQuery({});

  const latestData: LatestDataType[] = data?.data || [];
  const limitedLatestData = latestData?.slice(0, 8);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" className="mt-20" />
      </div>
    );
  }

  return (
    <div className="md:p-4 my-20">
      <CustomHeading>Latest Products</CustomHeading>
      <div className="flex flex-wrap gap-6 justify-center">
        {limitedLatestData.length === 0 ? (
          <div className="text-lg font-semibold text-white">
            No latest products found!!
          </div>
        ) : (
          limitedLatestData?.map((product: LatestDataType) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}
