"use client";

import ProductCard from "@/components/ProductCard/ProductCard";
import CustomHeading from "@/components/utils/CustomHeading";
import { useGetAllProductsQuery } from "@/redux/features/products/productsApi";
import { Spin } from "antd";

type PopularDataType = {
  _id: string;
  images: { id: string; publicFileURL: string }[];
  name: string;
  price: string;
  avgRating: number;
  stockStatus: string;
  quantity: string;
};

export default function PopularProducts() {
  const { data, isLoading } = useGetAllProductsQuery({ popular: 8 });

  const popularData: PopularDataType[] = data?.data || [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="md:p-4">
      <CustomHeading>Popular Products</CustomHeading>
      <div className="flex flex-wrap gap-6 justify-center">
        {popularData.length === 0 ? (
          <div className="text-lg font-semibold text-white">
            No popular products found!
          </div>
        ) : (
          popularData.map((product: PopularDataType) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}
