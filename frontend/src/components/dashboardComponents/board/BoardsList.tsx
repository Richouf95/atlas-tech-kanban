"use client"

import { liveblocksClient } from "@/lib/liveblocksClient";
import { RoomData } from "@liveblocks/node";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { User } from "@/types";

function BoardsList() {
  const [rooms, setRooms] = useState<RoomData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const user: User | null = useSelector((state: RootState) => state.auth.user);

  const getRooms = async (email: string): Promise<void> => {
    try {
      const response = await liveblocksClient.getRooms({ userId: email });
      setRooms(response.data);
    } catch (err) {
      setError("Failed to fetch rooms");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      const email = user.email;
      getRooms(email);
    }
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1 className="mb-10">BoardsList</h1>
      <ul>
        {rooms.length >0 && rooms.map((room: RoomData) => (
          <Link
            className="btn"
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
