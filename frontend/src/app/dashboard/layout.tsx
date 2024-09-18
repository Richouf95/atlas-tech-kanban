import React from "react";
import DashboardHeader from "@/components/dashboardComponents/DashboardHeader";
import DashboardMenu from "@/components/dashboardComponents/DashboardMenu";
import DashboardChildren from "@/components/DashboardChildren";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";

export default async function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const userEmail = session?.user?.email;

  return (
    <div className="mx-auto h-screen">
      <div className="flex flex-col flex-1">
        <DashboardHeader />
        <main className="flex flex-col lg:flex-row flex-1 h-full">
          {userEmail && <DashboardMenu userEmail={userEmail} />}
          <DashboardChildren>{children}</DashboardChildren>
        </main>
      </div>
    </div>
  );
}
