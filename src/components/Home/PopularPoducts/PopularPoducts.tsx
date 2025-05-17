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
};

export default function PopularProducts() {
  const { data, isLoading } = useGetAllProductsQuery({ popular: 8 });

  const popularData: PopularDataType[] = data?.data || [];

  if (isLoading) {
    return (
      <div className="text-center min-h-screen">
        <Spin size="large" className="mt-20" />
      </div>
    );
  }

  return (
    <div className="md:p-4">
      <CustomHeading>Popular Products</CustomHeading>
      <div className="flex flex-wrap gap-6 justify-center">
        {popularData.length === 0 ? (
          <div className="text-lg font-semibold">No popular products found!</div>
        ) : (
          popularData.map((product: PopularDataType) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}
