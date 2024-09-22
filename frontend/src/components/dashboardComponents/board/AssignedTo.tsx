"use client";

import * as React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import Skeleton from "@mui/material/Skeleton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useMutation } from "@/app/liveblocks.config";
import { Card } from "@/types";
import { usePathname } from "next/navigation";
import { liveblocksClient } from "@/lib/liveblocksClient";
import { updateAssignment } from "@/lib/cardsActions";
import { setCards } from "@/store/reducers/cards/cardsSlice";

function AssignedTo({ id, assigned }: { id: string; assigned?: string }) {
  // const [users, setUsers] = React.useState<string[] | null>(null);
  const theme = useSelector((store: RootState) => store.theme.theme);
  const board = useSelector((state: RootState) => state.board.board);
  const cards = useSelector((state: RootState) => state.cards.cards);
  const usersAccesses = board && Object.keys(board?.usersAccesses);
  const dispatch = useDispatch();

  // const pathName = usePathname();
  // const spltitedPath = pathName.split("/");
  // const boardId = spltitedPath[spltitedPath.length - 1];

  // React.useEffect(() => {
  //   const fetchUsers = async () => {
  //     const response = await liveblocksClient.getRoom(boardId);
  //     const usersAccesses = response.usersAccesses;
  //     const userList = Object.keys(usersAccesses);
  //     setUsers(userList);
  //   };

  //   fetchUsers();
  // }, []);

  // const updateAssignment = useMutation(({ storage }, cardId, updateData) => {
  //   const cards = storage.get("cards");
  //   const index = cards.findIndex((card) => card.toObject().id === cardId);
  //   const thisCard = storage.get("cards").get(index);
  //   for (let key in updateData) {
  //     thisCard?.set(key as keyof Card, updateData[key]);
  //   }
  // }, []);

  const assignment = React.useCallback(async (id: string, user: string) => {
    try {
      const response = await updateAssignment(id, user);
      if (response && cards) {
        const cardsUpdated = cards.map((card) =>
          card._id === id ? { ...card, assigned: user } : card
        );
        dispatch(setCards(cardsUpdated));
      }
    } catch (error) {
      console.error("Erreur lors de l'assignement :", error);
    }
  }, []);

  return (
    <div className="text-end">
      {usersAccesses && (
        <PopupState variant="popover" popupId="demo-popup-popover">
          {(popupState) => (
            <div>
              {assigned && <p className="mr-2">Assigned To :</p>}
              <div>
                {assigned && (
                  <p
                    {...bindTrigger(popupState)}
                    className={`cursor-pointer px-4 py-2 rounded-lg mt-1 ${
                      theme === "light" ? "bg-[#D7D7D7]" : "bg-[#212121]"
                    }`}
                  >
                    @{assigned}
                  </p>
                )}
                {!assigned && (
                  <p
                    {...bindTrigger(popupState)}
                    className={`cursor-pointer px-4 py-2 rounded-lg mt-1 ${
                      theme === "light" ? "bg-[#D7D7D7]" : "bg-[#212121]"
                    }`}
                  >
                    Assign to someone
                  </p>
                )}
              </div>
              <Popover
                {...bindPopover(popupState)}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: 80,
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <div className="min-w-64">
                  {usersAccesses.map((user: string) => (
                    <span
                      key={user}
                      onClick={() => {
                        assignment(id, user);
                        popupState.close();
                      }}
                      className={`block p-2 ${
                        theme === "light" ? "bg-[#D7D7D7]" : "bg-[#212121]"
                      } cursor-pointer m-2 rounded-lg`}
                    >
                      {user}
                    </span>
                  ))}
                  {!usersAccesses && (
                    <Typography component="div" variant={"h1"}>
                      <Skeleton />
                    </Typography>
                  )}
                </div>
              </Popover>
            </div>
          )}
        </PopupState>
      )}
    </div>
  );
}

export default AssignedTo;
