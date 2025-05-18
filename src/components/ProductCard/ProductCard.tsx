// import Image, { StaticImageData } from "next/image";
// import Link from "next/link";
// import { useReducer, useState } from "react";
// import { FaHeart, FaShoppingCart } from "react-icons/fa";
// import image_latest_product from "../../assets/home/latest_products/latest_product_img.png";
// import NoProduct from "@/assets/shop/no_product.png"; // Import your fallback image here
// import { intialState, reducer } from "../Home/LatestProducts/states";

// const baseIamgeUrl = process.env.NEXT_PUBLIC_IMAGE_URL;

// type Product = {
//   _id: string;
//   images: { id: string; publicFileURL: string | StaticImageData }[];
//   name: string;
//   price: string;
//   avgRating: number;
//   stockStatus: string;
// };

// export default function ProductCard({ product }: { product: Product }) {
//   const [todos, dispatch] = useReducer(reducer, intialState);
//   const [imgError, setImgError] = useState(false);

//   // Compose image source URL or fallback images
//   let imageSrc;

//   if (imgError) {
//     // If error triggered, use NoProduct fallback image (StaticImageData)
//     imageSrc = NoProduct;
//   } else if (product?.images?.length > 0) {
//     imageSrc = (baseIamgeUrl ?? "") + product.images[0].publicFileURL;
//   } else {
//     // If no images, fallback to your existing default latest product image
//     imageSrc = image_latest_product;
//   }

//   return (
//     <>
//       <div
//         key={product._id}
//         className="w-60 rounded-lg overflow-hidden bg-black border border-primary shadow-md hover:shadow-2xl transition-transform duration-300 relative"
//       >
//         <div className="absolute top-2 right-2 flex gap-3 z-10">
//           <button
//             onClick={() => dispatch({ type: "HeartClick" })}
//             className={`p-2 rounded-full ${
//               todos?.isHeartClick
//                 ? "bg-red-500 text-white"
//                 : "bg-gray-300 text-gray-600"
//             }`}
//           >
//             <FaHeart size={16} />
//           </button>
//         </div>

//         <Link href={`/shop/${1}`}>
//           <Image
//             src={imageSrc}
//             alt={product.name}
//             width={1000}
//             height={1000}
//             className="w-full h-48 object-cover rounded-t-lg"
//             onError={() => setImgError(true)}
//           />
//         </Link>

//         <div className="p-4">
//           <div className="flex justify-between items-start">
//             <h4 className="text-lg text-white font-semibold">{product.name}</h4>
//             <button
//               className={`${
//                 todos?.isCartClick ? "bg-primary" : "bg-gray-400"
//               } text-white p-2 rounded-full transition-colors duration-200`}
//               onClick={() => dispatch({ type: "cartClick" })}
//               style={{
//                 display:
//                   product.stockStatus === "in-stock" ? "inline-block" : "none",
//               }}
//             >
//               <FaShoppingCart size={16} />
//             </button>
//           </div>
//           <p className="text-sm text-white my-2">$ {product.price}</p>
//           <div className="flex justify-between items-center">
//             <div
//               className={`text-sm font-semibold ${
//                 product.stockStatus === "in-stock"
//                   ? "text-green-500"
//                   : "text-red-500"
//               }`}
//             >
//               {product.stockStatus}
//             </div>
//             <div className="text-sm text-yellow-200">
//               {"★".repeat(Math.floor(product.avgRating))}
//               {"☆".repeat(5 - Math.floor(product.avgRating))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useReducer, useState } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import image_latest_product from "../../assets/home/latest_products/latest_product_img.png";
import NoProduct from "@/assets/shop/no_product.png"; // Import your fallback image here
import { intialState, reducer } from "../Home/LatestProducts/states";

const baseIamgeUrl = process.env.NEXT_PUBLIC_IMAGE_URL;

type Product = {
  _id: string;
  images: { id: string; publicFileURL: string | StaticImageData }[];
  name: string;
  price: string;
  avgRating: number;
  stockStatus: string;
  quantity:string
};

export default function ProductCard({ product }: { product: Product }) {
  const [todos, dispatch] = useReducer(reducer, intialState);
  const [imgError, setImgError] = useState(false);

  // Compose image source URL or fallback images
  let imageSrc;

  if (imgError) {
    // If error triggered, use NoProduct fallback image (StaticImageData)
    imageSrc = NoProduct;
  } else if (product?.images?.length > 0) {
    imageSrc = (baseIamgeUrl ?? "") + product.images[0].publicFileURL;
  } else {
    // If no images, fallback to your existing default latest product image
    imageSrc = image_latest_product;
  }

  return (
    <>
      <div
        key={product._id}
        className="w-80 h-80 rounded-lg overflow-hidden bg-black border border-primary shadow-md hover:shadow-2xl transition-transform duration-300 relative"
        style={{ minHeight: "288px" }} // Ensure minimum height for consistency
      >
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

        <Link href={`/shop/${product._id}`}>
          <Image
            src={imageSrc}
            alt={product.name}
            width={240} // Match card width
            height={192} // Fixed height for image (adjust as needed)
            className="w-full h-48 object-cover rounded-t-lg"
            onError={() => setImgError(true)}
          />
        </Link>

        <div className="p-2"> {/* Reduced padding to fit content */}
          <div className="flex justify-between items-start">
            <h4 className="text-lg text-white font-semibold line-clamp-1">
              {product.name}
            </h4>
            <button
              className={`${
                todos?.isCartClick ? "bg-primary" : "bg-gray-400"
              } text-white p-2 rounded-full transition-colors duration-200`}
              onClick={() => dispatch({ type: "cartClick" })}
              style={{
                display:
                  product.stockStatus === "in-stock" ? "inline-block" : "none",
              }}
            >
              <FaShoppingCart size={16} />
            </button>
          </div>
          <p className="text-sm text-white my-1 line-clamp-1">$ {product.price}</p>
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
    </>
  );
}