import React from "react";

function BoardCard({ id, name }: { id: string; name: string }) {
  return <div className="p-5 my-2 rounded-xl columCards cursor-pointer">
    {name}
  </div>;
}

export default BoardCard;
