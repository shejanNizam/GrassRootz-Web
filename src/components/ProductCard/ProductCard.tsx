import Image, { StaticImageData } from "next/image";
import { useReducer } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { intialState, reducer } from "../Home/LatestProducts/states";

type Product = {
  id: string;
  name: string;
  price: string;
  image: string | StaticImageData;
  rating: number;
  status: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const [todos, dispatch] = useReducer(reducer, intialState);

  return (
    <>
      <div
        key={product.id}
        className="w-60 rounded-lg overflow-hidden bg-black border border-primary shadow-md hover:shadow-xl transition-transform duration-300 relative"
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

        <Image
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="p-4">
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-semibold">{product.name}</h4>
            <button
              className={`${
                todos?.isCartClick ? "bg-primary" : "bg-gray-400"
              } text-white p-2 rounded-full transition-colors duration-200`}
              onClick={() => dispatch({ type: "cartClick" })}
              style={{
                display:
                  product.status === "Out of Stock" ? "none" : "inline-block",
              }}
            >
              <FaShoppingCart size={16} />
            </button>
          </div>
          <p className="text-sm my-2">{product.price}</p>
          <div className="flex justify-between items-center">
            <div
              className={`text-sm font-semibold ${
                product.status === "Out of Stock"
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {product.status}
            </div>
            <div className="text-sm text-yellow-500">
              {"★".repeat(Math.floor(product.rating))}
              {"☆".repeat(5 - Math.floor(product.rating))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
