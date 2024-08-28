import React from "react";
import UserMenu from "../UserMenu";
import AtlasLogo from "../AtlasLogo";

function DashboardHeader() {
  return (
    <header
      className="flex justify-between items-center px-5 p-2 userNavBar"
      id="DashboardHeader"
    >
      <AtlasLogo />
      <UserMenu />
    </header>
  );
}

export default DashboardHeader;
