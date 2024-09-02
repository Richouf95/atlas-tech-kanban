"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import { signOut } from "next-auth/react";
import Spinner from "./Spinner";
import { ClickAwayListener } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

function UserMenuBtn({ session }: { session: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const router = useRouter();

  const theme = useSelector((state: RootState) => state.theme.theme);

  const user = session?.user;

  if (!user) {
    router.push("/");
  }

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut({ redirect: false });
      router.push("/");
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    // Ouverture du menu avec Entrée ou Espace
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggleMenu();
    }
  };

  const handleMenuKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // Fermer le menu avec Échappement
    if (e.key === "Escape") {
      e.preventDefault();
      handleCloseMenu();
      triggerRef.current?.focus(); // Remettre le focus sur le bouton
    }
  };

  // Focuser le premier élément du menu quand il s'ouvre
  useEffect(() => {
    if (isOpen && menuRef.current) {
      const firstFocusableElement = menuRef.current.querySelector(
        "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
      ) as HTMLElement | null;
      firstFocusableElement?.focus();
    }
  }, [isOpen]);

  return (
    <nav>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <button
          ref={triggerRef}
          onClick={handleToggleMenu}
          onKeyDown={handleKeyDown}
          aria-haspopup="true"
          aria-expanded={isOpen ? "true" : "false"}
          aria-controls="custom-menu"
          style={{ borderRadius: "50%", padding: "0" }}
        >
          <AccountCircleIcon fontSize="large" />
        </button>
      </Box>
      {isOpen && (
        <ClickAwayListener onClickAway={handleCloseMenu}>
          <div
            ref={menuRef}
            id="custom-menu"
            role="menu"
            aria-labelledby="menu-button"
            onKeyDown={handleMenuKeyDown}
            className={`absolute right-5 z-20 mt-2 min-w-72 shadow-xl rounded-lg p-2 ${
              theme === "light" ? "bg-white border" : "bg-[#212121] border"
            }`}
          >
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
                onClick={handleSignOut}
                className="w-full flex items-center justify-center gap-2"
              >
                {isLoading && <Spinner />} Logout <LogoutIcon />
              </button>
            </div>
          </div>
        </ClickAwayListener>
      )}
    </nav>
  );
}

export default UserMenuBtn;
