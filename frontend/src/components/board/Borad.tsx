import React from "react";
import NewBoardColumnForm from "@/components/forms/boardForms/NewBoardColumnForm";
import BoardContainer from "./BoardContainer";

function Borad() {
  return (
    <div className="mb-20 p-5 flex mr-10">
      <div>
        <BoardContainer />
      </div>
      <div className="min-w-64 max-w-64 mx-5 pr-5 border">
        <NewBoardColumnForm />
      </div>
    </div>
  );
}

export default Borad;
