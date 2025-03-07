"use client";
import { mainTheme } from "@/components/utils/antTheme";
import { useProfileDataQuery } from "@/redux/features/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { setCredentials } from "@/redux/slices/authSlice";
import { ConfigProvider } from "antd";
import "antd/dist/reset.css";

import { ReactNode, useEffect } from "react";

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { data, isLoading } = useProfileDataQuery(undefined);
  const dispatch = useAppDispatch();

  console.log(data?.data, isLoading);

  useEffect(() => {
    dispatch(
      setCredentials({
        user: data?.data,
        token: "",
      })
    );
  }, [data?.data, dispatch]);

  return <ConfigProvider theme={mainTheme}>{children}</ConfigProvider>;
};

export default ThemeProvider;
