"use client";

import Image from "next/image";
import Link from "next/link";
// import main_logo from "../../assets/main_logo.svg";
import main_logo from "../../assets/main_logo.png";

const Footer = () => {
  return (
    <footer className="bg-black z-40 text-gray-700 py-8 pl-16 md:pl-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between">
          {/* Logo and Description */}
          <div className="mb-6 md:mb-0">
            <Link href="/" className="text-xl font-bold text-gray-800 ">
              <Image
                className="w-48 h-36"
                width={1000}
                height={1000}
                src={main_logo}
                alt="main_logo"
              />
            </Link>
            <p className="mt-2 text-sm">
              Peared connects customers with trusted local service providers,{" "}
              <br />
              ensuring fair pricing and secure transactions. Service providers{" "}
              <br />
              easily find projects, and all communication stays within our{" "}
              <br />
              platform for safety and simplicity.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col sm:flex-row">
            <div className="mr-20">
              <h3 className="font-semibold text-primary text-xl mb-2">
                Explore
              </h3>
              <ul>
                <li className="mb-1">
                  <Link
                    href="/"
                    className="text-sm text-white hover:text-primary/50"
                  >
                    Home
                  </Link>
                </li>
                <li className="mb-1">
                  <Link
                    href="/about-us"
                    className="text-sm text-white hover:text-primary/50"
                  >
                    About Us
                  </Link>
                </li>
                <li className="mb-1">
                  <Link
                    href="/contact"
                    className="text-sm text-white hover:text-primary/50"
                  >
                    Contact us
                  </Link>
                </li>
              </ul>
            </div>

            <div className="mr-20">
              <h3 className="font-semibold text-primary text-xl mb-2">
                Utility Pages
              </h3>
              <ul>
                <li className="mb-1">
                  <Link
                    href="/privacy-policy"
                    className="text-sm text-white hover:text-primary/50"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li className="mb-1">
                  <Link
                    href="/terms-of-use"
                    className="text-sm text-white hover:text-primary/50"
                  >
                    Terms of Use
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-primary text-xl mb-2">
                Get In Touch
              </h3>
              <ul>
                <li className="mb-1">
                  <Link
                    href="/faq"
                    className="text-sm text-white hover:text-primary/50"
                  >
                    peardup@gmail.com
                  </Link>
                </li>
                <li className="mb-1">
                  <Link
                    href="/support"
                    className="text-sm text-white hover:text-primary/50"
                  >
                    (009)56567890g
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-300"></div>

        {/* Copyright */}
        <div className="mt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} MyCompany. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
