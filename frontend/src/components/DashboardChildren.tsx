"use client"

import React, { ReactNode, useEffect, useState } from "react";

function DashboardChildren({ children }: { children: ReactNode }) {
  const [exempleHeight, setExempleHeight] = useState("0px");
  useEffect(() => {
    const updateHeight = () => {
      const screenHeight = window.innerHeight;
      const div1Height =
        document.querySelector("#DashboardHeader")?.clientHeight || 0;
      const div2Height =
        document.querySelector("#BoardMenu")?.clientHeight || 0;
      const totalHeight = div1Height + div2Height;

      setExempleHeight(`${screenHeight - totalHeight - 5}px`);
    };

    // Initial update
    updateHeight();

    // Update height on window resize
    window.addEventListener("resize", updateHeight);
    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);
  return (
    <div className="flex flex-col flex-1 overflow-hidden" id="hehe">
      <div style={{ height: exempleHeight }} className="overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

export default DashboardChildren;
