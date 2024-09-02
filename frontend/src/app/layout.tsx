"use client";

import React, { useEffect, useState } from "react";
import "./globals.scss";
import { Provider, useSelector, useDispatch } from "react-redux";
import store from "@/store/store";
import { RootState } from "@/store/store";
import { setTheme } from "@/store/reducers/theme/themeSlice";

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch();
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as 'light' | 'dark' || 'light';
    dispatch(setTheme(savedTheme));
    setIsThemeLoaded(true);
  }, [dispatch]);

  useEffect(() => {
    const htmlElement = document.documentElement;
    htmlElement.classList.remove("light", "dark");
    htmlElement.classList.add(theme);
    // Dans un fichier JavaScript ou directement dans un script
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll('.lb-root');
  buttons.forEach(button => {
    button.classList.add('my-custom-class'); // Remplace 'my-custom-class' par la classe que tu veux ajouter
  });
});

  }, [theme]);

  if (!isThemeLoaded) {
    return null;
  }

  return <>{children}</>;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Provider store={store}>
          <ThemeWrapper>{children}</ThemeWrapper>
        </Provider>
      </body>
    </html>
  );
}
