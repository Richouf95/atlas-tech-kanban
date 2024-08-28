import React from "react";
import DashboardHeader from "@/components/dashboardComponents/DashboardHeader";
import DashboardMenu from "@/components/dashboardComponents/DashboardMenu";
import DashboardChildren from "@/components/DashboardChildren";

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto h-screen">
      <div className="flex flex-col flex-1">
        <DashboardHeader />
        <main className="flex flex-col lg:flex-row flex-1 h-full">
          <DashboardMenu />
          <DashboardChildren>
            {children}
          </DashboardChildren>
        </main>
      </div>
    </div>
  );
}
