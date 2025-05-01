// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import main_logo from "../../assets/main_logo.png";

// const Footer = () => {
//   return (
//     <footer className="bg-black z-40 text-gray-700 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Top Section */}
//         <div className="flex flex-col md:flex-row justify-between">
//           {/* Logo and Description */}
//           <div className="mb-6 md:mb-0">
//             <Link href="/" className="text-xl font-bold text-gray-800 ">
//               <Image
//                 className="w-48 h-36"
//                 width={1000}
//                 height={1000}
//                 src={main_logo}
//                 alt="main_logo"
//               />
//             </Link>
//             <p className="mt-2 text-sm">
//               Peared connects customers with trusted local service providers,{" "}
//               ensuring fair pricing and secure transactions. Service providers{" "}
//               easily find projects, and all communication stays within our{" "}
//               platform for safety and simplicity.
//             </p>
//           </div>

//           {/* Navigation Links */}
//           <div className="flex flex-col sm:flex-row">
//             <div className="mr-20">
//               <h1 className="font-semibold text-primary text-xl mb-2">
//                 Explore
//               </h1>
//               <ul>
//                 <li className="mb-1">
//                   <Link
//                     href="/"
//                     className="text-sm text-white hover:text-primary/50"
//                   >
//                     Home
//                   </Link>
//                 </li>
//                 <li className="mb-1">
//                   <Link
//                     href="/about-us"
//                     className="text-sm text-white hover:text-primary/50"
//                   >
//                     About Us
//                   </Link>
//                 </li>
//                 <li className="mb-1">
//                   <Link
//                     href="/contact"
//                     className="text-sm text-white hover:text-primary/50"
//                   >
//                     Contact us
//                   </Link>
//                 </li>
//               </ul>
//             </div>

//             <div className="mr-20">
//               <h1 className="font-semibold text-primary text-xl mb-2">
//                 Utility Pages
//               </h1>
//               <ul>
//                 <li className="mb-1">
//                   <Link
//                     href="/privacy-policy"
//                     className="text-sm text-white hover:text-primary/50"
//                   >
//                     Privacy Policy
//                   </Link>
//                 </li>
//                 <li className="mb-1">
//                   <Link
//                     href="/terms-of-use"
//                     className="text-sm text-white hover:text-primary/50"
//                   >
//                     Terms of Use
//                   </Link>
//                 </li>
//               </ul>
//             </div>

//             <div>
//               <h1 className="font-semibold text-primary text-xl mb-2">
//                 Get In Touch
//               </h1>
//               <ul>
//                 <li className="mb-1">
//                   <Link
//                     href="/faq"
//                     className="text-sm text-white hover:text-primary/50"
//                   >
//                     peardup@gmail.com
//                   </Link>
//                 </li>
//                 <li className="mb-1">
//                   <Link
//                     href="/support"
//                     className="text-sm text-white hover:text-primary/50"
//                   >
//                     (009)56567890g
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>

//         {/* Divider */}
//         <div className="my-6 border-t border-gray-300"></div>

//         {/* Copyright */}
//         <div className="mt-6 text-center text-sm text-gray-500">
//           &copy; {new Date().getFullYear()} MyCompany. All rights reserved.
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

"use client";
import Image from "next/image";
import Link from "next/link";
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTwitter,
} from "react-icons/fa";

import main_logo_img from "../../assets/main_logo.png";

const Footer = () => (
  <footer className="bg-hash text-white py-8 w-full">
    <div className="px-4 md:container">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start gap-4">
          {/* Logo & text & Social icon here */}
          <div className="w-full md:w-2/5 flex flex-col gap-4 items-center md:items-start">
            <Link href="/">
              {/* <Image
                className="w-20 h-20"
                width={1000}
                height={1000}
                src={main_logo_img}
                alt="main_logo"
              /> */}
              <Image
                width={96}
                height={80}
                src={main_logo_img}
                alt="main_logo"
              />
            </Link>

            <p className="text-sm text-center md:text-left px-4 md:px-0">
              Morbi cursus porttitor enim lobortis molestie. Duis gravida turpis
              dui, eget bibendum magna congue nec.
            </p>

            <div className="flex gap-4">
              <Link href="https://facebook.com" className="hover:text-primary">
                <FaFacebook size={32} />
              </Link>
              <Link
                target="_blank"
                href="https://instagram.com"
                className="hover:text-primary"
              >
                <FaInstagram size={32} />
              </Link>
              <Link
                target="_blank"
                href="https://twitter.com"
                className="hover:text-primary"
              >
                <FaTwitter size={32} />
              </Link>
              <Link
                target="_blank"
                href="https://linkedin.com"
                className="hover:text-primary"
              >
                <FaLinkedinIn size={32} />
              </Link>
            </div>
          </div>

          <div className="w-full md:w-3/5 flex flex-col md:flex-row justify-evenly mt-8 md:mt-0 gap-4">
            {/* Explore */}
            <div className="mb-8 md:mb-0">
              <h3 className="font-semibold text-primary text-xl mb-2 text-center md:text-left">
                Explore
              </h3>
              <ul className="text-center md:text-left">
                <li className="mb-1">
                  <Link href="/" className="text-sm hover:text-primary">
                    Home
                  </Link>
                </li>
                <li className="mb-1">
                  <Link href="/about" className="text-sm hover:text-primary">
                    About Us
                  </Link>
                </li>
                <li className="mb-1">
                  <Link href="/venue" className="text-sm hover:text-primary">
                    Venue
                  </Link>
                </li>
              </ul>
            </div>

            {/* Utility Pages */}
            <div className="mb-8 md:mb-0">
              <h3 className="font-semibold text-primary text-xl mb-2 text-center md:text-left">
                Utility Pages
              </h3>
              <ul className="text-center md:text-left">
                <li className="mb-1">
                  <Link
                    href="/privacy-policy"
                    className="text-sm hover:text-primary"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li className="mb-1">
                  <Link
                    href="/terms-condition"
                    className="text-sm hover:text-primary"
                  >
                    Terms of Use
                  </Link>
                </li>
              </ul>
            </div>

            {/* Get In Touch */}
            <div>
              <h3 className="font-semibold text-primary text-xl mb-2 text-center md:text-left">
                Get In Touch
              </h3>
              <ul className="text-center md:text-left">
                {/* Address with Google Maps Link */}
                <div className="">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=1234+Street+Name,City,State"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center mb-2 justify-center md:justify-start text-sm hover:text-primary transition"
                  >
                    <FaMapMarkerAlt className="mr-2" />
                    1234 Street Name, City, State
                  </a>
                </div>

                {/* Email with mailto Link */}
                <div className="">
                  <a
                    href="mailto:info@mycompany.com"
                    className="flex items-center mb-2 justify-center md:justify-start text-sm hover:text-primary transition"
                  >
                    <FaEnvelope className="mr-2" />
                    info@mycompany.com
                  </a>
                </div>

                {/* Phone Number with tel Link */}
                <div className="">
                  <a
                    href="tel:1234567890"
                    className="flex items-center justify-center md:justify-start text-sm hover:text-primary transition"
                  >
                    <FaPhoneAlt className="mr-2" />
                    (123) 456-7890
                  </a>
                </div>
              </ul>
            </div>
          </div>
        </div>

        {/* border here */}
        <div className="my-4 border-t border-gray-500" />

        {/* copyright part */}
        <div className="text-center text-sm">
          &copy; {new Date().getFullYear()} MyCompany. All rights reserved.
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
