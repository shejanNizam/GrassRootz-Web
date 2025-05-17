import SecondaryBanner from "@/components/Home/Banner/SecondaryBanner";
import ProductDetails from "./ProductDetails";
import ProductTabs from "./PoductTabs";

export default function Details() {
  return (
    <>
      <SecondaryBanner heading="Product Details" />
      <ProductDetails />
      {/* <ProductTabs /> */}
    </>
  );
}
