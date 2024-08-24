import { liveblocksClient } from "@/lib/liveblocksClient";
import { RoomData } from "@liveblocks/node";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { User } from "@/types";
import { getUserEmail } from "@/lib/userClient";

async function BoardsList() {
  const userEmail = await getUserEmail();
  const { data: rooms } = await liveblocksClient.getRooms({
    userId: userEmail,
  });
  return (
    <div>
      <h1 className="mb-10">BoardsList</h1>
      <ul>
        {rooms.length > 0 &&
          rooms.map((room: RoomData) => (
            <Link
              className="btn mx-1"
              key={room.id}
              href={`/dashboard/board/${room.id}`}
            >
              {room.metadata?.boardName || "Unnamed Room"}
            </Link>
          ))}
      </ul>
    </div>
  );
}

export default BoardsList;
