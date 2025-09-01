"use client";
import { useGetBannerDataQuery } from "@/redux/features/banner/bannerApi";
import Image from "next/image";
import { useEffect, useState } from "react";

const baseImageUrl = process.env.NEXT_PUBLIC_IMAGE_URL || "";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const { data: bannerData } = useGetBannerDataQuery({});
  const data = bannerData?.data || [];
  console.log(data);

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying || data.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % data.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, data.length]);

  // Handle manual navigation
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // If no data, show default content
  if (!data || data.length === 0) {
    return (
      <div className="relative bg-gray-800 bg-cover bg-center h-[40vh] md:h-[60vh] flex justify-center items-center z-30">
        <div className="text-center text-primary p-4 mt-20 z-10">
          <h1 className="text-3xl md:text-6xl font-semibold">
            Your Daily Essentials,
          </h1>
          <h1 className="text-3xl md:text-6xl font-semibold">
            Just a Click Away!
          </h1>
        </div>
      </div>
    );
  }

  const currentItem = data[currentSlide];

  return (
    <div className="relative bg-cover bg-center h-[40vh] md:h-[60vh] flex justify-center items-center z-30 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 transition-opacity duration-1000">
        <Image
          src={baseImageUrl + currentItem.image}
          alt={currentItem.name}
          layout="fill"
          objectFit="cover"
          quality={100}
          priority={currentSlide === 0}
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Content */}
      <div className="text-center text-primary p-4 mt-20 z-10 transition-all duration-1000 w-[70%]">
        <h1 className="text-3xl md:text-6xl font-semibold mb-4 animate-fade-in">
          {currentItem.name}
        </h1>
      </div>

      {/* Slide Indicators */}
      {data.length > 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {data?.map((index: number) => (
            <button
              key={index}
              // onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white"
                  : "bg-white bg-opacity-50 hover:bg-opacity-75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Banner;
