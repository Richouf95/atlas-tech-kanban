import { Project } from "@/types";

export async function createProject(name: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/project/create-project`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
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