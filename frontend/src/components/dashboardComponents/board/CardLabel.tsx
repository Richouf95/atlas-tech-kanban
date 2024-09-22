import { RootState } from "@/store/store";
import { LabelType } from "@/types";
import { styled } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

function CardLabel({ id, label }: { id: string; label?: LabelType | string }) {
  const labels = useSelector((state: RootState) => state.labels.labels);
  const thisLabel = labels?.filter(x => x._id === label)[0];
  return (
    <div>
      {thisLabel && (
        <span
          className={`px-4 py-1 rounded-xl`}
          style={{ backgroundColor: thisLabel.color }}
        >
          {thisLabel.name}
        </span>
      )}
      {label && typeof label !== "string" && (
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
