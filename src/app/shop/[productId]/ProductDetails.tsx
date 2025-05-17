

// "use client";

// import { useState, useEffect } from "react";
// import { InputNumber, Rate, Select, Spin } from "antd";
// import Image from "next/image";
// import { useParams } from "next/navigation";
// import { useGetProductDetailsQuery } from "@/redux/features/products/productsApi";
// import NoProduct from "@/assets/shop/no_product.png";
// const { Option } = Select;

// export default function ProductDetails() {
//   const params = useParams();
//   const productId = Array.isArray(params.productId) ? params.productId[0] : params.productId;

//   const { data, isLoading, error } = useGetProductDetailsQuery({ productId: productId ?? "" });

//   const [quantity, setQuantity] = useState(1);
//   const [selectedColor, setSelectedColor] = useState("");
//   const [selectedSize, setSelectedSize] = useState("");
//   const [mainImage, setMainImage] = useState("");
// console.log(mainImage, "mainImage");
//   // Initialize selected values and main image when data loads or product changes
//   useEffect(() => {
//     if (data?.data) {
//       const product = data.data;

//       if (product.color && product.color.length > 0) setSelectedColor(product.color[0]);
//       else setSelectedColor("");

//       if (product.size && product.size.length > 0) setSelectedSize(product.size[0]);
//       else setSelectedSize("");

//       if (product.images && product.images.length > 0) setMainImage(product.images[0].publicFileURL);
//       else setMainImage("");
//     }
//   }, [data]);

//   if (isLoading) return <Spin size="large" className="m-10" />;
//   if (error) return <div>Error loading product details.</div>;
//   if (!data?.data) return <div>Product not found.</div>;

//   const product = data.data;
//   const price = Number(product.price) || 0;
//   const thumbnails = product.images || [];
// console.log(thumbnails, "thumbnails");
//   const colors = product.color || [];
//   const sizes = product.size || [];
//   const totalPrice = price * quantity;

//   return (
//     <div>
//       <div className="bg-black text-white flex items-start justify-center py-20">
//         <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
//           {/* Thumbnails and Main Image */}
//           <div className="flex gap-4 justify-center md:justify-start">
//             <div className="flex flex-col gap-4">
//               {thumbnails.map((thumb: any) => (
//                 <Image
//                   key={thumb.id}
//                  //!SECTION src={`$${thumb?.publicFileURL}`}
//                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${thumb?.publicFileURL}`}
//                   alt={product.name}
//                   width={100}
//                   height={100}
//                   className={`w-24 h-24 border object-cover cursor-pointer ${
//                     mainImage === thumb.publicFileURL ? "border-yellow-500" : "border-gray-200"
//                   }`}
//                   onClick={() => setMainImage(thumb.publicFileURL)}
//                 />
//               ))}
//             </div>
//             {/* <div className="flex-1">
//               {mainImage ? (
//                 <Image
//                   src={mainImage}
//                   alt={product.name}
//                   className="w-full h-full object-cover"
//                   style={{ maxHeight: "calc(3 * 6rem + 2 * 1rem)" }}
//                   width={600}
//                   height={600}
//                 />
//               ) : (
//                 <div className="w-full h-96 bg-gray-700 flex items-center justify-center text-gray-300">
//                   No Image Available
//                 </div>
//               )}
//             </div> */}
//             <div className="flex-1">
//   {mainImage ? (
//     <Image
                
//                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${mainImage}`}
//       alt={product.name}
//       className="w-full h-full object-cover"
//       style={{ maxHeight: "calc(3 * 6rem + 2 * 1rem)" }}
//       width={600}
//       height={600}
//     />
//   ) : (
//     <Image
//       src={NoProduct}
//       alt="No product available"
//       className="w-full h-full object-contain"
//       width={600}
//       height={600}
//     />
//   )}
// </div>

//           </div>

//           {/* Product Info */}
//           <div className="px-2 md:px-0">
//             <h1 className="text-3xl font-semibold mb-2">{product.name}</h1>

//             <div className="flex items-center mb-4">
//               <Rate disabled defaultValue={Number(product.avgRating) || 0} style={{ color: "#faad14" }} />
//               <span className="ml-2 text-sm text-gray-300">({product.totalReviews} Reviews)</span>
//             </div>

//             <p className="text-xl text-primary font-bold">${price.toFixed(2)}</p>
//             <div className="border-b border-gray-700 mb-2" />

//             <p className="text-xl mb-2">
//               Brand: <span className="font-bold text-primary">{product.brandName || "N/A"}</span>
//             </p>

//             <div className="flex flex-wrap gap-6 items-center">
//               <div>
//                 <label className="block text-sm mb-1 font-semibold text-gray-300">Available Sizes:</label>
//                 <Select value={selectedSize} onChange={setSelectedSize} className="w-40">
//                   {sizes.length > 0 ? (
//                     sizes.map((size: string) => (
//                       <Option value={size} key={size}>
//                         {size.toUpperCase()}
//                       </Option>
//                     ))
//                   ) : (
//                     <Option disabled>No sizes available</Option>
//                   )}
//                 </Select>
//               </div>

//               <div>
//                 <label className="block text-sm mb-1 font-semibold text-gray-300">Available Colors:</label>
//                 <Select value={selectedColor} onChange={setSelectedColor} className="w-40">
//                   {colors.length > 0 ? (
//                     colors.map((color: string) => (
//                       <Option value={color} key={color}>
//                         {color.charAt(0).toUpperCase() + color.slice(1)}
//                       </Option>
//                     ))
//                   ) : (
//                     <Option disabled>No colors available</Option>
//                   )}
//                 </Select>
//               </div>

//               <div>
//                 <label className="block text-sm mb-1 font-semibold text-gray-300">Quantity:</label>
//                 <InputNumber min={1} value={quantity} onChange={(val) => val !== null && setQuantity(val)} className="w-20" />
//               </div>
//             </div>

//             <p className="text-2xl font-bold my-6">
//               Total: <span className="text-primary">${totalPrice.toLocaleString()}</span>
//             </p>

//             <div className="flex flex-col sm:flex-row gap-4">
//               <button className="w-[80%] px-4 py-2 bg-primary text-white rounded-full shadow-md hover:bg-red-400 transition-all duration-200">
//                 Order Now
//               </button>
//               <button className="w-[80%] px-4 py-2 bg-white text-primary rounded-full shadow-md hover:bg-red-400 transition-all duration-200">
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { InputNumber, Rate, Select, Spin, Button, Tooltip } from "antd";
import { Image } from "antd";
import { useParams } from "next/navigation";
import { useGetProductDetailsQuery } from "@/redux/features/products/productsApi";
import NoProduct from "@/assets/shop/no_product.png";
import { ShoppingCartOutlined, HeartOutlined } from "@ant-design/icons";
import ProductTabs from "./PoductTabs";

; // Import ProductTabs here

const { Option } = Select;

export default function ProductDetails() {
  const params = useParams();
  const productId = Array.isArray(params.productId) ? params.productId[0] : params.productId;

  const { data, isLoading, error } = useGetProductDetailsQuery({ productId: productId ?? "" });

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    if (data?.data) {
      const product = data.data;

      if (product.color && product.color.length > 0) setSelectedColor(product.color[0]);
      else setSelectedColor("");

      if (product.size && product.size.length > 0) setSelectedSize(product.size[0]);
      else setSelectedSize("");

      if (product.images && product.images.length > 0) setMainImage(product.images[0].publicFileURL);
      else setMainImage("");
    }
  }, [data]);

  if (isLoading) return <Spin size="large" className="m-10" />;
  if (error) return <div>Error loading product details.</div>;
  if (!data?.data) return <div>Product not found.</div>;

  const product = data.data;
  const price = Number(product.price) || 0;
  const thumbnails = product.images || [];
  const colors = product.color || [];
  const sizes = product.size || [];
  const totalPrice = price * quantity;

  const inStock = product.stockStatus === "in-stock";

  return (
    <div className="bg-black text-white py-20">
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
                  mainImage === thumb.publicFileURL ? "border-yellow-500" : "border-transparent"
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
            <Rate disabled defaultValue={Number(product.avgRating) || 0} style={{ color: "#fbbf24" }} />
            <span className="text-yellow-400 font-medium">{product.totalReviews} Review{product.totalReviews !== 1 && "s"}</span>
          </div>

          <p className="text-3xl font-extrabold mb-8">${price.toFixed(2)}</p>

          <div className="mb-6 flex gap-6 items-center">
            <span className="font-semibold text-gray-400">Brand:</span>
            <span className="font-semibold">{product.brandName || "N/A"}</span>
          </div>

          <div className="mb-6">
            <span className="font-semibold text-gray-400">Available Size:</span>
            <div className="mt-2 flex gap-2 flex-wrap">
              {sizes.length > 0 ? (
                sizes.map((size: string) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 rounded-md border ${
                      selectedSize === size ? "bg-yellow-400 text-black border-yellow-400" : "border-gray-600 text-white"
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
            <span className="font-semibold text-gray-400">Available Colors:</span>
            <div className="mt-2 flex gap-2 flex-wrap">
              {colors.length > 0 ? (
                colors.map((color: string) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1 rounded-md border ${
                      selectedColor === color ? "bg-yellow-400 text-black border-yellow-400" : "border-gray-600 text-white"
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
              <span className="text-yellow-400 font-extrabold text-2xl">${totalPrice.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="primary" size="large" className="flex-1 font-bold">
              Order Now
            </Button>
            <Button
              type="default"
              size="large"
              className="flex-1 font-bold"
              onClick={() => {
                // Add your add to cart logic here
              }}
              icon={<ShoppingCartOutlined />}
            >
              Add to Cart
            </Button>
            <Tooltip title="Add to favorites">
              <Button
                type="default"
                size="large"
                shape="circle"
                icon={<HeartOutlined />}
                onClick={() => {
                  // Add your favorite logic here
                }}
              />
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Pass product data to ProductTabs */}
      <div className="mt-20 max-w-4xl mx-auto">
        <ProductTabs product={product} />
      </div>
    </div>
  );
}

