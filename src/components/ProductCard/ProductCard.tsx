"use client";

import NoProduct from "@/assets/shop/no_product.png";
import { useCartWishlist } from "@/context/CartWishlistContext";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import image_latest_product from "../../assets/home/latest_products/latest_product_img.png";

const baseIamgeUrl = process.env.NEXT_PUBLIC_IMAGE_URL;

type Product = {
  _id: string;
  images: { id: string; publicFileURL: string | StaticImageData }[];
  name: string;
  price: string;
  avgRating: number;
  stockStatus: string;
  quantity: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const {
    addToCart,
    removeFromCart,
    isInCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useCartWishlist();

  const [imgError, setImgError] = useState(false);

  const imageSrc = imgError
    ? NoProduct
    : product?.images?.length > 0
    ? (baseIamgeUrl ?? "") + product.images[0].publicFileURL
    : image_latest_product;

  const inCart = isInCart(product._id);
  const inWishlist = isInWishlist(product._id);

  const handleCartClick = () => {
    if (product.stockStatus !== "in-stock") return;

    if (inCart) {
      removeFromCart(product._id);
    } else {
      addToCart({
        id: product._id,
        name: product.name,
        price: parseFloat(product.price),
        stockStatus: product.stockStatus,
        // image: imageSrc instanceof StaticImageData ? "" : imageSrc,
        image: typeof imageSrc === "string" ? imageSrc : "",
      });
    }
  };

  const handleHeartClick = () => {
    if (inWishlist) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist({
        id: product._id,
        name: product.name,
        price: parseFloat(product.price),
        stockStatus: product.stockStatus,
        // image: imageSrc instanceof StaticImageData ? "" : imageSrc,
        image: typeof imageSrc === "string" ? imageSrc : "",
      });
    }
  };

  return (
    <div
      key={product._id}
      className="w-80 h-80 rounded-lg overflow-hidden bg-black border border-primary shadow-md hover:shadow-2xl transition-transform duration-300 relative"
      style={{ minHeight: "288px" }}
    >
      <div className="absolute top-2 right-2 flex gap-3 z-10">
        <button
          onClick={handleHeartClick}
          className={`p-2 rounded-full ${
            inWishlist ? "bg-red-600 text-white" : "bg-gray-300 text-gray-600"
          }`}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <FaHeart size={16} />
        </button>
      </div>

      <Link href={`/shop/${product._id}`}>
        <Image
          src={imageSrc}
          alt={product.name}
          width={240}
          height={192}
          className="w-full h-48 object-cover rounded-t-lg"
          onError={() => setImgError(true)}
        />
      </Link>

      <div className="p-2">
        <div className="flex justify-between items-start">
          <h4 className="text-lg text-white font-semibold line-clamp-1">
            {product.name}
          </h4>
          <button
            className={`${
              product.stockStatus === "in-stock"
                ? inCart
                  ? "bg-primary text-white"
                  : "bg-gray-300 text-gray-600"
                : "bg-gray-400 cursor-not-allowed"
            } text-white p-2 rounded-full transition-colors duration-200`}
            onClick={handleCartClick}
            disabled={product.stockStatus !== "in-stock"}
            aria-label={inCart ? "Remove from cart" : "Add to cart"}
          >
            <FaShoppingCart size={16} />
          </button>
        </div>
        <p className="text-sm text-white my-1 line-clamp-1">${product.price}</p>
        <div className="flex justify-between items-center">
          <div
            className={`text-sm font-semibold ${
              Number(product?.quantity) > 0 ? "text-green-500" : "text-red-500"
            } line-clamp-1`}
          >
            {Number(product?.quantity) > 0
              ? `In Stock (${product.quantity})`
              : "Out of Stock"}
          </div>

          <div className="text-sm text-yellow-200 line-clamp-1">
            {"★".repeat(Math.floor(product.avgRating)) +
              "☆".repeat(5 - Math.floor(product.avgRating))}
          </div>
        </div>
      </div>
    </div>
  );
}
