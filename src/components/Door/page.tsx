"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import door_img_left from "../../assets/door/door_img_left.png";
import door_img_right from "../../assets/door/door_img_right.png";
import DoorModal from "./DoorModal";

export default function Door() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false); // Controls visibility

  const doorState = localStorage.getItem("doorOpened");
  // Check if the door has already been opened on page load
  useEffect(() => {
    const doorState = localStorage.getItem("doorOpened");
    if (doorState === "true") {
      setIsOpen(true);
      setTimeout(() => setIsHidden(true), 1000); // Hide after door animation
    }
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    localStorage.setItem("doorOpened", "true"); // Store the state in localStorage

    setTimeout(() => {
      setIsHidden(true); // Hide the door container after animation
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
          transition={{ duration: 1 }}
          className="absolute left-0 top-0 h-full w-1/2"
        >
          <Image
            src={door_img_left}
            alt="Left Door"
            layout="fill"
            objectFit="cover"
          />
        </motion.div>

        {/* Right Door */}
        <motion.div
          initial={{ x: 0 }}
          animate={isOpen ? { x: "100%" } : {}}
          transition={{ duration: 1 }}
          className="absolute right-0 top-0 h-full w-1/2"
        >
          <Image
            src={door_img_right}
            alt="Right Door"
            layout="fill"
            objectFit="cover"
          />
        </motion.div>

        {/* Modal */}
        {!isOpen && !doorState && (
          <DoorModal
            handleOpen={handleOpen}
            handleUnderageAlert={handleUnderageAlert}
          />
        )}
      </div>
    </div>
  );
}
