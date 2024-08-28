import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { useMediaQuery } from "@mui/material";
import NotesIcon from "@mui/icons-material/Notes";
import DeleteBoardBtn from "./DeleteBoardBtn";
import NewCollaborator from "./NewCollaborator";
import CollaboaratorsList from "./CollaboaratorsList";
import UpdateBoardDescription from "./UpdateBoardDescription";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useStorage } from "@/app/liveblocks.config";
import { shallow } from "@liveblocks/client";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CardLabel from "./CardLabel";

function FilterMenu({
  id,
  usersAccesses,
  metadata,
}: {
  id: string;
  usersAccesses: any;
  metadata: any;
}) {
  const [open, setOpen] = React.useState(false);
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const [openColumnsFilter, setOpenColumnsFilter] = useState<boolean>(false);
  const [openAssignedToFilter, setOpenAssignedToFilter] =
    useState<boolean>(false);
  const [openDueDateFilter, setOpenDueDateFilter] = useState<boolean>(false);
  const [openLabelsFilter, setOpenLabelsFilter] = useState<boolean>(false);
  const [searchKey, setSearchKey] = useState<string>("");

  const columns = useStorage(
    (root) => root.columns.map((col) => ({ ...col })),
    shallow
  );

  const cards = useStorage(
    (root) => root.cards.map((card) => ({ ...card })),
    shallow
  );

  const lables = useStorage(
    (root) => root.labels.map((label) => ({ ...label })),
    shallow
  );

  const collaborators = Object.keys(usersAccesses);

  const toggleDrawer = (state: boolean) => () => {
    setOpen(state);
  };

  const handleContentClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const handleContentKeyDown = (event: React.KeyboardEvent) => {
    event.stopPropagation();
  };
  return (
    <div>
      <div
        onClick={toggleDrawer(true)}
        className="cursor-pointer"
        aria-label="Open settings"
      >
        <FilterListIcon /> <span>Filter</span>
      </div>
      <Drawer
        anchor={isLargeScreen ? "right" : "bottom"}
        open={open}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{
            width: isLargeScreen ? 350 : "auto",
            padding: 2,
          }}
          role="presentation"
          onClick={handleContentClick}
          onKeyDown={handleContentKeyDown}
        >
          <div className="grid grid-cols-12 my-2">
            <div className="col-span-11">
              <h2 className="text-center text-xl font-bold">Filter</h2>
            </div>
            <div
              className="col-span-1 cursor-pointer"
              onClick={toggleDrawer(false)}
            >
              <CloseIcon />
            </div>
          </div>
          <Divider />
          <div>
            <input
              type="text"
              name="Search Key"
              id="Search Key"
              autoFocus
              placeholder={"Search by keyword ..."}
              onChange={(e) => setSearchKey(e.target.value)}
              className="w-full text-black border my-4"
            />
          </div>
          <Divider />
          <div>
            <h3
              className="cursor-pointer font-bold flex items-center p-2"
              onClick={() => setOpenColumnsFilter(!openColumnsFilter)}
            >
              Columns
              <KeyboardArrowDownIcon
                className={`ml-2 transform transition-transform duration-300 ${
                  openColumnsFilter ? "rotate-180" : "rotate-0"
                }`}
              />
            </h3>
            <div
              className={`transition-height duration-300 ${
                openColumnsFilter ? "max-h-[1000px]" : "max-h-0"
              } overflow-hidden`}
            >
              <ul>
                <li className="px-4 py-2 flex items-center gap-2">
                  <input
                    className="cursor-pointer w-4 h-4"
                    type="checkbox"
                    id={"noColumns"}
                    name={"noColumns"}
                  />
                  <label className="cursor-pointer" htmlFor={"noColumns"}>
                    <SpaceDashboardIcon /> All columns
                  </label>
                </li>
                {columns?.map((col) => (
                  <li
                    key={col.id}
                    className="px-4 py-2 flex items-center gap-2"
                  >
                    <input
                      className="cursor-pointer w-4 h-4"
                      type="checkbox"
                      id={col.name}
                      name={col.name}
                    />
                    <label className="cursor-pointer" htmlFor={col.name}>
                      <SpaceDashboardIcon /> {col.name}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Divider />
          <div>
            <h3
              className="cursor-pointer font-bold flex items-center p-2"
              onClick={() => setOpenAssignedToFilter(!openAssignedToFilter)}
            >
              Assign to
              <KeyboardArrowDownIcon
                className={`ml-2 transform transition-transform duration-300 ${
                  openAssignedToFilter ? "rotate-180" : "rotate-0"
                }`}
              />
            </h3>
            <div
              className={`transition-height duration-300 ${
                openAssignedToFilter ? "max-h-[1000px]" : "max-h-0"
              } overflow-hidden`}
            >
              <ul>
                <li className="px-4 py-2 flex items-center gap-2">
                  <input
                    className="cursor-pointer w-4 h-4"
                    type="checkbox"
                    id={"Nobody"}
                    name={"Nobody"}
                  />
                  <label className="cursor-pointer" htmlFor={"Nobody"}>
                    <AccountCircleIcon /> No body
                  </label>
                </li>
                {collaborators.map((email) => (
                  <li key={email} className="px-4 py-2 flex items-center gap-2">
                    <input
                      className="cursor-pointer w-4 h-4"
                      type="checkbox"
                      id={email}
                      name={email}
                    />
                    <label className="cursor-pointer" htmlFor={email}>
                      <AccountCircleIcon /> {email}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Divider />
          <div>
            <h3
              className="cursor-pointer font-bold flex items-center p-2"
              onClick={() => setOpenDueDateFilter(!openDueDateFilter)}
            >
              Due Date
              <KeyboardArrowDownIcon
                className={`ml-2 transform transition-transform duration-300 ${
                  openDueDateFilter ? "rotate-180" : "rotate-0"
                }`}
              />
            </h3>
            <div
              className={`transition-height duration-300 ${
                openDueDateFilter ? "max-h-[1000px]" : "max-h-0"
              } overflow-hidden`}
            >
              <ul>
                <li className="px-4 py-2 flex items-center gap-2">
                  <input
                    className="cursor-pointer w-4 h-4"
                    type="checkbox"
                    id={"noDeadline"}
                    name={"noDeadline"}
                  />
                  <label className="cursor-pointer" htmlFor={"noDeadline"}>
                    <CalendarMonthIcon /> No deadline
                  </label>
                </li>
                <li className="px-4 py-2 flex items-center gap-2">
                  <input
                    className="cursor-pointer w-4 h-4"
                    type="checkbox"
                    id={"overdue"}
                    name={"overdue"}
                  />
                  <label className="cursor-pointer" htmlFor={"overdue"}>
                    <AccessTimeIcon className="bg-red-300 rounded-full" />{" "}
                    Overdue
                  </label>
                </li>
                <li className="px-4 py-2 flex items-center gap-2">
                  <input
                    className="cursor-pointer w-4 h-4"
                    type="checkbox"
                    id={"dueTomorrow"}
                    name={"dueTomorrow"}
                  />
                  <label className="cursor-pointer" htmlFor={"dueTomorrow"}>
                    <AccessTimeIcon className="bg-orange-300 rounded-full" />{" "}
                    Due tomorrow
                  </label>
                </li>
              </ul>
            </div>
          </div>
          <Divider />
          <div>
            <h3
              className="cursor-pointer font-bold flex items-center p-2"
              onClick={() => setOpenLabelsFilter(!openLabelsFilter)}
            >
              Labels
              <KeyboardArrowDownIcon
                className={`ml-2 transform transition-transform duration-300 ${
                  openLabelsFilter ? "rotate-180" : "rotate-0"
                }`}
              />
            </h3>
            <div
              className={`transition-height duration-300 ${
                openLabelsFilter ? "max-h-[1000px]" : "max-h-0"
              } overflow-hidden`}
            >
              <ul>
                <li className="px-4 py-2 flex items-center gap-2">
                  <input
                    className="cursor-pointer w-4 h-4"
                    type="checkbox"
                    id={"withOurLabel"}
                    name={"withOurLabel"}
                  />
                  <label className="cursor-pointer" htmlFor={"withOurLabel"}>
                    <AccessTimeIcon className="bg-orange-300 rounded-full" />{" "}
                    With out label
                  </label>
                </li>
                {lables &&
                  lables.length > 0 &&
                  lables.map((label) => (
                    <li key={label.id} className="px-4 py-2 flex items-center gap-2">
                      <input
                        className="cursor-pointer w-4 h-4"
                        type="checkbox"
                        id={label.name}
                        name={label.name}
                      />
                      <label className="cursor-pointer" htmlFor={label.name}>
                        <span
                          className={`px-4 py-1 rounded-xl`}
                          style={{ backgroundColor: label.color }}
                        >
                          {label.name}
                        </span>
                      </label>
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          <Divider />
          <div>
            <button className="w-full my-3">Clear filter</button>
          </div>
        </Box>
      </Drawer>
    </div>
  );
}

export default FilterMenu;
