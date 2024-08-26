"use client";
import { signOut } from "next-auth/react";
import React from "react";
import Image from "next/image";
import ThemeToggle from "@/components/ThemeToggle";
import LightLogo from "/public/atlas_light_logo.png";
import DarkLogo from "/public/atlas_dark_logo.png";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Link from "next/link";
import UserMenu from "../UserMenu";
import { useRouter } from "next/navigation";

function DashboardHeader() {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const router = useRouter();
  return (
    <header
      className="flex justify-between items-center px-5 p-2 userNavBar"
      id="DashboardHeader"
    >
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
      <div className="flex flex-row items-center gap-5 md:mr-5 mr-0">
        <ThemeToggle />
        <button
          onClick={() => {
            signOut();
            router.push("/");
          }}
        >
          Logout
        </button>
      </div>
      <UserMenu />
    </header>
  );
}

export default DashboardHeader;
