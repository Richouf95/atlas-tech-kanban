"use client";

import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import DescriptionIcon from "@mui/icons-material/Description";
import EditIcon from "@mui/icons-material/Edit";
import CardDescriptionModal from "@/components/modals/CardDescriptionModal";

function CardDescription({ id, name, description }: { id: string; name: string, description: string }) {
  return (
    <div className="mb-5">
      <CardDescriptionModal id={id} name={name} description={description} />
      <p className="mx-4">{description !== "N/A" ? description : "No description"}</p>
    </div>
  );
}

export default CardDescription;
