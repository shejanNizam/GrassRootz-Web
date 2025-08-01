"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import image1 from "../../../assets/home/whyChoose/image1.png";
import image2 from "../../../assets/home/whyChoose/image2.png";
import image3 from "../../../assets/home/whyChoose/image3.png";
import image4 from "../../../assets/home/whyChoose/image4.png";
import image5 from "../../../assets/home/whyChoose/image5.png";
import image6 from "../../../assets/home/whyChoose/image6.png";

import CustomHeading from "@/components/utils/CustomHeading";
import {
  FaCalendarCheck,
  FaCheckCircle,
  FaDollarSign,
  FaLock,
  FaServicestack,
  FaThumbsUp,
} from "react-icons/fa";

const optionsData = [
  {
    _id: "1",
    title: "Verified Professionals",
    description:
      "All our service providers are background-checked, certified, and trusted to deliver top-quality services.",
    image: image1,
    icon: FaCheckCircle,
  },
  {
    _id: "2",
    title: "Easy & Quick Booking",
    description:
      "Book your required service in just a few clicks—no hassle, no delays.",
    image: image2,
    icon: FaCalendarCheck,
  },
  {
    _id: "3",
    title: "Transparent Pricing",
    description:
      "Get clear, upfront pricing for services with no hidden fees or surprises.",
    image: image3,
    icon: FaDollarSign,
  },
  {
    _id: "4",
    title: "Quality Assurance",
    description:
      "We ensure the highest standards of service with reviews and ratings from real customers.",
    image: image4,
    icon: FaThumbsUp,
  },
  {
    _id: "5",
    title: "Secure Payments",
    description: "Enjoy safe and secure payment options for all your bookings.",
    image: image5,
    icon: FaLock,
  },
  {
    _id: "6",
    title: "Wide Range of Services",
    description:
      "From floor finishing to plumbing, cleaning, and more—find the right professional for every job.",
    image: image6,
    icon: FaServicestack,
  },
];

export default function WhyChoose() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const tabsRef = useRef<(HTMLLIElement | null)[]>([]);

  const handleOptionClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLLIElement>,
    index: number
  ) => {
    const { key } = e;
    let newIndex = null;

    if (key === "ArrowUp" || key === "ArrowLeft") {
      newIndex = index === 0 ? optionsData.length - 1 : index - 1;
      e.preventDefault();
    } else if (key === "ArrowDown" || key === "ArrowRight") {
      newIndex = index === optionsData.length - 1 ? 0 : index + 1;
      e.preventDefault();
    } else if (key === "Home") {
      newIndex = 0;
      e.preventDefault();
    } else if (key === "End") {
      newIndex = optionsData.length - 1;
      e.preventDefault();
    }

    if (newIndex !== null) {
      setSelectedIndex(newIndex);
      tabsRef.current[newIndex]?.focus();
    }
  };

  return (
    <section className="py-12">
      <div className="md:container mx-auto shadow-sm py-20">
        <div className=" text-center my-12">
          <CustomHeading>Why Choose Us</CustomHeading>
        </div>

        {/* Tablist */}
        <div className="grid grid-cols-1 md:grid-cols-2 justify-around items-center gap-8 md:gap-0 lg:px-32">
          {/* Left Sidebar */}
          <div className="">
            <div className="flex flex-col items-start">
              {/* Tabs */}
              <ul
                className="space-y-8 mt-4 md:mt-0"
                role="tablist"
                aria-orientation="vertical"
              >
                {optionsData.map((option, index) => {
                  const isActive = index === selectedIndex;
                  const Icon = option.icon;
                  return (
                    <li
                      key={option._id}
                      role="tab"
                      aria-selected={isActive}
                      aria-controls={`tabpanel-${option._id}`}
                      id={`tab-${option._id}`}
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => handleOptionClick(index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      ref={(el) => {
                        tabsRef.current[index] = el;
                      }}
                      className={`flex justify-start items-center rounded-md cursor-pointer hover:text-primary ${
                        isActive
                          ? "text-primary bg-primary-light text-3xl font-bold"
                          : "text-white"
                      } transition-colors duration-200`}
                    >
                      <Icon
                        className={`w-6 h-6 mx-2 flex-shrink-0 ${
                          isActive
                            ? "text-primary bg-primary-light"
                            : "text-gray-700"
                        }`}
                        aria-hidden="true"
                      />
                      <span className="text-lg font-medium">
                        {option.title}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Right Content */}
          <div className="">
            {optionsData.map(
              (option, index) =>
                index === selectedIndex && (
                  <div
                    key={option._id}
                    role="tabpanel"
                    id={`tabpanel-${option._id}`}
                    aria-labelledby={`tab-${option._id}`}
                    className="flex flex-col items-start"
                  >
                    <div className="relative w-full">
                      <Image
                        src={option.image}
                        alt={option.title}
                        objectFit="cover"
                        className="rounded-lg shadow-lg"
                        priority
                      />
                    </div>
                    <p className="text-primary text-lg mt-4">
                      {option.description}
                    </p>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
