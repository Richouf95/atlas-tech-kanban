"use client";

import React from "react";
import CardDescriptionModal from "@/components/modals/CardDescriptionModal";

function CardDescription({
  id,
  name,
  description,
}: {
  id: string;
  name: string;
  description?: string;
}) {
  return (
    <div className="mb-5">
      <CardDescriptionModal id={id} name={name} description={description} />
      <p className="mx-4">
        {description ? description : "Describe your cards here ..."}
      </p>
    </div>
  );
}

export default CardDescription;
