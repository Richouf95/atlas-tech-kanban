"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import { signOut } from "next-auth/react";

function UserMenuBtn({ session }: { session: any }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const user = session?.user;

  if (!user) {
    router.push("/");
  }

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <div
          onClick={handleClick}
          className="cursor-pointer"
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <AccountCircleIcon fontSize="large" />
        </div>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            mt: 1.5,
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <div className="min-w-72 shadow-lg rounded-lg">
          <div className="mb-2">
            <div className="flex justify-center mt-2">
              <AccountCircleIcon sx={{ fontSize: 40 }} />
            </div>
            <p className="text-center font-bold">{user?.name}</p>
            <p className="text-center">{user?.email}</p>
          </div>
          <Divider className="divider" />
          <div className="p-2 my-2 flex gap-3 items-center navItem mx-2 rounded-lg cursor-pointer">
            <SettingsSuggestIcon /> <p>Params</p>
          </div>

          <div className="flex flex-row items-center justify-between gap-5 px-2 navItem mx-2 rounded-lg cursor-pointer">
            <p>Switch theme</p>
            <ThemeToggle />
          </div>
          <div className="p-2 my-2">
            <button
              onClick={() => {
                signOut();
                router.push("/");
              }}
              className="w-full flex items-center justify-center gap-2"
            >
              Logout <LogoutIcon />
            </button>
          </div>
        </div>
      </Menu>
    </React.Fragment>
  );
}

export default UserMenuBtn;
