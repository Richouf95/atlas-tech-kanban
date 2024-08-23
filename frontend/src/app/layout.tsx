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
    htmlElement.classList.remove("light", "dark"); // Supprimer les classes de thème précédentes
    htmlElement.classList.add(theme); // Ajouter la nouvelle classe de thème
  }, [theme]);

  if (!isThemeLoaded) {
    // Afficher un indicateur de chargement ou rien jusqu'à ce que le thème soit chargé
    return null;
  }

  return <>{children}</>; // Ne pas inclure de balises <html> ou <body> ici
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
