import SecondaryBanner from "@/components/Home/Banner/SecondaryBanner";
import RelatedProducts from "../RelatedProducts";
import ProductDetails from "./ProductDetails";

export default function Details() {
  return (
    <>
      <SecondaryBanner heading="Product Details" />
      <ProductDetails />
      <RelatedProducts />
    </>
  );
}
