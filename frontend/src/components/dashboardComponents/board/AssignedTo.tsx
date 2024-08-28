"use client";

import * as React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import Skeleton from "@mui/material/Skeleton";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useMutation } from "@/app/liveblocks.config";
import { Card } from "@/types";

function AssignedTo({ id, assigned }: { id: string; assigned: string }) {
  const [users, setUsers] = React.useState<any>();
  const theme = useSelector((store: RootState) => store.theme.theme);

  const router = useRouter();

  React.useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/allusers");
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const updateAssignment = useMutation(({ storage }, cardId, updateData) => {
    const cards = storage.get("cards");
    const index = cards.findIndex((card) => card.toObject().id === cardId);
    const thisCard = storage.get("cards").get(index);
    for (let key in updateData) {
      thisCard?.set(key as keyof Card, updateData[key]);
    }
  }, []);

  return (
    <div className="text-end">
      <PopupState variant="popover" popupId="demo-popup-popover">
        {(popupState) => (
          <div>
            {assigned != "N/A" && <p className="mr-2">Assigned To :</p>}
            <div>
              {assigned != "N/A" && (
                <p
                  {...bindTrigger(popupState)}
                  className={`cursor-pointer px-4 py-2 rounded-lg mt-1 ${
                    theme === "light" ? "bg-[#D7D7D7]" : "bg-[#212121]"
                  }`}
                >
                  @{assigned}
                </p>
              )}
              {
                assigned === "N/A" &&             <p
                {...bindTrigger(popupState)}
                className={`cursor-pointer px-4 py-2 rounded-lg mt-1 ${
                  theme === "light" ? "bg-[#D7D7D7]" : "bg-[#212121]"
                }`}
              >
                Assign to someone
              </p>
              }
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
                {users ? (
                  users.map((user: any) => (
                    <span
                      key={user.id}
                      onClick={() => {
                        updateAssignment(id, { assigned: user.id });
                        popupState.close();
                      }}
                      className={`block p-2 ${
                        theme === "light" ? "bg-[#D7D7D7]" : "bg-[#212121]"
                      } cursor-pointer m-2 rounded-lg`}
                    >
                      {user.id}
                    </span>
                  ))
                ) : (
                  <Typography component="div" variant={"h1"}>
                    <Skeleton />
                  </Typography>
                )}
              </div>
            </Popover>
          </div>
        )}
      </PopupState>
    </div>
  );
}

export default AssignedTo;
