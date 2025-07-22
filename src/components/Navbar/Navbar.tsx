"use client";

import { Dropdown } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaBars, FaHeart, FaShoppingCart, FaTimes } from "react-icons/fa";
import { TiArrowSortedDown } from "react-icons/ti";
import Swal from "sweetalert2";

import main_logo from "../../assets/main_logo.png";
import profile_image from "../../assets/profile/profile_img.png";

import { useCartWishlist } from "@/context/CartWishlistContext";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/slices/authSlice";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { SuccessSwal } from "../utils/allSwalFire";
import ProfileMenu from "./ProfileMenu";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const { cart, wishlist } = useCartWishlist();

  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const heartCount = wishlist.length;
  const cartCount = cart.reduce((acc, item) => acc + (item.quantity ?? 1), 0);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
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
        SuccessSwal({
          title: "Logged out",
          text: "You have successfully logged out.",
        }).then(() => {
          dispatch(logout());
          localStorage.removeItem("user_token");
          localStorage.removeItem("doorOpened");
          // using remove cookie from here
          Cookies.remove("authToken");
          router.refresh();
          router.push("/login");
        });
      }
    });
  };

  return (
    <>
      <nav className="bg-black shadow-2xl fixed w-full py-2 z-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex justify-between">
            {/* Logo Section */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" onClick={closeMenu}>
                <Image
                  className="w-20 h-16 md:w-24 md:h-20"
                  width={1000}
                  height={1000}
                  src={main_logo}
                  alt="main_logo"
                />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex md:items-center space-x-8">
              {/* Navigation Links */}
              <div
                className={`flex space-x-4 ${
                  user?.email ? " text-center " : ""
                }`}
              >
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      isActive(item.href)
                        ? "text-primary underline font-bold"
                        : "text-white font-semibold text-lg hover:text-primary"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Heart and Cart Icons */}
              <div className="flex items-center space-x-6">
                <Link
                  href="/wish-list"
                  className="relative text-white hover:text-primary transition duration-200"
                >
                  <FaHeart size={20} />
                  {heartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5">
                      {heartCount}
                    </span>
                  )}
                </Link>
                <Link
                  href="/cart-list"
                  className="relative text-white hover:text-primary transition duration-200"
                >
                  <FaShoppingCart size={20} />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>

              {/* User Profile or Login */}
              {user?.email ? (
                <>
                  <Dropdown
                    overlay={
                      <ProfileMenu
                        handleLogout={handleLogout}
                        closeMenu={closeMenu}
                      />
                    }
                    trigger={["click"]}
                    placement="bottomRight"
                  >
                    <div className="flex justify-start items-center gap-2 cursor-pointer">
                      <Image
                        width={1000}
                        height={1000}
                        className="w-12 h-12 rounded-full border-4 border-primary"
                        src={profile_image || "/default-profile.png"}
                        alt="User Profile"
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
                  </div>
                </>
              )}
            </div>

            {/* Mobile Menu Button and Icons */}
            <div className="flex items-center md:hidden">
              {/* Heart and Cart Icons for Mobile */}
              <div className="flex items-center space-x-4 mr-4">
                <Link
                  href="/wish-list"
                  className="relative text-white hover:text-primary transition duration-200"
                >
                  <FaHeart size={20} />
                  {heartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5">
                      {heartCount}
                    </span>
                  )}
                </Link>
                <Link
                  href="/cart-list"
                  className="relative text-white hover:text-primary transition duration-200"
                >
                  <FaShoppingCart size={20} />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>

              {/* Toggle Button */}
              <button
                onClick={toggleMenu}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-primary hover:bg-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition duration-200"
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
                aria-label="Toggle navigation menu"
              >
                {isOpen ? (
                  <FaTimes className="block h-5 w-5" aria-hidden="true" />
                ) : (
                  <FaBars className="block h-5 w-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 z-40 md:hidden transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          aria-hidden={!isOpen}
        >
          {/* Overlay */}
          <div
            className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
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
            <div className="flex items-center justify-between p-2 border-b border-white">
              <Link href="/" onClick={closeMenu}>
                <Image
                  className="w-20 h-16"
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
                <FaTimes size={20} />
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
                      : "text-white font-semibold text-lg hover:text-primary"
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
                    overlay={
                      <ProfileMenu
                        handleLogout={handleLogout}
                        closeMenu={closeMenu}
                      />
                    }
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
                        alt="User Profile"
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
                </>
              )}
            </nav>
          </div>
        </div>
      </nav>
    </>
  );
}
