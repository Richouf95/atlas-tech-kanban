import React from "react";
import SigninForm from "@/components/forms/auth/SigninForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import HomeHeader from "@/components/HomeHeader";

async function SignIn() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div>
      <HomeHeader />
      <SigninForm />
    </div>
  );
}

export default SignIn;
