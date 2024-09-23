"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import LightLogo from "/public/atlas_light_logo.png";
import DarkLogo from "/public/atlas_dark_logo.png";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

function AtlasLogo() {
  const theme = useSelector((state: RootState) => state.theme.theme);
  return (
    <div className="ml-5">
      <Link href={"/"}>
        <Image
          src={theme === "light" ? DarkLogo : LightLogo}
          width={50}
          height={50}
          alt="Logo"
        />
      </Link>
    </div>
  );
}

export default AtlasLogo;
