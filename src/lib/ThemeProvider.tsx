// lib/ThemeProvider.jsx

"use client"; // Required for client-side rendering

import { mainTheme } from "@/components/utils/antTheme";
import { ConfigProvider } from "antd";
import "antd/dist/reset.css"; // Import Ant Design's CSS here

import { ReactNode } from "react";

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return <ConfigProvider theme={mainTheme}>{children}</ConfigProvider>;
};

export default ThemeProvider;
