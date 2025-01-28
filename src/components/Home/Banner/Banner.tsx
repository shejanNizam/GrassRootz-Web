import Image from "next/image";
import bannerImage from "../../../assets/home/banner/banner_bg_img.png";

export default function Banner() {
  return (
    <div className="relative bg-cover bg-center h-[60vh] flex justify-center items-center z-30">
      <div className="absolute inset-0">
        <Image
          src={bannerImage}
          alt="banner_image"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
      </div>
      <div className="text-center text-white p-4 mt-20 z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold">
          Your Daily Essentials,
        </h1>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold">
          Just a Click Away!
        </h1>
      </div>
    </div>
  );
}
