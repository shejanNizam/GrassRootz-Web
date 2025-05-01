"use client";

import ProductCard from "@/components/ProductCard/ProductCard";
import CustomHeading from "@/components/utils/CustomHeading";
import { useGetAllProductsQuery } from "@/redux/features/products/productsApi";
import image_latest_product from "../../../assets/home/latest_products/latest_product_img.png";

const mockData = [
  {
    id: "1",
    name: "Fresh Indian Malta",
    price: "$20.00",
    image: image_latest_product,
    rating: 4.0,
    status: "In Stock",
  },
  {
    id: "2",
    name: "Fresh Indian Malta",
    price: "$20.00",
    image: image_latest_product,
    rating: 4.0,
    status: "Out of Stock",
  },
  {
    id: "3",
    name: "Chinese Cabbage",
    price: "$12.00",
    image: image_latest_product,
    rating: 4.7,
    status: "In Stock",
  },
  {
    id: "4",
    name: "Green Lettuce",
    price: "$9.00",
    image: image_latest_product,
    rating: 4.3,
    status: "Out of Stock",
  },
  {
    id: "5",
    name: "Eggplant",
    price: "$34.00",
    image: image_latest_product,
    rating: 4.2,
    status: "In Stock",
  },
  {
    id: "6",
    name: "Big Potatoes",
    price: "$20.00",
    image: image_latest_product,
    rating: 4.4,
    status: "In Stock",
  },
  {
    id: "7",
    name: "Corn",
    price: "$20.00",
    image: image_latest_product,
    rating: 4.1,
    status: "In Stock",
  },
  {
    id: "8",
    name: "Fresh Cauliflower",
    price: "$12.00",
    image: image_latest_product,
    rating: 4.6,
    status: "In Stock",
  },
  {
    id: "9",
    name: "Green Capsicum",
    price: "$9.00",
    image: image_latest_product,
    rating: 4.0,
    status: "In Stock",
  },
  {
    id: "10",
    name: "Green Chili",
    price: "$34.00",
    image: image_latest_product,
    rating: 3.8,
    status: "In Stock",
  },
];

// const query = {
//   page: 1,
//   limit: 10,
//   color: "red",
//   name: "apple",
//   brandName: "brand",
//   stockStatus: "In Stock",
//   lowPrice: 10,
//   highPrice: 100,
//   latest: true,
//   popular: false,
// };
// console.log(
//   Object.entries(query)
//     .filter((item) => item[1])
//     .map(([key, value]) => ({
//       name: key,
//       value: value,
//     }))
// );

export default function LatestProducts() {
  // const [query, setQuery] = useState({});

  const { data } = useGetAllProductsQuery(
    [{ name: "page", value: "10" }]
    // Object.entries(query)
    //   .filter((item) => item[1])
    //   .map(([key, value]) => ({
    //     name: key,
    //     value: value,
    //   }))
  );
  console.log(data);

  return (
    <div className="md:p-4 my-20">
      <CustomHeading>Latest Products</CustomHeading>
      <div className="flex flex-wrap gap-6 justify-center">
        {mockData?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
