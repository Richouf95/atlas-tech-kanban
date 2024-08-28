import SignupForm from "@/components/forms/auth/SignupForm";
import HomeHeader from "@/components/HomeHeader";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

async function SignUp() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div>
      <HomeHeader session={session} />
      <SignupForm />
    </div>
  );
}

export default SignUp;
