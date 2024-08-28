import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import { deleteBoard } from "@/lib/boardActions";
import { useRouter } from "next/navigation";
import BoardSettings from "./BoardSettings";
import FilterMenu from "./FilterMenu";

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
      className="p-5 sticky top-0 flex justify-end p-2 gap-5 roomNavBar"
      id="BoardMenu"
    >
      <FilterMenu id={id} usersAccesses={usersAccesses} metadata={metadata} />
      <BoardSettings
        id={id}
        usersAccesses={usersAccesses}
        metadata={metadata}
      />
    </div>
  );
}

export default BoardMenu;
