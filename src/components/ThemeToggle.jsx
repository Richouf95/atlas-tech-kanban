import React from "react";
import { useDispatch, useSelector } from "react-redux";

function ThemeToggle() {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  const toggleTheme = () => {
    dispatch({
      type: "theme/toggle",
    });
  };

  return (
    <button onClick={toggleTheme} className="m-5">
      Switch to {theme === "light" ? "Dark" : "Light"} Mode
    </button>
  );
}

export default ThemeToggle;
