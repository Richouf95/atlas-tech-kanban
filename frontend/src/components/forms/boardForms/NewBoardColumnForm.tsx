"use client"

import React, { FormEvent, useState } from "react";

function NewBoardColumnForm() {
  const [editMode, setEditMode] = useState<boolean>(false);
  const handleNewBoardColum = (e: FormEvent) => {
    e.preventDefault();
    setEditMode(false);
    alert("hehe");
  };
  return (
    <>
      {!editMode && (
        <button onClick={() => setEditMode(true)} className="w-full bg-[#F4F4F4]">Clique sur moi</button>
      )}
      {editMode && (
        <form onSubmit={handleNewBoardColum} className="p-2 rounded-md bg-[#F4F4F4] shadow">
          <div className="my-1 w-full"><input type="text" placeholder="écris" className="w-full"/></div>
          <div className="mt-3 flex gap-2">
              <button type="submit" className="flex-1">submit</button>
              <button className="flex-1">Cancel</button>
          </div>
        </form>
      )}
    </>
  );
}

export default NewBoardColumnForm;
