"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/slices/authSlice";
import { Dropdown, Menu } from "antd";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { TiArrowSortedDown } from "react-icons/ti";
import Swal from "sweetalert2";
import main_logo from "../../assets/main_logo.png";
import profile_image from "../../assets/profile/profile_img.png";
import CustomButton from "../utils/CustomButton";
import { SuccessSwal } from "../utils/allSwalFire";

const ProfileMenu = ({ handleLogout }: { handleLogout: () => void }) => (
  <Menu>
    <Menu.Item key="1">
      <Link className="font-bold text-primary" href="/profile/my-profile">
        My Profile
      </Link>
    </Menu.Item>
    <Menu.Item key="2">
      <div className="font-bold text-red-600" onClick={handleLogout}>
        Logout
      </div>
    </Menu.Item>
  </Menu>
);

export default function Navbar() {
  const dispatch = useAppDispatch();

  // const { user, token } = useAppSelector((state) => state.auth);
  const { user } = useAppSelector((state) => state.auth);

  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close mobile menu
  const closeMenu = () => {
    setIsOpen(false);
  };

  // Navigation links data
  const navigation = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Store locator", href: "/store-locator" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Implement actual logout logic here
        SuccessSwal({
          title: "Logged out",
          text: "You have successfully logged out.",
        }).then(() => {
          dispatch(logout());
          router.push("/login");
        });
      }
    });
  };

  return (
    <>
      <nav className="bg-black shadow-md fixed w-full p-2 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo Section */}
            <div className="flex-shrink-0 flex items-center">
              <Link
                href="/"
                className="text-xl font-bold text-white pl-16 md:pl-0"
                onClick={closeMenu}
              >
                <Image
                  className="w-20 h-16"
                  width={1000}
                  height={1000}
                  src={main_logo}
                  alt="main_logo"
                />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex md:items-center space-x-4">
              {/* Navigation Links */}
              <div className={`flex space-x-4 ${user ? " text-center " : ""}`}>
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      isActive(item.href)
                        ? "text-primary underline font-bold"
                        : "text-white hover:text-primary"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Action Buttons */}
              {user?.email ? (
                <>
                  <Dropdown
                    overlay={<ProfileMenu handleLogout={handleLogout} />}
                    trigger={["click"]}
                    placement="bottomRight"
                  >
                    <div className="flex justify-start items-center gap-2 cursor-pointer">
                      <Image
                        width={1000}
                        height={1000}
                        className="w-12 h-12 rounded-full border-4 border-primary"
                        src={profile_image || "/default-profile.png"}
                        alt="profile_image"
                      />
                      <TiArrowSortedDown />
                    </div>
                  </Dropdown>
                </>
              ) : (
                <>
                  <div className="flex items-center space-x-4 ml-6">
                    <Link
                      href="/login"
                      className="px-6 py-2 text-primary border border-primary rounded-md text-sm font-medium hover:text-white hover:bg-primary transition duration-200"
                    >
                      Login
                    </Link>
                    <Link href="/signup">
                      <CustomButton>Signup</CustomButton>
                    </Link>
                  </div>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={toggleMenu}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-primary hover:bg-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition duration-200"
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
                aria-label="Toggle navigation menu"
              >
                {isOpen ? (
                  <FaTimes className="block h-8 w-8" aria-hidden="true" />
                ) : (
                  <FaBars className="block h-8 w-8" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {/* Slide-in Sidebar for Mobile */}
        <div
          className={`fixed inset-0 z-40 md:hidden transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          aria-hidden={!isOpen}
        >
          {/* Overlay */}
          <div
            className={`fixed inset-0 bg-opacity-50 transition-opacity duration-300 ${
              isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={closeMenu}
            aria-hidden="true"
          ></div>

          {/* Sidebar */}
          <div
            className={`absolute left-0 top-0 bottom-0 w-64 bg-black shadow-lg transform ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out`}
          >
            {/* Logo and Close Button */}
            <div className="flex items-center justify-between p-4 border-b border-white">
              <Link
                href="/"
                className="text-xl font-bold text-gray-800"
                onClick={closeMenu}
              >
                <Image
                  className="w-16 h-12"
                  width={1000}
                  height={1000}
                  src={main_logo}
                  alt="main_logo"
                />
              </Link>
              <button
                onClick={closeMenu}
                className="text-white hover:text-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary w-8 h-8"
                aria-label="Close menu"
              >
                <FaTimes size={32} />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="mt-4">
              {navigation.map((item) => (
                <Link
                  href={item.href}
                  key={item.name}
                  onClick={closeMenu}
                  className={`flex items-center px-6 py-3 mt-2 ${
                    isActive(item.href)
                      ? "text-primary underline font-semibold"
                      : "text-white hover:text-primary"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              {/* Divider */}
              <hr className="my-4 border-white" />

              {/* Action Links */}
              {user?.email ? (
                <>
                  <Dropdown
                    overlay={<ProfileMenu handleLogout={handleLogout} />}
                    trigger={["click"]}
                    placement="bottomRight"
                  >
                    <div
                      className={`flex justify-start items-center gap-2 px-4 py-2 mt-2 cursor-pointer ${
                        pathname === "/profile/my-profile"
                          ? "text-primary underline font-semibold"
                          : "text-gray-700 hover:text-gray-900"
                      }`}
                    >
                      <Image
                        width={1000}
                        height={1000}
                        className="w-16 h-16 rounded-full border-4 border-primary"
                        src={profile_image}
                        alt="profile_image"
                      />
                      <TiArrowSortedDown />
                    </div>
                  </Dropdown>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={closeMenu}
                    className="block px-6 py-3 mt-2 bg-white text-primary border border-primary rounded-md text-sm font-medium hover:text-white hover:bg-primary transition duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    onClick={closeMenu}
                    className="block px-6 py-3 mt-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-white hover:text-primary border border-primary transition duration-200"
                  >
                    Signup
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </nav>
    </>
  );
}
