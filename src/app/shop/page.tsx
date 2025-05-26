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
    />
  );
}

export default function Shop() {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000000]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(9);

  const {
    data: productData,
    isError,
    isLoading,
  } = useGetAllProductsQuery({
    search: searchQuery,
    categories: selectedCategory === "All" ? [] : [selectedCategory],
    page: currentPage,
    limit: pageSize,
  });

  const { data: categoryData, isLoading: categoriesLoading } =
    useGetCategoriesQuery();

  const categories = categoryData?.data ?? [];

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
    setCurrentPage(1);
  };

  const resetPrice = () => {
    setPriceRange([0, 2000000]);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const filteredProducts = useMemo(() => {
    if (!productData?.data) return [];

    return productData.data.filter((product: any) => {
      const price = Number(product.price);
      return price >= priceRange[0] && price <= priceRange[1];
    });
  }, [productData, priceRange]);

  console.log(filteredProducts);

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
        <div className="w-full md:w-1/4 p-4 md:p-8 text-white rounded-lg shadow-lg">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-yellow-400">
            Filters
          </h2>

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

          <div className="mb-4 md:mb-6">
            <h3 className="font-semibold text-base md:text-lg mb-2 md:mb-3 text-yellow-400">
              Price
            </h3>
            <Slider
              range
              min={0}
              max={2000000}
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

          <button
            onClick={resetPrice}
            className="w-full mt-4 md:mt-6 bg-yellow-400 text-black py-2 md:py-3 px-4 md:px-6 rounded-full shadow-md hover:bg-red-400 transition-all duration-200 text-sm md:text-base"
          >
            Reset Price
          </button>
        </div>

        <div className="w-full md:w-3/4 flex flex-col">
          <div className="flex flex-wrap gap-6 justify-center">
            {isLoading ? (
              <div className="w-full flex justify-center items-center h-64">
                <Spin size="large" />
              </div>
            ) : isError ? (
              <Empty
                description={
                  <span className="text-white text-2xl font-semibold">
                    Failed to load products.
                  </span>
                }
              />
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
              filteredProducts?.map((product: any) => (
                <ProductCardWithFallback key={product._id} product={product} />
              ))
            )}
          </div>

          {paginationInfo.totalItem > 0 && (
            <div className="flex justify-center mt-8">
              <Pagination
                current={paginationInfo.currentPage}
                total={paginationInfo.totalItem}
                pageSize={pageSize}
                onChange={handlePageChange}
                showSizeChanger={false}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
