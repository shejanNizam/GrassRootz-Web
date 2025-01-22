import Image from "next/image";
import bannerImage from "../../../assets/home/banner/banner_bg_img.png";

export default function Banner() {
  return (
    <div className="relative bg-cover bg-center h-[80vh] flex justify-center items-center">
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
      <div className="text-center text-white p-4 z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold">
          Your Daily Essentials,
        </h1>
        <h2 className="text-2xl sm:text-3xl md:text-4xl mt-2 font-light">
          Just a Click Away!
        </h2>
      </div>
    </div>
  );
}
