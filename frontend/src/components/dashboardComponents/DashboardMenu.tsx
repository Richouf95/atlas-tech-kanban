import React from "react";
import DashBoardMenuContent from "../DashBoardMenuContent";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

async function DashboardMenu() {

  const session = await getServerSession(authOptions);

  const userEmail = session?.user?.email;

  return (
    <DashBoardMenuContent userEmail={userEmail ? userEmail : ""} />
  );
}

export default DashboardMenu;
