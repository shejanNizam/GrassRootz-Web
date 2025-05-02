"use client";
import { mainTheme } from "@/components/utils/antTheme";
import { useGetUserDataQuery } from "@/redux/features/userApi";
import { useAppDispatch } from "@/redux/hooks";
import { setCredentials } from "@/redux/slices/authSlice";
import { ConfigProvider } from "antd";
import "antd/dist/reset.css";

import { ReactNode, useEffect } from "react";

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { data } = useGetUserDataQuery(undefined);
  const dispatch = useAppDispatch();

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
