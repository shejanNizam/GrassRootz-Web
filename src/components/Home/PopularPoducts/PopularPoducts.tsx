"use client";

import ProductCard from "@/components/ProductCard/ProductCard";
import CustomHeading from "@/components/utils/CustomHeading";
import { useGetAllProductsQuery } from "@/redux/features/products/productsApi";
import { Spin } from "antd";

// const mockData = [
//   {
//     _id: "1", // Changed from 'id' to '_id' for consistency with real data
//     images: [
//       {
//         id: "1",
//         publicFileURL: popular_latest_product, // Assuming the image path or reference is correct
//       },
//     ],
//     name: "Fresh Indian Malta",
//     price: "20.00", // Changed price to string for consistency
//     avgRating: 4.0, // Renamed 'rating' to 'avgRating' to match real data
//     stockStatus: "in-stock", // Changed 'status' to 'stockStatus' and lowercase it
//   },
//   {
//     _id: "2",
//     images: [
//       {
//         id: "2",
//         publicFileURL: popular_latest_product,
//       },
//     ],
//     name: "Fresh Indian Malta",
//     price: "20.00",
//     avgRating: 4.0,
//     stockStatus: "out-of-stock", // Changed to match real data format
//   },
//   {
//     _id: "3",
//     images: [
//       {
//         id: "3",
//         publicFileURL: popular_latest_product,
//       },
//     ],
//     name: "Chinese Cabbage",
//     price: "12.00",
//     avgRating: 4.7,
//     stockStatus: "in-stock",
//   },
//   {
//     _id: "4",
//     images: [
//       {
//         id: "4",
//         publicFileURL: popular_latest_product,
//       },
//     ],
//     name: "Green Lettuce",
//     price: "9.00",
//     avgRating: 4.3,
//     stockStatus: "out-of-stock",
//   },
//   {
//     _id: "5",
//     images: [
//       {
//         id: "5",
//         publicFileURL: popular_latest_product,
//       },
//     ],
//     name: "Eggplant",
//     price: "34.00",
//     avgRating: 4.2,
//     stockStatus: "in-stock",
//   },
//   {
//     _id: "6",
//     images: [
//       {
//         id: "6",
//         publicFileURL: popular_latest_product,
//       },
//     ],
//     name: "Big Potatoes",
//     price: "20.00",
//     avgRating: 4.4,
//     stockStatus: "in-stock",
//   },
//   {
//     _id: "7",
//     images: [
//       {
//         id: "7",
//         publicFileURL: popular_latest_product,
//       },
//     ],
//     name: "Corn",
//     price: "20.00",
//     avgRating: 4.1,
//     stockStatus: "in-stock",
//   },
//   {
//     _id: "8",
//     images: [
//       {
//         id: "8",
//         publicFileURL: popular_latest_product,
//       },
//     ],
//     name: "Fresh Cauliflower",
//     price: "12.00",
//     avgRating: 4.6,
//     stockStatus: "in-stock",
//   },
//   {
//     _id: "9",
//     images: [
//       {
//         id: "9",
//         publicFileURL: popular_latest_product,
//       },
//     ],
//     name: "Green Capsicum",
//     price: "9.00",
//     avgRating: 4.0,
//     stockStatus: "in-stock",
//   },
//   {
//     _id: "10",
//     images: [
//       {
//         id: "10",
//         publicFileURL: popular_latest_product,
//       },
//     ],
//     name: "Green Chili",
//     price: "34.00",
//     avgRating: 3.8,
//     stockStatus: "in-stock",
//   },
// ];

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
      <div className="text-center">
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
        {/* {mockData?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))} */}
      </div>
    </div>
  );
}
