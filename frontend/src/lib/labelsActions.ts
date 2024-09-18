import { LabelType } from "@/types";

export async function createLabel(
  name: string,
  color: string,
  boardId: string
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/label/create-label`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          color,
          boardId,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to Create Label");
    }

    const data: LabelType = await response.json();

    return data;
  } catch (error: any) {
    console.error("Error while creating Label", error.message);
  }
}

export async function getAllLabels(boardId: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/label?boardId=${boardId}`
    );

    if (!response.ok) {
      throw new Error("Failed to Fetch Label");
    }

    const data: LabelType[] = await response.json();

    return data;
  } catch (error: any) {
    console.error("Error while fetching Label", error.message);
  }
}

export async function assignedCardLabel(cardId: string, labelId: string) {
  
}
