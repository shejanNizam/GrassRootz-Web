"use client";

import ProductCard from "@/components/ProductCard/ProductCard";
import CustomHeading from "@/components/utils/CustomHeading";
import popular_latest_product from "../../../assets/home/popular_products/popular_product_img.png";

const mockData = [
  {
    id: "1",
    name: "Fresh Indian Malta",
    price: "$20.00",
    image: popular_latest_product,
    rating: 4.0,
    status: "In Stock",
  },
  {
    id: "2",
    name: "Fresh Indian Malta",
    price: "$20.00",
    image: popular_latest_product,
    rating: 4.0,
    status: "Out of Stock",
  },
  {
    id: "3",
    name: "Chinese Cabbage",
    price: "$12.00",
    image: popular_latest_product,
    rating: 4.7,
    status: "In Stock",
  },
  {
    id: "4",
    name: "Green Lettuce",
    price: "$9.00",
    image: popular_latest_product,
    rating: 4.3,
    status: "Out of Stock",
  },
  {
    id: "5",
    name: "Eggplant",
    price: "$34.00",
    image: popular_latest_product,
    rating: 4.2,
    status: "In Stock",
  },
  {
    id: "6",
    name: "Big Potatoes",
    price: "$20.00",
    image: popular_latest_product,
    rating: 4.4,
    status: "In Stock",
  },
  {
    id: "7",
    name: "Corn",
    price: "$20.00",
    image: popular_latest_product,
    rating: 4.1,
    status: "In Stock",
  },
  {
    id: "8",
    name: "Fresh Cauliflower",
    price: "$12.00",
    image: popular_latest_product,
    rating: 4.6,
    status: "In Stock",
  },
  {
    id: "9",
    name: "Green Capsicum",
    price: "$9.00",
    image: popular_latest_product,
    rating: 4.0,
    status: "In Stock",
  },
  {
    id: "10",
    name: "Green Chili",
    price: "$34.00",
    image: popular_latest_product,
    rating: 3.8,
    status: "In Stock",
  },
];

export default function PopularPoducts() {
  return (
    <div className="md:p-4">
      <CustomHeading> Popular Products </CustomHeading>
      <div className="flex flex-wrap gap-6 justify-center">
        {mockData?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
