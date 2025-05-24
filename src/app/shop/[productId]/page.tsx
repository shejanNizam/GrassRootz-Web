import SecondaryBanner from "@/components/Home/Banner/SecondaryBanner";
import ProductDetails from "./ProductDetails";

export default function Details() {
  return (
    <>
      <SecondaryBanner heading="Product Details" />
      <ProductDetails />
      {/* <RelatedProducts /> */}
    </>
  );
}
