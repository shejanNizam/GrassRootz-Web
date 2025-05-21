"use client";

import NoProduct from "@/assets/shop/no_product.png";
import ProductCard from "@/components/ProductCard/ProductCard";
import { useGetAllProductsQuery } from "@/redux/features/products/productsApi";
import { Empty, Spin } from "antd";
import Image from "next/image";
import { useCallback, useState } from "react";

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

export default function RelatedProducts({ product }: ProductTabsProps) {
  const { data, isLoading, isError } = useGetAllProductsQuery({
    categories: product?.category ? [product.category] : undefined,
  });
  console.log(data?.data);

  return (
    <>
      <h3 className="text-2xl text-center text-primary font-bold mb-4">
        {" "}
        Related Product{" "}
      </h3>
      <div className="flex flex-wrap gap-6 justify-center">
        {isLoading ? (
          <Spin size="large" />
        ) : isError ? (
          <Empty description="Failed to load products." />
        ) : data?.data?.length === 0 ? (
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
          data?.data
            ?.slice(0, 4)
            ?.map((product: any) => (
              <ProductCardWithFallback key={product._id} product={product} />
            ))
        )}
      </div>
    </>
  );
}
