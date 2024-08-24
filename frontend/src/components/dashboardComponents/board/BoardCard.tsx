import React from "react";

function BoardCard({ id, name }: { id: string; name: string }) {
  return <div className="p-5 border my-5 bg-white">
    hehe {name}
  </div>;
}

export default BoardCard;
