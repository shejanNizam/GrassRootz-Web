"use client";

import NoProduct from "@/assets/shop/no_product.png";
import { useCartWishlist } from "@/context/CartWishlistContext";
import { useGetProductDetailsQuery } from "@/redux/features/products/productsApi";
import { Button, Image, InputNumber, Rate, Select, Spin, Tooltip } from "antd";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaHeart, FaShoppingCart } from "react-icons/fa";
import image_latest_product from "../../../assets/home/latest_products/latest_product_img.png";
import RelatedProducts from "../RelatedProducts";
import ProductTabs from "./PoductTabs";

const baseIamgeUrl = process.env.NEXT_PUBLIC_IMAGE_URL;

const { Option } = Select;

export default function ProductDetails() {
  const router = useRouter();
  const params = useParams();
  const productId = Array.isArray(params.productId)
    ? params.productId[0]
    : params.productId;

  const {
    addToCart,
    removeFromCart,
    isInCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useCartWishlist();

  const [imgError, setImgError] = useState(false);

  const { data, isLoading, error } = useGetProductDetailsQuery({
    productId: productId ?? "",
  });

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    if (data?.data) {
      const product = data.data;

      if (product.color && product.color.length > 0)
        setSelectedColor(product.color[0]);
      else setSelectedColor("");

      if (product.size && product.size.length > 0)
        setSelectedSize(product.size[0]);
      else setSelectedSize("");

      if (product.images && product.images.length > 0)
        setMainImage(product.images[0].publicFileURL);
      else setMainImage("");
    }
  }, [data]);

  if (isLoading)
    return (
      <Spin
        size="large"
        className=" flex justify-center items-center min-h-screen"
      />
    );
  if (error) return <div>Error loading product details.</div>;
  if (!data?.data) return <div>Product not found.</div>;

  const product = data.data;
  const price = Number(product.price) || 0;
  const thumbnails = product.images || [];
  const colors = product.color || [];
  const sizes = product.size || [];
  const totalPrice = price * quantity;

  const inStock = product.stockStatus === "in-stock";

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
    <>
      <div className="bg-black text-white py-20">
        <div className="md:ml-96 ml-4 my-4  ">
          <FaArrowLeft
            onClick={() => router.back()}
            className="text-primary hover:bg-gray-700 rounded-full cursor-pointer"
            size={24}
          />
        </div>
        <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* LEFT: thumbnails + main image */}
          <div className="flex gap-6">
            <div className="flex flex-col gap-4">
              {thumbnails.map((thumb: any) => (
                <Image
                  key={thumb.id}
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${thumb.publicFileURL}`}
                  alt={product.name}
                  width={80}
                  height={80}
                  className={`border-2 rounded cursor-pointer object-cover ${
                    mainImage === thumb.publicFileURL
                      ? "border-yellow-500"
                      : "border-transparent"
                  }`}
                  onClick={() => setMainImage(thumb.publicFileURL)}
                />
              ))}
            </div>

            <div className="flex-1 max-h-[480px] overflow-hidden rounded-md">
              {mainImage ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${mainImage}`}
                  alt={product.name}
                  width={480}
                  height={480}
                  className="object-contain w-full h-full"
                />
              ) : (
                <Image
                  src={NoProduct.src}
                  alt="No product available"
                  width={480}
                  height={480}
                  className="object-contain w-full h-full"
                />
              )}
            </div>
          </div>

          {/* RIGHT: product details */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-3xl font-bold">{product.name}</h1>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold  ${
                Number(product?.quantity) > 0
                  ? "bg-green-600 text-green-100"
                  : "bg-red-600 text-red-100"
              }`}
            >
              {Number(product?.quantity) > 0 ? `In Stock ` : "Out of Stock"}
            </span>
            <div className="flex items-center gap-3 mb-6 mt-4">
              <Rate
                disabled
                defaultValue={Number(product.avgRating) || 0}
                style={{ color: "#fbbf24" }}
              />
              <span className="text-yellow-400 font-medium">
                {product.totalReviews} Review{product.totalReviews !== 1 && "s"}
              </span>
            </div>

            <p className="text-3xl font-extrabold mb-8">${price.toFixed(2)}</p>

            <div className="mb-6 flex gap-6 items-center">
              <span className="font-semibold text-gray-400">Brand:</span>
              <span className="font-semibold">
                {product.brandName || "N/A"}
              </span>
            </div>

            <div className="mb-6">
              <span className="font-semibold text-gray-400">
                Available Size:
              </span>
              <div className="mt-2 flex gap-2 flex-wrap">
                {sizes.length > 0 ? (
                  sizes.map((size: string) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1 rounded-md border ${
                        selectedSize === size
                          ? "bg-yellow-400 text-black border-yellow-400"
                          : "border-gray-600 text-white"
                      } cursor-pointer`}
                    >
                      {size.toUpperCase()}
                    </button>
                  ))
                ) : (
                  <span className="text-gray-500">No sizes available</span>
                )}
              </div>
            </div>

            <div className="mb-6">
              <span className="font-semibold text-gray-400">
                Available Colors:
              </span>
              <div className="mt-2 flex gap-2 flex-wrap">
                {colors.length > 0 ? (
                  colors.map((color: string) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1 rounded-md border ${
                        selectedColor === color
                          ? "bg-yellow-400 text-black border-yellow-400"
                          : "border-gray-600 text-white"
                      } cursor-pointer`}
                    >
                      {color.charAt(0).toUpperCase() + color.slice(1)}
                    </button>
                  ))
                ) : (
                  <span className="text-gray-500">No colors available</span>
                )}
              </div>
            </div>

            <div className="mb-8 flex items-center gap-10">
              <div>
                <span className="font-semibold text-gray-400">Quantity:</span>
                <InputNumber
                  min={1}
                  value={quantity}
                  onChange={(val) => val !== null && setQuantity(val)}
                  className="ml-4"
                  style={{ width: 80 }}
                />
              </div>

              <div>
                <span className="font-semibold text-gray-400 mr-2">Total:</span>
                <span className="text-yellow-400 font-extrabold text-2xl">
                  ${totalPrice.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="primary" size="large" className="flex-1 font-bold">
                Order Now
              </Button>
              <Tooltip title={inCart ? "Remove from cart" : "Add to cart"}>
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
                >
                  <FaShoppingCart size={16} />
                </button>
              </Tooltip>
              <Tooltip
                title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
              >
                <button
                  onClick={handleHeartClick}
                  className={`p-2 rounded-full ${
                    inWishlist
                      ? "bg-red-600 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  <FaHeart size={16} />
                </button>
              </Tooltip>
            </div>
          </div>
        </div>

        {/* Pass product data to ProductTabs */}
        <div className="mt-20 max-w-4xl mx-auto">
          <ProductTabs product={product} />
        </div>
      </div>

      {/* related products */}
      <div className=" mb-12 ">
        <RelatedProducts product={product} />
      </div>
    </>
  );
}
