"use client";

import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import "./globals.scss";
import { Provider, useSelector, useDispatch } from "react-redux";
import store from "@/store/store";
import { RootState } from "@/store/store";
import { setTheme } from "@/store/reducers/theme/themeSlice";

const inter = Inter({ subsets: ["latin"] });

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch();
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as 'light' | 'dark' || 'light';
    dispatch(setTheme(savedTheme));
    setIsThemeLoaded(true);
  }, [dispatch]);

  useEffect(() => {
    const htmlElement = document.documentElement;
    htmlElement.classList.remove("light", "dark"); // Remove previous theme classes
    htmlElement.classList.add(theme); // Add new theme class
  }, [theme]);

  if (!isThemeLoaded) {
    // Render a loading indicator or nothing until the theme is set
    return null;
  }

  return (
    <html lang="en" className={theme}>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeWrapper>{children}</ThemeWrapper>
    </Provider>
  );
}
