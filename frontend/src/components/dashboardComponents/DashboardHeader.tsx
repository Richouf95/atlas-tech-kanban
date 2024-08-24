"use client"
import { signOut } from "next-auth/react";
import React from "react";

function DashboardHeader() {
  return (
    <header className="flex justify-between bg-red-300">
      <h2>Header</h2>
      <button onClick={() => signOut()}>Logout</button>
    </header>
  );
}

export default DashboardHeader;
