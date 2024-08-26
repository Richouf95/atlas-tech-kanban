"use client";

import React from "react";
import { RoomData } from "@liveblocks/node";
import Link from "next/link";
import NewRoomModal from "@/components/modals/NewRoomModal";
import { usePathname } from "next/navigation";
import NewProjectRoom from "@/components/forms/boardForms/NewProjectRoom";

function BoardsList({ roomList }: { roomList: any }) {
  const pathName = usePathname();

  console.log(roomList);

  return (
    <>
      <div className="p-2">
        <h1 className=" text-2xl mb-2">Boards</h1>
        <hr />
        <div>
          <ul className="p-5 flex flex-wrap gap-5">
            {roomList.length > 0 &&
              roomList.map((room: RoomData) => (
                <li key={room.id} className="w-full sm:w-52">
                  <Link
                    href={
                      pathName === "/dashboard"
                        ? `/dashboard/board/${room.id}`
                        : `/dashboard/project/${room.metadata.projectId}/board/${room.id}`
                    }
                  >
                    <div className="roomCard w-full h-28 rounded-lg flex items-center px-5">
                      <span className="text-xl">
                        {room.metadata?.boardName || "Unnamed Room"}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            <li className="w-full sm:w-52">
              <NewRoomModal />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default BoardsList;
