import React from "react";
import UserMenu from "../UserMenu";
import AtlasLogo from "../AtlasLogo";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import UserMenuBtn from "@/components/UserMenuBtn";

async function DashboardHeader() {
  const session = await getServerSession(authOptions);
  return (
    <header
      role="banner"
      className="flex justify-between items-center px-5 p-2 userNavBar"
      id="DashboardHeader"
    >
      <AtlasLogo />
      <UserMenuBtn session={session} />
    </header>
  );
}

export default DashboardHeader;
