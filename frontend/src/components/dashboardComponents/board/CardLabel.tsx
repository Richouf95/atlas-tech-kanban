import { LabelType } from "@/types";
import { styled } from "@mui/material";
import React from "react";

function CardLabel({ id, label }: { id: string; label: LabelType | string }) {
  return (
    <div>
      {typeof label !== "string" && label.name !== "N/A" && (
        <span
          className={`px-4 py-1 rounded-xl`}
          style={{ backgroundColor: label.color }}
        >
          {label.name}
        </span>
      )}
    </div>
  );
}

export default CardLabel;
