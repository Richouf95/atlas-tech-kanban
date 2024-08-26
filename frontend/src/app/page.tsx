"use server";
import HomeHeader from "@/components/HomeHeader";
import HomePageMaine from "@/components/HomePageMain";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="h-screen flex flex-col">
      <HomeHeader session={session} />
      <HomePageMaine />
    </main>
  );
}
