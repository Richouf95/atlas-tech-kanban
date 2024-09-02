"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { toggleTheme } from "@/store/reducers/theme/themeSlice";
import LightModeIcon from "@mui/icons-material/LightMode";
import NightlightRoundSharpIcon from "@mui/icons-material/NightlightRoundSharp";

function ThemeToggle() {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleTheme());
    document.body.classList.add("transition-theme"); // Add transition class
  };

  return (
    <div className="flex items-center">
      <label className="inline-flex items-center cursor-pointer themeSwitchBtn">
        <input
          type="checkbox"
          checked={theme === "dark"}
          onChange={handleToggle}
          className="sr-only peer"
        />
        <div
          className={`relative flex items-center justify-between w-14 h-6 rounded-full transition-colors duration-300 ease-in-out ${
            theme === "light" ? "bg-[#212121]" : "bg-white"
          }`}
        >
          <LightModeIcon
            className={`w-5 h-5 text-black transition-opacity duration-300 ease-in-out ${
              theme === "light" ? "opacity-0" : "opacity-100"
            }`}
          />
          <div
            className={`absolute left-[4px] w-6 h-6 rounded-full transition-transform duration-300 ease-in-out ${
              theme === "light"
                ? "bg-white translate-x-0"
                : "bg-[#212121] translate-x-[28px]"
            }`}
          ></div>
          <NightlightRoundSharpIcon
            className={`w-5 h-5 text-white transition-opacity duration-300 ease-in-out ${
              theme === "light" ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      </label>
    </div>
  );
}

export default ThemeToggle;
