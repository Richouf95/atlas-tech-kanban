import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import { deleteBoard } from "@/lib/boardActions";
import { useRouter } from "next/navigation";
import BoardSettings from "./BoardSettings";

function BoardMenu({
  id,
  usersAccesses,
  metadata,
}: {
  id: string;
  usersAccesses: any;
  metadata: any;
}) {
  return (
    <div
      className="bg-red-300 p-5 sticky top-0 flex justify-end p-2 roomNavBar"
      id="BoardMenu"
    >
      <BoardSettings id={id} usersAccesses={usersAccesses} metadata={metadata} />
    </div>
  );
}

export default BoardMenu;
