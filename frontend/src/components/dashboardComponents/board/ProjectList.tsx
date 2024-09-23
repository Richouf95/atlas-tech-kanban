import React from "react";
import Link from "next/link";
import NewProjectModal from "@/components/modals/NewProjectModal";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Project } from "@/types";

function ProjectList({ roomList }: { roomList: any }) {
  const projects = useSelector((state: RootState) => state.projects.projects);

  return (
    <>
      <div className="p-2">
        <h1 className=" text-2xl mb-2">Pojects</h1>
        <hr />
        <div>
          <ul className="p-5 flex flex-wrap gap-5">
            {projects &&
              projects.length > 0 &&
              projects.map((project: Project) => (
                <li key={project._id} className="w-full sm:w-52">
                  <Link href={`/dashboard/project/${project._id}`}>
                    <div className="roomCard w-full h-28 rounded-lg flex items-center px-5">
                      <span className="text-xl">
                        {project.name || "Unnamed Room"}
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
