"use client"
import BoardsList from "@/components/dashboardComponents/board/BoardsList";
import Borad from "@/components/dashboardComponents/board/Borad";
import NewRoom from "@/components/forms/boardForms/NewRoom";
import React, { useEffect, useState } from "react";

function DashBoardPage() {
  return (
    <div>
      <div className="mt-10">
        <NewRoom />
      </div>
      <div>
        <BoardsList />
      </div>
      {/* <Borad /> */}
    </div>
  );
}

export default DashBoardPage;
