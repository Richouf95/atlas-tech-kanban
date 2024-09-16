"use server";
import React from "react";
import "./globals.scss";
import { Provider } from "react-redux";
import store from "@/store/store";
import ThemeWrapper from "./ThemeWrapper";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <ThemeWrapper>{children}</ThemeWrapper>
      </body>
    </html>
  );
}
