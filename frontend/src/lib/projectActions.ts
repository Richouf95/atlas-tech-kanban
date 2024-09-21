"use server";

import { Project } from "@/types";
import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

export async function createProject(name: string) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error("User session is not available");
  }

  const email = session?.user?.email as string;
  const currentUserName = session?.user?.name as string;

  if (!email || !currentUserName) {
    throw new Error("Failed to Create Project => userEmail & userName");
  }

  const newProject = {
    name,
    ownerName: currentUserName,
    ownerEmail: email,
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/project/create-project`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to Create Project");
    }

    const data: Project = await response.json();

    return data;
  } catch (error: any) {
    console.error("Error while creating Project", error.message);
  }
}

export async function getAllProjects() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/project/all-projects`
    );

    if (!response.ok) {
      throw new Error("Failed to Fetching Projects");
    }

    const data: Project[] = await response.json();

    return data;
  } catch (error: any) {
    console.error("Error while Fetching Projects", error.message);
  }
}

export async function getProject(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/project/${id}`
    );

    if (!response.ok) {
      throw new Error("Failed to Fetching Project");
    }

    const data: Project = await response.json();

    return data;
  } catch (error: any) {
    console.error("Error while Fetching Project", error.message);
  }
}

export async function newCollaboratorOnProject (id: string, newCollaboratorList: any) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/project/${id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usersAccesses: newCollaboratorList }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to add new collaborator on project");
  }

  const data: Project = await response.json();
  return data;
}