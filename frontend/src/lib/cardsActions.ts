import { useMutation } from "@/app/liveblocks.config";
import { Card } from "@/types";
import { LiveList } from "@liveblocks/client";
import { LiveObject } from "@liveblocks/core";

export async function createCards(
  name: string,
  index: number,
  columnId: string,
  boardId: string
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/card/create-card`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          index,
          columnId,
          boardId,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to Create Card");
    }

    const data: Card = await response.json();

    return data;
  } catch (error: any) {
    console.error("Error while creating Card", error.message);
  }
}

export async function getAllCards(boardId: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/card/all-cards/?boardId=${boardId}`
    );

    if (!response.ok) {
      throw new Error("Failed to Fetch Cards");
    }

    const data: Card[] = await response.json();

    return data;
  } catch (error: any) {
    console.error("Error while fetching Cards", error.message);
  }
}

export async function updateCardName(id: string, name: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/card/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update Card name");
    }

    const data: Card = await response.json();

    return data;
  } catch (error: any) {
    console.error("Error while updating Card name", error.message);
  }
}

export async function updateCardOrder(
  id: string,
  columnId: string,
  index: number
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/card/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ columnId, index }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update Card order");
    }

    const data: Card = await response.json();

    return data;
  } catch (error: any) {
    console.error("Error while updating Card order", error.message);
  }
}

export async function updateAssignment(id: string, user: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/card/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assigned: user }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update Card Assignment");
    }

    const data: Card = await response.json();

    return data;
  } catch (error: any) {
    console.error("Error while updating Card Assignment", error.message);
  }
}

export async function updateCardDescription(id: string, description: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/card/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update Card description");
    }

    const data: Card = await response.json();

    return data;
  } catch (error: any) {
    console.error("Error while updating Card description", error.message);
  }
}

export async function updateCardDueDate(id: string, selectedDate: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/card/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dueDate: selectedDate }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update Card dueDate");
    }

    const data: Card = await response.json();

    return data;
  } catch (error: any) {
    console.error("Error while updating Card dueDate", error.message);
  }
}

export async function updateCardLabel(id: string, labelId: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/card/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label: labelId }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update Card Label");
    }

    const data: Card = await response.json();

    return data;
  } catch (error: any) {
    console.error("Error while updating Card Label", error.message);
  }
}

export async function deleteCard(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/card/${id}`,
      { method: "DELETE" }
    );

    if (!response.ok) {
      throw new Error("Failed to delete Card");
    }

    const data: Card = await response.json();

    return data;
  } catch (error: any) {
    console.error("Error while deleting Card", error.message);
  }
}
