// "use client";

// import ProductCard from "@/components/ProductCard/ProductCard";
// import CustomHeading from "@/components/utils/CustomHeading";
// import { useGetAllProductsQuery, useGetCategoriesQuery } from "@/redux/features/products/productsApi";
// import { Radio, Slider, Spin, Empty, Pagination } from "antd";
// import { useState, useMemo, useCallback } from "react";
// import Image from "next/image";
// import NoProduct from "@/assets/shop/no_product.png";

// function ProductCardWithFallback({ product }: { product: any }) {
//   const [imgError, setImgError] = useState(false);
//   const fallbackImageUrl = NoProduct;
//   const imageUrl =
//     !imgError && product.images && product.images.length > 0
//       ? product.images[0].publicFileURL
//       : "../../assets/shop/no_product.png";

//   const handleImgError = useCallback(() => {
//     setImgError(true);
//   }, []);

//   return (
//     <ProductCard
//       product={{
//         ...product,
//         price: product.price.toString(),
//         images: [{ publicFileURL: imageUrl }],
//       }}
//       key={product._id}
//       onError={handleImgError}
//     />
//   );
// }

// export default function Shop() {
//   const [priceRange, setPriceRange] = useState<[number, number]>([50, 2000000]);
//   const [selectedCategory, setSelectedCategory] = useState<string>("All");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize] = useState(10); // Matches the API's default limit

//   // Pass filters to the API query including pagination
//   const { data: productData, error, isLoading } = useGetAllProductsQuery({
//     search: searchQuery,
//     categories: selectedCategory === "All" ? [] : [selectedCategory],
//     page: currentPage,
//     limit: pageSize,
//   });
//   const { data: categoryData, isLoading: categoriesLoading } = useGetCategoriesQuery();

//   // Extract categories from API response or fallback empty array
//   const categories = categoryData?.data ?? [];

//   // Extract pagination info
//   const paginationInfo = productData?.pagination || {
//     totalPage: 1,
//     currentPage: 1,
//     totalItem: 0,
//   };

//   const handlePriceChange = (value: number[]) => {
//     setPriceRange(value as [number, number]);
//   };

//   const handleCategoryChange = (e: any) => {
//     setSelectedCategory(e.target.value);
//     setCurrentPage(1); // Reset to first page when category changes
//   };

//   const resetPrice = () => {
//     setPriceRange([50, 1500]);
//   };

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(e.target.value);
//     setCurrentPage(1); // Reset to first page when search changes
//   };

//   // Client-side filtering for price range only
//   const filteredProducts = useMemo(() => {
//     if (!productData?.data) return [];

//     return productData.data.filter((product: any) => {
//       const price = Number(product.price);
//       const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
//       return matchesPrice;
//     });
//   }, [productData, priceRange]);

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//   };

//   return (
//     <div className="mb-20">
//       <div className="text-center pt-8 md:pt-32">
//         <CustomHeading> Shop now </CustomHeading>
//         <div className="mx-auto max-w-sm md:max-w-xl mt-20">
//           <div className="relative w-80 md:w-full">
//             <input
//               placeholder="Search products"
//               value={searchQuery}
//               onChange={handleSearch}
//               className="w-full px-4 py-2 md:py-3 text-white bg-transparent border-2 border-yellow-400 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-300 shadow-md transition-all duration-200 pr-10"
//             />
//             {searchQuery && (
//               <button
//                 onClick={() => setSearchQuery("")}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white transition-colors duration-200 font-bold"
//               >
//                 ✕
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="pt-10 bg-black flex flex-col md:flex-row gap-6 container mx-auto px-4 md:px-0 z-20">
//         {/* Category Filter Section */}
//         <div className="w-full md:w-1/4 p-4 md:p-8 text-white rounded-lg shadow-lg">
//           <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-yellow-400">
//             Filters
//           </h2>

//           {/* Categories Filter */}
//           <div className="mb-4 md:mb-6">
//             <h3 className="font-medium text-base md:text-lg mb-2 md:mb-3 text-white">
//               All Categories
//             </h3>
//             {categoriesLoading ? (
//               <Spin />
//             ) : (
//               <Radio.Group value={selectedCategory} onChange={handleCategoryChange}>
//                 <ul className="space-y-2">
//                   <li>
//                     <Radio value="All">
//                       <span className="text-white"> All </span>
//                     </Radio>
//                   </li>
//                   {categories?.map((cat) => (
//                     <li key={cat._id}>
//                       <Radio value={cat.name}>
//                         <span className="text-white">{cat.name}</span>
//                       </Radio>
//                     </li>
//                   ))}
//                 </ul>
//               </Radio.Group>
//             )}
//           </div>

//           {/* Price Range Slider */}
//           <div className="mb-4 md:mb-6">
//             <h3 className="font-semibold text-base md:text-lg mb-2 md:mb-3 text-yellow-400">
//               Price
//             </h3>
//             <Slider
//               range
//               min={50}
//               max={2000}
//               step={1}
//               value={priceRange}
//               onChange={handlePriceChange}
//               tipFormatter={(value) => `$${value}`}
//               trackStyle={[{ backgroundColor: "yellow" }]}
//               handleStyle={[
//                 { backgroundColor: "yellow", borderColor: "yellow" },
//                 { backgroundColor: "yellow", borderColor: "yellow" },
//               ]}
//               style={{ marginBottom: 10 }}
//             />
//             <div className="flex justify-between mt-1 md:mt-3">
//               <span className="text-sm md:text-base">
//                 Price: ${priceRange[0]} — ${priceRange[1]}
//               </span>
//             </div>
//           </div>

//           {/* Reset Price Button */}
//           <button
//             onClick={resetPrice}
//             className="w-full mt-4 md:mt-6 bg-yellow-400 text-black py-2 md:py-3 px-4 md:px-6 rounded-full shadow-md hover:bg-red-400 transition-all duration-200 text-sm md:text-base"
//           >
//             Reset Price
//           </button>
//         </div>

//         {/* Product Grid */}
//         <div className="w-full md:w-3/4 flex flex-col">
//           <div className="flex flex-wrap gap-6 justify-center">
//             {isLoading ? (
//               <Spin size="large" />
//             ) : error ? (
//               <Empty description="Failed to load products." />
//             ) : filteredProducts.length === 0 ? (
//               <div className="flex flex-col items-center justify-center gap-4">
//                 <Image
//                   src={NoProduct}
//                   alt="No Products"
//                   width={200}
//                   height={200}
//                   className="object-contain"
//                   priority
//                 />
//                 <p className="text-white text-lg">No products found.</p>
//               </div>
//             ) : (
//               filteredProducts.map((product: any) => (
//                 <ProductCardWithFallback key={product._id} product={product} />
//               ))
//             )}
//           </div>

//           {/* Pagination Controls */}
//           {paginationInfo.totalItem > 0 && (
//             <div className="flex justify-center mt-8">
//               <Pagination
//                 current={currentPage}
//                 total={paginationInfo.totalItem}
//                 pageSize={pageSize}
//                 onChange={handlePageChange}
//                 showSizeChanger={false}
//                 className="ant-pagination-custom"
//               />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// Shop.tsx
// "use client";

// import ProductCard from "@/components/ProductCard/ProductCard";
// import CustomHeading from "@/components/utils/CustomHeading";
// import { useGetAllProductsQuery, useGetCategoriesQuery } from "@/redux/features/products/productsApi";
// import { Radio, Slider, Spin, Empty, Pagination } from "antd";
// import { useState, useMemo, useCallback } from "react";
// import Image from "next/image";
// import NoProduct from "@/assets/shop/no_product.png";

// function ProductCardWithFallback({ product }: { product: any }) {
//   const [imgError, setImgError] = useState(false);
//   const fallbackImageUrl = NoProduct;
//   const imageUrl =
//     !imgError && product.images && product.images.length > 0
//       ? product.images[0].publicFileURL
//       : "../../assets/shop/no_product.png";

//   const handleImgError = useCallback(() => {
//     setImgError(true);
//   }, []);

//   return (
//     <ProductCard
//       product={{
//         ...product,
//         price: product.price.toString(),
//         images: [{ publicFileURL: imageUrl }],
//       }}
//       key={product._id}
//       onError={handleImgError}
//     />
//   );
// }

// export default function Shop() {
//   const [priceRange, setPriceRange] = useState<[number, number]>([50, 2000000]);
//   const [selectedCategory, setSelectedCategory] = useState<string>("All");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize] = useState(9); // Changed to 9 products per page

//   // Pass filters to the API query including pagination
//   const { data: productData, error, isLoading } = useGetAllProductsQuery({
//     search: searchQuery,
//     categories: selectedCategory === "All" ? [] : [selectedCategory],
//     page: currentPage,
//     limit: pageSize,
//   });
//   const { data: categoryData, isLoading: categoriesLoading } = useGetCategoriesQuery();

//   // Extract categories from API response or fallback empty array
//   const categories = categoryData?.data ?? [];

//   // Extract pagination info
//   const paginationInfo = productData?.pagination || {
//     totalPage: 1,
//     currentPage: 1,
//     totalItem: 0,
//   };

//   const handlePriceChange = (value: number[]) => {
//     setPriceRange(value as [number, number]);
//   };

//   const handleCategoryChange = (e: any) => {
//     setSelectedCategory(e.target.value);
//     setCurrentPage(1); // Reset to first page when category changes
//   };

//   const resetPrice = () => {
//     setPriceRange([50, 1500]);
//   };

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(e.target.value);
//     setCurrentPage(1); // Reset to first page when search changes
//   };

//   // Client-side filtering for price range only
//   const filteredProducts = useMemo(() => {
//     if (!productData?.data) return [];

//     return productData.data.filter((product: any) => {
//       const price = Number(product.price);
//       const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
//       return matchesPrice;
//     });
//   }, [productData, priceRange]);

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//   };

//   return (
//     <div className="mb-20">
//       <div className="text-center pt-8 md:pt-32">
//         <CustomHeading> Shop now </CustomHeading>
//         <div className="mx-auto max-w-sm md:max-w-xl mt-20">
//           <div className="relative w-80 md:w-full">
//             <input
//               placeholder="Search products"
//               value={searchQuery}
//               onChange={handleSearch}
//               className="w-full px-4 py-2 md:py-3 text-white bg-transparent border-2 border-yellow-400 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-300 shadow-md transition-all duration-200 pr-10"
//             />
//             {searchQuery && (
//               <button
//                 onClick={() => setSearchQuery("")}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white transition-colors duration-200 font-bold"
//               >
//                 ✕
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="pt-10 bg-black flex flex-col md:flex-row gap-6 container mx-auto px-4 md:px-0 z-20">
//         {/* Category Filter Section */}
//         <div className="w-full md:w-1/4 p-4 md:p-8 text-white rounded-lg shadow-lg">
//           <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-yellow-400">
//             Filters
//           </h2>

//           {/* Categories Filter */}
//           <div className="mb-4 md:mb-6">
//             <h3 className="font-medium text-base md:text-lg mb-2 md:mb-3 text-white">
//               All Categories
//             </h3>
//             {categoriesLoading ? (
//               <Spin />
//             ) : (
//               <Radio.Group value={selectedCategory} onChange={handleCategoryChange}>
//                 <ul className="space-y-2">
//                   <li>
//                     <Radio value="All">
//                       <span className="text-white"> All </span>
//                     </Radio>
//                   </li>
//                   {categories?.map((cat) => (
//                     <li key={cat._id}>
//                       <Radio value={cat.name}>
//                         <span className="text-white">{cat.name}</span>
//                       </Radio>
//                     </li>
//                   ))}
//                 </ul>
//               </Radio.Group>
//             )}
//           </div>

//           {/* Price Range Slider */}
//           <div className="mb-4 md:mb-6">
//             <h3 className="font-semibold text-base md:text-lg mb-2 md:mb-3 text-yellow-400">
//               Price
//             </h3>
//             <Slider
//               range
//               min={50}
//               max={2000}
//               step={1}
//               value={priceRange}
//               onChange={handlePriceChange}
//               tipFormatter={(value) => `$${value}`}
//               trackStyle={[{ backgroundColor: "yellow" }]}
//               handleStyle={[
//                 { backgroundColor: "yellow", borderColor: "yellow" },
//                 { backgroundColor: "yellow", borderColor: "yellow" },
//               ]}
//               style={{ marginBottom: 10 }}
//             />
//             <div className="flex justify-between mt-1 md:mt-3">
//               <span className="text-sm md:text-base">
//                 Price: ${priceRange[0]} — ${priceRange[1]}
//               </span>
//             </div>
//           </div>

//           {/* Reset Price Button */}
//           <button
//             onClick={resetPrice}
//             className="w-full mt-4 md:mt-6 bg-yellow-400 text-black py-2 md:py-3 px-4 md:px-6 rounded-full shadow-md hover:bg-red-400 transition-all duration-200 text-sm md:text-base"
//           >
//             Reset Price
//           </button>
//         </div>

//         {/* Product Grid */}
//         <div className="w-full md:w-3/4 flex flex-col">
//           <div className="flex flex-wrap gap-6 justify-center">
//             {isLoading ? (
//               <Spin size="large" />
//             ) : error ? (
//               <Empty description="Failed to load products." />
//             ) : filteredProducts.length === 0 ? (
//               <div className="flex flex-col items-center justify-center gap-4">
//                 <Image
//                   src={NoProduct}
//                   alt="No Products"
//                   width={200}
//                   height={200}
//                   className="object-contain"
//                   priority
//                 />
//                 <p className="text-white text-lg">No products found.</p>
//               </div>
//             ) : (
//               filteredProducts.map((product: any) => (
//                 <ProductCardWithFallback key={product._id} product={product} />
//               ))
//             )}
//           </div>

//           {/* Pagination Controls */}
//           {paginationInfo.totalItem > 0 && (
//             <div className="flex justify-center mt-8">
//               <Pagination
//                 current={currentPage}
//                 total={paginationInfo.totalItem}
//                 pageSize={pageSize}
//                 onChange={handlePageChange}
//                 showSizeChanger={false}
//                 className="ant-pagination-custom"
//               />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import NoProduct from "@/assets/shop/no_product.png";
import ProductCard from "@/components/ProductCard/ProductCard";
import CustomHeading from "@/components/utils/CustomHeading";
import {
  useGetAllProductsQuery,
  useGetCategoriesQuery,
} from "@/redux/features/products/productsApi";
import { Empty, Pagination, Radio, Slider, Spin } from "antd";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";

function ProductCardWithFallback({ product }: { product: any }) {
  const [imgError, setImgError] = useState(false);
  const fallbackImageUrl = NoProduct;
  const imageUrl =
    !imgError && product.images && product.images.length > 0
      ? product.images[0].publicFileURL
      : "../../assets/shop/no_product.png";

  const handleImgError = useCallback(() => {
    setImgError(true);
  }, []);

  return (
    <ProductCard
      product={{
        ...product,
        price: product.price.toString(),
        images: [{ publicFileURL: imageUrl }],
      }}
      key={product._id}
      // onError={handleImgError}
    />
  );
}

export default function Shop() {
  const [priceRange, setPriceRange] = useState<[number, number]>([50, 2000000]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(9); // Fixed at 9 products per page

  // Pass filters to the API query including pagination
  const {
    data: productData,
    error,
    isLoading,
  } = useGetAllProductsQuery({
    search: searchQuery,
    categories: selectedCategory === "All" ? [] : [selectedCategory],
    page: currentPage,
    limit: pageSize,
  });
  console.log(productData, "---------><");
  const { data: categoryData, isLoading: categoriesLoading } =
    useGetCategoriesQuery();

  // Extract categories from API response or fallback empty array
  const categories = categoryData?.data ?? [];

  // Extract pagination info
  const paginationInfo = productData?.pagination || {
    totalPage: 1,
    currentPage: 1,
    totalItem: 0,
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value as [number, number]);
  };

  const handleCategoryChange = (e: any) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1); // Reset to first page when category changes
  };

  const resetPrice = () => {
    setPriceRange([50, 1500]);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when search changes
  };

  // Client-side filtering for price range with pagination respect
  const filteredProducts = useMemo(() => {
    if (!productData?.data) return [];

    console.log("Raw API Data:", productData.data); // Debug: Log raw API data
    console.log("Price Range:", priceRange); // Debug: Log current price range

    // Apply price range filter
    const priceFiltered = productData.data.filter((product: any) => {
      const price = Number(product.price);
      const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
      return matchesPrice;
    });

    // console.log("Filtered Products Count:", priceFiltered.length); // Debug: Log filtered count

    // Paginate the filtered results to ensure 9 per page
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return priceFiltered.slice(startIndex, endIndex);
  }, [productData, priceRange, currentPage, pageSize]);

  console.log(filteredProducts, "filteredProducts");

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="mb-20">
      <div className="text-center pt-8 md:pt-32">
        <CustomHeading> Shop now </CustomHeading>
        <div className="mx-auto max-w-sm md:max-w-xl mt-20">
          <div className="relative w-80 md:w-full">
            <input
              placeholder="Search products"
              value={searchQuery}
              onChange={handleSearch}
              className="w-full px-4 py-2 md:py-3 text-white bg-transparent border-2 border-yellow-400 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-300 shadow-md transition-all duration-200 pr-10"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white transition-colors duration-200 font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="pt-10 bg-black flex flex-col md:flex-row gap-6 container mx-auto px-4 md:px-0 z-20">
        {/* Category Filter Section */}
        <div className="w-full md:w-1/4 p-4 md:p-8 text-white rounded-lg shadow-lg">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-yellow-400">
            Filters
          </h2>

          {/* Categories Filter */}
          <div className="mb-4 md:mb-6">
            <h3 className="font-medium text-base md:text-lg mb-2 md:mb-3 text-white">
              All Categories
            </h3>
            {categoriesLoading ? (
              <Spin />
            ) : (
              <Radio.Group
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <ul className="space-y-2">
                  <li>
                    <Radio value="All">
                      <span className="text-white"> All </span>
                    </Radio>
                  </li>
                  {categories?.map((cat) => (
                    <li key={cat._id}>
                      <Radio value={cat.name}>
                        <span className="text-white">{cat.name}</span>
                      </Radio>
                    </li>
                  ))}
                </ul>
              </Radio.Group>
            )}
          </div>

          {/* Price Range Slider */}
          <div className="mb-4 md:mb-6">
            <h3 className="font-semibold text-base md:text-lg mb-2 md:mb-3 text-yellow-400">
              Price
            </h3>
            <Slider
              range
              min={50}
              max={2000}
              step={1}
              value={priceRange}
              onChange={handlePriceChange}
              tipFormatter={(value) => `$${value}`}
              trackStyle={[{ backgroundColor: "yellow" }]}
              handleStyle={[
                { backgroundColor: "yellow", borderColor: "yellow" },
                { backgroundColor: "yellow", borderColor: "yellow" },
              ]}
              style={{ marginBottom: 10 }}
            />
            <div className="flex justify-between mt-1 md:mt-3">
              <span className="text-sm md:text-base">
                Price: ${priceRange[0]} — ${priceRange[1]}
              </span>
            </div>
          </div>

          {/* Reset Price Button */}
          <button
            onClick={resetPrice}
            className="w-full mt-4 md:mt-6 bg-yellow-400 text-black py-2 md:py-3 px-4 md:px-6 rounded-full shadow-md hover:bg-red-400 transition-all duration-200 text-sm md:text-base"
          >
            Reset Price
          </button>
        </div>

        {/* Product Grid */}
        <div className="w-full md:w-3/4 flex flex-col">
          <div className="flex flex-wrap gap-6 justify-center">
            {isLoading ? (
              <Spin size="large" />
            ) : error ? (
              <Empty description="Failed to load products." />
            ) : filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-4">
                <Image
                  src={NoProduct}
                  alt="No Products"
                  width={200}
                  height={200}
                  className="object-contain"
                  priority
                />
                <p className="text-white text-lg">No products found.</p>
              </div>
            ) : (
              filteredProducts.map((product: any) => (
                <ProductCardWithFallback key={product._id} product={product} />
              ))
            )}
          </div>

          {/* Pagination Controls */}
          {paginationInfo.totalItem > 0 && (
            <div className="flex justify-center mt-8">
              <Pagination
                current={currentPage}
                total={paginationInfo.totalItem}
                pageSize={pageSize}
                onChange={handlePageChange}
                showSizeChanger={false}
                className="ant-pagination-custom"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
