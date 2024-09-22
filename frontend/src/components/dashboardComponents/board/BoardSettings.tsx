import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import SettingsIcon from "@mui/icons-material/Settings";
import { useMediaQuery } from "@mui/material";
import NotesIcon from "@mui/icons-material/Notes";
import DeleteBoardBtn from "./DeleteBoardBtn";
import NewCollaborator from "./NewCollaborator";
import CollaboaratorsList from "./CollaboaratorsList";
import UpdateBoardDescription from "./UpdateBoardDescription";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

function BoardSettings() {

  const thisBoard = useSelector((state: RootState) => state.board.board);

  const [open, setOpen] = useState(false);
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

  if (!thisBoard) return null;

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
      <Divider className="divider" />
      <div>
        <div className="flex text-lg gap-2 justify-center items-center my-2">
          <span>Administrator</span>
        </div>
        <div className="flex justify-center gap-2 items-center mb-5">
          <AccountCircleIcon sx={{ fontSize: 60 }} />
          <div>
            <h2 className="text-lg font-bold">{thisBoard.ownerName}</h2>
            <h3 className="text-lg">{thisBoard.ownerEmail}</h3>
          </div>
        </div>
        <Divider className="divider" />
        <div className="my-2">
          <div className="flex justify-between items-center mb-2">
            <NotesIcon /> <span className="text-lg">Description</span>{" "}
            {!editDescription && (
              <button onClick={() => setEditDescription(true)}>Edit</button>
            )}
          </div>
          {editDescription ? (
            <UpdateBoardDescription
              id={thisBoard._id}
              currentDescription={thisBoard.description as string}
              setEditDescription={setEditDescription}
            />
          ) : (
            <div>
              <p>
                {!thisBoard.description
                  ? "Describe your board here"
                  : thisBoard.description}
              </p>
            </div>
          )}
        </div>
      </div>
      <Divider className="divider" />
      <div>
        <div className="flex justify-between items-center my-2">
          <span className="text-lg">Collaborators</span>{" "}
          {!addCollaborator && (
            <button onClick={() => setAddCollaborator(true)}>Add</button>
          )}
        </div>
        {addCollaborator && (
          <NewCollaborator id={thisBoard._id} setAddCollaborator={setAddCollaborator} usersAccesses={thisBoard.usersAccesses} projectId={thisBoard.projectId} />
        )}
        <CollaboaratorsList id={thisBoard._id} usersAccesses={thisBoard.usersAccesses} />
      </div>
      <Divider className="divider" />
      <DeleteBoardBtn id={thisBoard._id} />
    </Box>
  );

  return (
    <div>
      <button
        onClick={toggleDrawer(true)}
        className="cursor-pointer specialBtn"
        aria-label="Open settings"
        tabIndex={0}
      >
        <SettingsIcon /> <span>Settings</span> 
      </button>
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
