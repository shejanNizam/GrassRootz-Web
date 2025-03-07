"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaProjectDiagram,
  FaUser,
} from "react-icons/fa";

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebarCollapsed: () => void;
}

export default function Sidebar({
  isCollapsed,
  toggleSidebarCollapsed,
}: SidebarProps) {
  // const user = "";
  const user = "contratcor";

  const pathname = usePathname();
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const menuItems = [
    { name: "Dashboard", icon: <FaUser />, path: "/dashboard" },
    {
      name: "Order History",
      icon: <FaProjectDiagram />,
      path: "/order-history",
    },
    { name: "Settings", icon: <FaUser />, path: "/settings" },
  ];

  // Focus on the first link when sidebar is expanded
  useEffect(() => {
    if (!isCollapsed && firstLinkRef.current) {
      firstLinkRef.current.focus();
    }
  }, [isCollapsed]);

  return (
    <>
      {/* Sidebar Container */}
      <div
        className={`
          min-h-screen fixed top-24 inset-y-0 left-0 z-20 transform translate-x-0
          transition-transform duration-200 ease-in-out 
          bg-gray-900 text-white 
          ${isCollapsed ? "w-16" : "w-64"}
        `}
      >
        {/* Sidebar Content */}
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-4">
            {/* Logo */}
            <div></div>

            {/* Toggle Button */}
            <button
              onClick={toggleSidebarCollapsed}
              aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
              className="focus:outline-none pt-4"
            >
              {isCollapsed ? (
                <FaArrowRight size={20} />
              ) : (
                <FaArrowLeft size={20} />
              )}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-4 flex-1">
            {user == "contratcor" ? (
              <>
                {menuItems?.map((item, index) => (
                  <Link
                    href={item.path}
                    key={item.name}
                    onClick={() => {}} // No action needed on link click
                    className={`
                  flex items-center px-4 py-3 mt-2 
                  ${
                    pathname === item.path
                      ? "bg-gray-700 text-primary font-semibold border-l-4 border-primary"
                      : "hover:bg-gray-700 transition-colors duration-200"
                  }
                  ${
                    isCollapsed
                      ? "justify-center relative group cursor-pointer"
                      : ""
                  }
                `}
                    ref={index === 0 ? firstLinkRef : null} // Focus on the first link when expanded
                    aria-current={pathname === item.path ? "page" : undefined}
                    title={isCollapsed ? item.name : undefined} // Show tooltip when collapsed
                  >
                    <span className="text-lg">{item.icon}</span>
                    {!isCollapsed && <span className="mx-3">{item.name}</span>}
                    {isCollapsed && (
                      <span className="absolute left-full ml-2 w-max bg-gray-700 text-white text-sm rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        {item.name}
                      </span>
                    )}
                  </Link>
                ))}
              </>
            ) : (
              <>
                {menuItems?.map((item, index) => (
                  <Link
                    href={item.path}
                    key={item.name}
                    onClick={() => {}} // No action needed on link click
                    className={`
                  flex items-center px-4 py-3 mt-2 
                  ${
                    pathname === item.path
                      ? "bg-gray-700 text-primary font-semibold border-l-4 border-primary"
                      : "hover:bg-gray-700 transition-colors duration-200"
                  }
                  ${
                    isCollapsed
                      ? "justify-center relative group cursor-pointer"
                      : ""
                  }
                `}
                    ref={index === 0 ? firstLinkRef : null} // Focus on the first link when expanded
                    aria-current={pathname === item.path ? "page" : undefined}
                    title={isCollapsed ? item.name : undefined} // Show tooltip when collapsed
                  >
                    <span className="text-lg">{item.icon}</span>
                    {!isCollapsed && <span className="mx-3">{item.name}</span>}
                    {isCollapsed && (
                      <span className="absolute left-full ml-2 w-max bg-gray-700 text-white text-sm rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        {item.name}
                      </span>
                    )}
                  </Link>
                ))}
              </>
            )}
          </nav>
        </div>
      </div>
    </>
  );
}
