import React from "react";
import CloseIcon from "@mui/icons-material/Close";

function FilterHeader({ onClose }: { onClose: () => void }) {
  return (
    <div className="grid grid-cols-12 my-2">
      <div className="col-span-11">
        <h2 className="text-center text-xl font-bold">Filter</h2>
      </div>
      <div className="col-span-1 cursor-pointer" onClick={onClose}>
        <CloseIcon />
      </div>
    </div>
  );
}

export default FilterHeader;
