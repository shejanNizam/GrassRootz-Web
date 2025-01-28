import Image from "next/image";
import banner_secondary_image from "../../../assets/home/banner/banner_bg_img.png";

interface SecondaryBannerProps {
  heading: string;
}

export default function SecondaryBanner({ heading }: SecondaryBannerProps) {
  return (
    <div className="relative bg-cover bg-center h-[40vh] flex justify-center items-center z-30">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={banner_secondary_image}
          alt="banner_secondary_image"
          fill
          quality={100}
          priority
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* Heading Content */}
      <div className="text-center text-primary z-10 px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mt-32">
          {heading}
        </h1>
      </div>
    </div>
  );
}
