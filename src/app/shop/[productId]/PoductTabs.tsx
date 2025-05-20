// import { Tabs } from "antd";

// export default function ProductTabs() {
//   const items = [
//     {
//       key: "1",
//       label: (
//         <span className="text-white text-xl font-bold hover:text-primary">
//           Additional Information
//         </span>
//       ),
//       children: (
//         <div className="text-white bg-black p-4 rounded-lg">
//           <p>
//             <strong>Weight:</strong> 0.01 kg
//           </p>
//           <p>
//             <strong>Category:</strong> Cloth
//           </p>
//           <p>
//             <strong>Stock Status:</strong> Available (5,413)
//           </p>
//           <h4 className="mt-4 font-semibold">Features:</h4>
//           <ul className="list-disc list-inside">
//             <li>
//               Made from 100% soft cotton or a cotton blend, providing
//               breathability and comfort all day long.
//             </li>
//             <li>Regular/relaxed fit that flatters all body types.</li>
//             <li>Minimalist design with a crew neck and short sleeves.</li>
//             <li>
//               Pre-shrunk fabric to maintain its shape and size after every wash.
//             </li>
//             <li>Available in multiple colors and sizes to suit your style.</li>
//           </ul>
//           <h4 className="mt-4 font-semibold"> {"Why You'll Love It:"} </h4>
//           <p>
//             This T-shirt combines timeless style with superior comfort, making
//             it a wardrobe essential.
//           </p>
//         </div>
//       ),
//     },
//     {
//       key: "2",
//       label: (
//         <span className="text-white text-xl font-bold hover:text-primary">
//           Customer Feedback
//         </span>
//       ),
//       children: (
//         <div className="text-white bg-black p-4 rounded-lg">
//           <div className="border-b pb-2 mb-2">
//             <h4 className="font-semibold">Kristin Watson</h4>
//             <p>★★★★★</p>
//             <p>Duis at ullamcorper nulla, eu dictum eros.</p>
//             <p className="text-sm text-gray-400">2 min ago</p>
//           </div>
//           <div className="border-b pb-2 mb-2">
//             <h4 className="font-semibold">Jane Cooper</h4>
//             <p>★★★★☆</p>
//             <p>
//               Keep the soil evenly moist for the healthiest growth. If the sun
//               gets too hot, Chinese cabbage tends to bolt or go to seed.
//             </p>
//             <p className="text-sm text-gray-400">30 Apr, 2021</p>
//           </div>
//           <div>
//             <h4 className="font-semibold">Ralph Edwards</h4>
//             <p>★★★★★</p>
//             <p>
//               200+ Canton Pak Choi Bok Choy Chinese Cabbage Seeds Heirloom
//               Non-GMO Productive Brassica rapa.
//             </p>
//             <p className="text-sm text-gray-400">2 min ago</p>
//           </div>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <div className="w-full max-w-2xl mx-auto">
//       <Tabs
//         defaultActiveKey="1"
//         items={items}
//         className="bg-black text-white rounded-lg"
//       />
//     </div>
//   );
// }

"use client";

import NoImage from "@/assets/NoImage.png";
import { Image, Rate, Tabs } from "antd";
type User = {
  name: string;
  email: string;
  image: string;
};

type Review = {
  rating: string;
  message: string;
  user: User;
  createdAt: string;
};

type Product = {
  weight: string | null;
  category: string;
  quantity: string;
  stockStatus: string;
  description: string;
  reviews: Review[];
};

type ProductTabsProps = {
  product: Product;
};

export default function ProductTabs({ product }: ProductTabsProps) {
  const items = [
    {
      key: "1",
      label: (
        <span className="text-white text-xl font-bold hover:text-primary">
          Additional Information
        </span>
      ),
      children: (
        <div className="text-white bg-black p-4 rounded-lg">
          <p>
            <strong>Weight:</strong> {product?.weight ?? "N/A"}
          </p>
          <p>
            <strong>Category:</strong> {product?.category}
          </p>
          <p>
            <strong>Stock Status:</strong>{" "}
            {Number(product?.quantity) <= 0 ? (
              <span className="bg-red-600 text-red-100 rounded-full px-2 py-1 text-xs font-semibold mr-2 mb-2">
                Out of stock
              </span>
            ) : (
              <span className="text-green-500">
                Available ({product?.quantity})
              </span>
            )}
          </p>

          {/* <h4 className="mt-4 font-semibold">Description:</h4> */}
          <div
            className="mt-8 whitespace-pre-line border border-gray-300 rounded p-4"
            dangerouslySetInnerHTML={{
              __html: product?.description || "No description available.",
            }}
          ></div>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <span className="text-white text-xl font-bold hover:text-primary">
          Customer Feedback
        </span>
      ),
      children: (
        <div className="text-white bg-black p-4 rounded-lg">
          {product?.reviews.length === 0 && <p>No reviews yet.</p>}
          {product?.reviews.map((review, idx) => (
            <div key={idx} className="border-b pb-4 mb-4 flex gap-4">
              <Image
                width={50}
                height={50}
                src={
                  review.user.image
                    ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${review.user.image}`
                    : undefined
                }
                alt={review.user.name}
                fallback={NoImage.src}
                className="rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold">{review.user.name}</h4>
                <Rate
                  disabled
                  defaultValue={Number(review.rating)}
                  style={{ color: "#fbbf24" }}
                />
                <p>{review.message}</p>
                <p className="text-sm text-gray-400">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Tabs
        defaultActiveKey="1"
        items={items}
        className="bg-black text-white rounded-lg"
      />
    </div>
  );
}
