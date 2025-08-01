"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import door_img_left from "../../assets/door/door_img_left.png";
import door_img_left_mobile from "../../assets/door/door_img_left_mobile.png";
import door_img_right from "../../assets/door/door_img_right.png";
import door_img_right_mobile from "../../assets/door/door_img_right_mobile.png";
import logo from "../../assets/main_logo.png";

export default function Door() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false); // Controls visibility
  const [isInitialized, setIsInitialized] = useState(false); // Tracks if component has initialized

  useEffect(() => {
    // Check if the door was opened previously (stored in localStorage)
    const doorState = localStorage.getItem("doorOpened");
    if (doorState === "true") {
      setIsOpen(true);
      setTimeout(() => setIsHidden(true), 1000); // Hide after animation (1 second)
    }
    setIsInitialized(true); // Mark component as initialized
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    localStorage.setItem("doorOpened", "true"); // Store the state in localStorage

    setTimeout(() => {
      setIsHidden(true); // Hide the container after animation (1 second)
    }, 1000);
  };

  const handleUnderageAlert = () => {
    Swal.fire({
      title: "Access Denied",
      text: "You must be 21+ years old to enter this site.",
      icon: "warning",
      confirmButtonText: "OK",
      confirmButtonColor: "#d33",
    });
  };

  return (
    <div
      id="door-container"
      className={`fixed z-50 w-full h-screen flex justify-center items-center transition-opacity duration-1000 ${
        isHidden ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Doors */}
      <div className="relative w-full h-full flex">
        {/* Left Door */}
        <motion.div
          initial={{ x: 0 }}
          animate={isOpen ? { x: "-100%" } : {}}
          transition={{ duration: 1 }} // Animation duration: 1 second
          className="absolute left-0 top-0 h-full w-1/2"
        >
          <Image
            src={door_img_left_mobile}
            alt="Left Door"
            layout="fill"
            objectFit="cover"
            className="block md:hidden"
          />
          <Image
            src={door_img_left}
            alt="Left Door"
            layout="fill"
            objectFit="cover"
            className="hidden md:block"
          />
        </motion.div>

        {/* Right Door */}
        <motion.div
          initial={{ x: 0 }}
          animate={isOpen ? { x: "100%" } : {}}
          transition={{ duration: 1 }} // Animation duration: 1 second
          className="absolute right-0 top-0 h-full w-1/2"
        >
          <Image
            src={door_img_right_mobile}
            alt="Right Door"
            layout="fill"
            objectFit="cover"
            className="block md:hidden"
          />
          <Image
            src={door_img_right}
            alt="Right Door"
            layout="fill"
            objectFit="cover"
            className="hidden md:block"
          />
        </motion.div>

        {/* Modal */}
        {isInitialized && !isOpen && !isHidden && (
          <div
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 
            w-full max-w-lg flex flex-col items-center justify-center bg-black p-8 rounded-lg border border-yellow-400 shadow-xl"
          >
            <Image
              src={logo}
              alt="Logo"
              width={1000}
              height={1000}
              className="w-44 h-32 mb-4"
            />
            <h2 className="text-primary text-3xl font-bold text-center">
              Welcome!
            </h2>
            <p className="text-white text-center font-semibold text-xl">
              You must be <span className="text-primary font-bold">21+</span> to
              enter this site
            </p>
            <div className="flex gap-4 mt-6">
              <button
                className="px-6 py-2 bg-red-600 text-white rounded"
                onClick={handleUnderageAlert}
              >
                No
              </button>
              <button
                className="px-6 py-2 bg-green-600 text-white rounded"
                onClick={handleOpen}
              >
                Yes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
