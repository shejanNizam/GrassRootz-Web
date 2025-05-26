import CustomButton from "@/components/utils/CustomButton";
import Image from "next/image";
import Link from "next/link";
import about_img from "../../../assets/home/about/about_img.png";

export default function About() {
  return (
    <div className="container grid grid-cols-1 md:grid-cols-2 gap-4 justify-center items-center md:px-12">
      <div className=" space-y-12 lg:pl-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl text-primary font-bold">
          {" "}
          About Us{" "}
        </h1>
        <p className="text-white">
          Discover the convenience of shopping with [Your Super Shop Name]! We
          offer a wide variety of high-quality products, from fresh groceries to
          household essentials, all at unbeatable prices. Our mission is to
          bring ease and satisfaction to your shopping experience, backed by
          trust and quality service. Bid on projects in any pricing format,
          whether it be a flat rate, by the hour, or by the task, it is up to
          you.
          <Link href="/about-us" className="text-primary">
             See More....
          </Link>
        </p>
        <div>
          <Link href={`/about-us`}>
            <CustomButton> About </CustomButton>
          </Link>
        </div>
      </div>
      <div className="hidden md:block">
        <Image src={about_img} alt="about_img" width={1000} height={1000} />
      </div>
    </div>
  );
}
