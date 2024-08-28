import React from "react";
import { RoomData } from "@liveblocks/node";
import Link from "next/link";
import NewProjectModal from "@/components/modals/NewProjectModal";

function ProjectList({ roomList }: { roomList: any }) {
  // Grouper par projectId
  const groupedByProject = roomList.reduce((acc: any, room: any) => {
    const projectId = room.metadata.projectId;
    if (!acc[projectId]) {
      acc[projectId] = [];
    }
    acc[projectId].push(room);
    return acc;
  }, {});

  // Trier chaque groupe par createdAt
  for (const projectId in groupedByProject) {
    groupedByProject[projectId].sort(
      (a: any, b: any) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }

  // Récupérer le plus ancien élément de chaque groupe
  const projects = Object.values(groupedByProject).map(
    (group: any) => group[0]
  );

  return (
    <>
      <div className="p-2">
        <h1 className=" text-2xl mb-2">Pojects</h1>
        <hr />
        <div>
          <ul className="p-5 flex flex-wrap gap-5">
            {projects.length > 0 &&
              projects.map((room: RoomData) => (
                <li key={room.id} className="w-full sm:w-52">
                  <Link href={`/dashboard/project/${room.metadata.projectId}`}>
                    <div className="roomCard w-full h-28 rounded-lg flex items-center px-5">
                      <span className="text-xl">
                        {room.metadata?.boardName || "Unnamed Room"}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            <li className="w-full sm:w-52">
              <NewProjectModal />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default ProjectList;
