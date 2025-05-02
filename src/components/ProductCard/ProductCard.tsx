import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useReducer } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { intialState, reducer } from "../Home/LatestProducts/states";
import image_latest_product from "../../assets/home/latest_products/latest_product_img.png";

const baseIamgeUrl = process.env.NEXT_PUBLIC_IMAGE_URL;

type Product = {
  _id: string;
  images: { id: string; publicFileURL: string | StaticImageData }[];
  name: string;
  price: string;
  avgRating: number;
  stockStatus: string;
};

// const mockData: {
//   id: string;
//   images: { id: string; publicFileURL: string }[];
//   name: string;
//   price: string;
//   avgRating: number;
//   stockStatus: string;
// }[] = [];

export default function ProductCard({ product }: { product: Product }) {
  const [todos, dispatch] = useReducer(reducer, intialState);

  return (
    <>
      <div
        key={product._id}
        className="w-60 rounded-lg overflow-hidden bg-black border border-primary shadow-md hover:shadow-2xl transition-transform duration-300 relative"
      >
        {/* Icon buttons on the top-right */}
        <div className="absolute top-2 right-2 flex gap-3 z-10">
          <button
            onClick={() => dispatch({ type: "HeartClick" })}
            className={`p-2 rounded-full ${
              todos?.isHeartClick
                ? "bg-red-500 text-white"
                : "bg-gray-300 text-gray-600"
            }`}
          >
            <FaHeart size={16} />
          </button>
        </div>

        <Link href={`/shop/${1}`}>
          <Image
            src={
              product?.images?.length > 0
                ? (baseIamgeUrl ?? "") + product?.images[0]?.publicFileURL
                : image_latest_product
            }
            alt={product?.name}
            width={1000}
            height={1000}
            className="w-full h-48 object-cover rounded-t-lg"
          />
        </Link>
        <div className="p-4">
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-semibold">{product?.name}</h4>
            <button
              className={`${
                todos?.isCartClick ? "bg-primary" : "bg-gray-400"
              } text-white p-2 rounded-full transition-colors duration-200`}
              onClick={() => dispatch({ type: "cartClick" })}
              style={{
                display: product.avgRating === 0 ? "none" : "inline-block",
              }}
            >
              <FaShoppingCart size={16} />
            </button>
          </div>
          <p className="text-sm my-2">$ {product.price}</p>
          <div className="flex justify-between items-center">
            <div
              className={`text-sm font-semibold ${
                product.stockStatus === "in-stock"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {product.stockStatus}
            </div>
            <div className="text-sm text-yellow-500">
              {"★".repeat(Math.floor(product?.avgRating))}
              {"☆".repeat(5 - Math.floor(product?.avgRating))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
