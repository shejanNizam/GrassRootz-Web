import About from "@/components/Home/About/About";
import Banner from "@/components/Home/Banner/Banner";
import Faq from "@/components/Home/Faq/Faq";
import LatestProducts from "@/components/Home/LatestProducts/LatestProducts";
import PopularPoducts from "@/components/Home/PopularPoducts/PopularPoducts";
import WhyChoose from "@/components/Home/WhyChoose/WhyChoose";

export default function Home() {
  return (
    <>
      <Banner />
      <div className="container min-h-screen">
        <LatestProducts />
        <PopularPoducts />
        <WhyChoose />
        <About />
        <Faq />
      </div>
    </>
  );
}
