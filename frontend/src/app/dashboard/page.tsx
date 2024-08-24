import BoardsList from "@/components/dashboardComponents/board/BoardsList";
import NewRoom from "@/components/forms/boardForms/NewRoom";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

async function DashBoardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4 mt-2">Your Boards</h1>
      <div className="mt-10">
        <NewRoom />
      </div>
      <div>
        <BoardsList />
      </div>
    </div>
  );
}

export default DashBoardPage;
