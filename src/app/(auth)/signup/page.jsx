"use client";

import React from "react";
import Link from "next/link";

function page() {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-12 bg-red-400 md:h-svh">
        <div className="flex items-center justify-center col-span-12 m-5 bg-green-400 md:col-span-6">
          <div className="flex flex-col items-center justify-center bg-gray-200 rounded h-96 w-72">
            Login form
            <Link href={"/login"} className="mt-5 btn">
              Login
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center col-span-12 m-5 bg-blue-400 md:col-span-6">
          <div className="flex items-center justify-center bg-gray-200 rounded h-96 w-72">
            landing
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
