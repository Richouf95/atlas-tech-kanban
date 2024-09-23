"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { createProject } from "@/lib/projectActions";
import { setProjects } from "@/store/reducers/projects/projectSlice";
import { RootState } from "@/store/store";
import { Project } from "@/types";

function NewProjectForm() {
  const [newProjectName, setNewProjectName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const projects = useSelector((state: RootState) => state.projects.projects);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleNewRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    const project = await createProject(newProjectName);
    if (project && projects) {
      const projectsUpdated: Project[] = [...projects, project];
      dispatch(setProjects(projectsUpdated));
      router.push(`/dashboard/project/${project._id}`);
    }
  };

  return (
    <form onSubmit={handleNewRoom} className="create">
      <Box sx={{ width: 1 }}>
        <h1 className="text-2xl mb-2 text-center">Create new project</h1>
        <FormControl sx={{ width: 1 }} variant="outlined">
          <TextField
            className="textInputForm"
            label="Project name"
            variant="outlined"
            type="text"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
          />
        </FormControl>
        <div>
          <button
            type="submit"
            className="w-full mx-auto mt-5"
            onClick={() => setIsLoading(true)}
          >
            {isLoading && <Spinner />} Create
          </button>
        </div>
      </Box>
    </form>
  );
}

export default NewProjectForm;
