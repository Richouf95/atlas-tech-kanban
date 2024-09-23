import React from "react";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import DashboardContainer from "@/components/dashboardComponents/DashboardContainer";

async function DashBoardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4 mt-2 uppercase">
        Your work space
      </h1>
      <DashboardContainer />
    </div>
  );
}

export default DashBoardPage;
