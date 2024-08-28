import React from "react";
import CardModal from "@/components/modals/CardModal";
import { Card } from "@/types";

function BoardCard({
  name,
  id,
  index,
  columnId,
  assigned,
  dueDate,
  label,
  description,
}: Card) {
  const cardData = {
    name,
    id,
    index,
    columnId,
    assigned,
    dueDate,
    label,
    description,
  };
  return (
    <>
      <CardModal {...cardData} />
    </>
  );
}

export default BoardCard;
