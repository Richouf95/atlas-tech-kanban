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
  setFilterParams,
}: {
  id: string;
  usersAccesses: any;
  metadata: any;
  setFilterParams: (items: any) => any;
}) {
  return (
    <nav
      className="p-5 sticky top-0 roomNavBar z-10"
      id="BoardMenu"
      aria-label="Board menu"
    >
      <ul className=" flex justify-end gap-5">
        <li>
          <FilterMenu
            setFilterParams={setFilterParams}
            id={id}
            usersAccesses={usersAccesses}
            metadata={metadata}
            aria-label="Filter board items"
          />
        </li>
        <li>
          <BoardSettings
            id={id}
            usersAccesses={usersAccesses}
            metadata={metadata}
            aria-label="Board settings"
          />
        </li>
      </ul>
    </nav>
  );
}

export default BoardMenu;
