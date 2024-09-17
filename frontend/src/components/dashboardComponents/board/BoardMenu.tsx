import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import { deleteBoard } from "@/lib/boardActions";
import { useRouter } from "next/navigation";
import BoardSettings from "./BoardSettings";
import FilterMenu from "./FilterMenu";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

function BoardMenu({
  setFilterParams,
}: {
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
            aria-label="Filter board items"
          />
        </li>
        <li>
          <BoardSettings
            aria-label="Board settings"
          />
        </li>
      </ul>
    </nav>
  );
}

export default BoardMenu;
