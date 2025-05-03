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
};

export default function LatestProducts() {
  // const [query, setQuery] = useState({});

  const { data, isLoading } = useGetAllProductsQuery(
    [{ name: "latest", value: "10" }]
    // Object.entries(query)
    //   .filter((item) => item[1])
    //   .map(([key, value]) => ({
    //     name: key,
    //     value: value,
    //   }))
  );
  const latestData: LatestDataType[] = data?.data || [];
  console.log("------Latest Products----------->>", latestData);

  if (isLoading) {
    return (
      <div className="text-center">
        <Spin size="large" className="mt-20" />
      </div>
    );
  }

  return (
    <div className="md:p-4 my-20">
      <CustomHeading>Latest Products</CustomHeading>
      <div className="flex flex-wrap gap-6 justify-center">
        {latestData?.length === 0 ? (
          <>
            <div className=" text-lg font-semibold  ">
              No latest products found!
            </div>
          </>
        ) : (
          latestData?.map((product: LatestDataType) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}
