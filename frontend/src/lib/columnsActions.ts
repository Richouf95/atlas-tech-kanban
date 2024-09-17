import { Column } from "@/types";

export async function createColumn(
  name: string,
  index: number,
  boardId: string
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/column/create-column`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          index,
          boardId,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to Create column");
    }

    const data: Column = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error while creating Column", error.message);
  }
}

export async function getAllColumns(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/column?boardId=${id}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch boards");
  }

  //   const data: Board[] = await response.json();
  const data: Column[] = await response.json();
  return data;
}

export async function updateColumnOrder(id: string, index: number) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/column/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ index }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update column order");
    }

    const data: Column = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error while update column order", error.message);
  }
}

export async function updateColumnName(id: string, name: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/column/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update column name");
    }

    const data: Column = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error while update column name", error.message);
  }
}

export async function deleteColumn(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/column/${id}`,
      { method: "DELETE" }
    );

    if (!response.ok) {
      throw new Error("Failed to delete column");
    }

    const data: Column = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error while delete column", error.message);
  }
}
