"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { User } from "@/types";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import Borad from "@/components/dashboardComponents/board/Borad";
import { LiveList, LiveObject } from "@liveblocks/client";
import { Column } from "@/app/liveblocks.config";

function BoardPage({ params }: { params: { boardId: string } }) {
  const { boardId } = params;

  const user: User | null = useSelector((state: RootState) => state.auth.user);

  const newColumns:LiveObject<Column>[] = [];

  // return (
  //   <Borad />
  // );
  return <div>BoardPage</div>;
}

export default BoardPage;