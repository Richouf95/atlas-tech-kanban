"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Capture from "/public/capture.png";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

function HomePageMain() {
  const theme = useSelector((state: RootState) => state.theme.theme);
  return (
    <div className="flex flex-col flex-grow items-center justify-center">
      <div className="max-w-[800px] mx-2 text-center">
        <h1 className="text-5xl font-bold">Lorem ipsum dolor</h1>
      </div>
      <div className="flex justify-center my-5">
        <Link href={"/dashboard"}>
          <button className="w-52">Start</button>
        </Link>
      </div>
      <div className="w-full flex justify-center px-2">
        <Image
          src={Capture}
          alt="Background Image"
          className="w-auto max-w-[900px] rounded-2xl"
          layout="responsive"
        />
      </div>
    </div>
  );
}

export default HomePageMain;
