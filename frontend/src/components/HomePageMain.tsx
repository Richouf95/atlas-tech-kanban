"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Capture from "/public/capture.png";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import CaptureLigh from "/public/Capture_light.png";
import CaptureDark from "/public/Capture_dark.png";
import Spinner from "./Spinner";

function HomePageMain() {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <div className="flex flex-col flex-grow items-center justify-center">
      <div className="max-w-[800px] mx-2 text-center">
        <h1 className="text-5xl font-bold">
          Let's work together to turn your ideas into successes.
        </h1>
      </div>
      <div className="flex justify-center my-5">
        <Link href={"/signin"}>
          <button className="w-52" onClick={() => setIsLoading(true)}>
            {isLoading && <Spinner />}
            Start
          </button>
        </Link>
      </div>
      <div className="w-full flex justify-center px-2">
        <Image
          src={theme === "light" ? CaptureDark : CaptureLigh}
          alt="Background Image"
          className="w-auto max-w-[900px] rounded-2xl"
          layout="responsive"
        />
      </div>
    </div>
  );
}

export default HomePageMain;
