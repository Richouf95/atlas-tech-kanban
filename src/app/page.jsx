"use client";
import React from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <main className="flex items-center justify-center h-svh">
      <div className="fixed top-0 right-0">
        <ThemeToggle />
      </div>
      <Link href={"/board"} className="btn">
        Start
      </Link>
    </main>
  );
}
