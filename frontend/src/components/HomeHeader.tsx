"use client";

import React from "react";
import ThemeToggle from "../components/ThemeToggle";
import LightLogo from "/public/atlas_light_logo.png";
import DarkLogo from "/public/atlas_dark_logo.png";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Link from "next/link";
import { usePathname } from "next/navigation";

function HomeHeader({ session }: { session: any }) {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const pathName = usePathname();

  return (
    <header
      role="banner"
      className="flex justify-between items-center px-5 pt-5"
    >
      <div className="ml-5">
        <Link href={"/"}>
          <Image
            src={theme === "light" ? DarkLogo : LightLogo}
            width={70}
            height={70}
            alt="Logo"
          />
        </Link>
      </div>
      <nav role="navigation">
        <ul className="flex flex-row items-center gap-5 md:mr-5 mr-0">
          <li>
            {" "}
            {pathName === "/" && !session && (
              <Link href={"/signin"} className="btn">
                Signin
              </Link>
            )}
          </li>
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default HomeHeader;
