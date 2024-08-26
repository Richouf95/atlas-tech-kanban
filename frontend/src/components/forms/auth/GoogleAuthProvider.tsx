"use client"
import React from "react";
import { signIn } from "next-auth/react";
import GoogleIcon from "@mui/icons-material/Google";

export default function GoogleAuthProvider() {
  return (
    <div>
      <button
        className="flex mx-auto w-52 items-center justify-center"
        onClick={() => signIn("google")}
      >
        <GoogleIcon className="mx-2" />
        <span className="">Google</span>
      </button>
    </div>
  );
}
