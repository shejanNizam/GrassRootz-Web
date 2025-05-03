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

export default function PopularPoducts() {
  const { data, isLoading } = useGetAllProductsQuery(
    [
      { name: "popular", value: "10" },
      { name: "page", value: "1" },
      { name: "limit", value: "10" },
    ]
    // Object.entries(query)
    //   .filter((item) => item[1])
    //   .map(([key, value]) => ({
    //     name: key,
    //     value: value,
    //   }))
  );
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
      <CustomHeading> Popular Products </CustomHeading>
      <div className="flex flex-wrap gap-6 justify-center">
        {popularData?.length === 0 ? (
          <>
            <div className=" text-lg font-semibold  ">
              No latest products found!
            </div>
          </>
        ) : (
          popularData?.map((product: PopularDataType) => (
            <ProductCard key={product?._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}
