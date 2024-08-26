import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SettingsIcon from "@mui/icons-material/Settings";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useMediaQuery } from "@mui/material";
import Person2Icon from "@mui/icons-material/Person2";
import NotesIcon from "@mui/icons-material/Notes";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteBoardBtn from "./DeleteBoardBtn";
import NewCollaborator from "./NewCollaborator";
import CollaboaratorsList from "./CollaboaratorsList";
import UpdateBoardDescription from "./UpdateBoardDescription";

function BoardSettings({
  id,
  usersAccesses,
  metadata,
}: {
  id: string;
  usersAccesses: any;
  metadata: any;
}) {
  const [open, setOpen] = React.useState(false);
  const [addCollaborator, setAddCollaborator] = useState<boolean>(false);
  const [editDescription, setEditDescription] = useState<boolean>(false);

  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

  const toggleDrawer = (state: boolean) => () => {
    setOpen(state);
  };

  const handleContentClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const handleContentKeyDown = (event: React.KeyboardEvent) => {
    event.stopPropagation();
  };

  const list = (
    <Box
      sx={{
        width: isLargeScreen ? 350 : "auto",
        padding: 2,
      }}
      role="presentation"
      onClick={handleContentClick}
      onKeyDown={handleContentKeyDown}
    >
      <div>
        <h2 className="text-center text-2xl font-bold mb-2">Board Settings</h2>
      </div>
      <Divider />
      <div>
        <div className="flex text-lg gap-2 justify-center items-center my-2">
          <Person2Icon />
          <span>Board administrator</span>
        </div>
        <div className="flex justify-center gap-2 items-center gap-2 mb-5">
          <div className="h-16 w-16 rounded-full bg-orange-400"></div>
          <div>
            <h2 className="text-lg font-bold">{metadata.ownerName}</h2>
            <h3 className="text-lg">{metadata.ownerEmail}</h3>
          </div>
        </div>
        <Divider />
        <div className="my-2">
          <div className="flex justify-between items-center mb-2">
            <NotesIcon /> <span className="text-lg">Description</span>{" "}
            {!editDescription && (
              <button onClick={() => setEditDescription(true)}>Edit</button>
            )}
          </div>
          {editDescription ? (
            <UpdateBoardDescription id={id} currentDescription={metadata.description} setEditDescription={setEditDescription} />
          ) : (
            <div>
              <p>
                {metadata.description === "N/A"
                  ? "Describe your board here"
                  : metadata.description}
              </p>
            </div>
          )}
        </div>
      </div>
      <Divider />
      <div>
        <div className="flex justify-between items-center my-2">
          <span className="text-lg">Collaborators</span>{" "}
          {!addCollaborator && (
            <button onClick={() => setAddCollaborator(true)}>Add</button>
          )}
        </div>
        {addCollaborator && (
          <NewCollaborator id={id} setAddCollaborator={setAddCollaborator} />
        )}
        <CollaboaratorsList id={id} usersAccesses={usersAccesses} />
      </div>
      <Divider />
      <DeleteBoardBtn id={id} />
    </Box>
  );

  return (
    <div>
      <div
        onClick={toggleDrawer(true)}
        className="cursor-pointer"
        aria-label="Open settings"
      >
        <span>Settings</span> <SettingsIcon />
      </div>
      <Drawer
        anchor={isLargeScreen ? "right" : "bottom"}
        open={open}
        onClose={toggleDrawer(false)}
      >
        {list}
      </Drawer>
    </div>
  );
}

export default BoardSettings;
