"use client";

import React, { useEffect, useState } from "react";
import DashboardHeader from "@/components/dashboardComponents/DashboardHeader";
import DashboardMenu from "@/components/dashboardComponents/DashboardMenu";

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
    <div className="lg:container mx-auto h-screen">
      <div className="flex flex-col flex-1">
        <DashboardHeader />
        <main className="flex flex-col lg:flex-row flex-1 h-full">
          <DashboardMenu />
          <div className="flex flex-col flex-1 overflow-hidden" id="hehe">
            <div
              style={{ height: exempleHeight }}
              className="overflow-y-auto"
            >
              {children}
            </div>
            {/* <div className="flex-1 overflow-hidden flex flex-col">
              <div className="flex-1 overflow-x-auto overflow-y-auto max-h-full max-w-full">
                {children}
              </div>
            </div> */}
          </div>
        </main>
      </div>
    </div>
  );
}

// import BoardMenu from "@/components/dashboardComponents/BoardMenu";
// import DashboardHeader from "@/components/dashboardComponents/DashboardHeader";
// import DashboardMenu from "@/components/dashboardComponents/DashboardMenu";

// export default function DashBoardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="lg:container mx-auto h-screen">
//       <div className="flex flex-col flex-1">
//         <DashboardHeader />
//         <main className="flex flex-col lg:flex-row flex-1 h-full">
//           <DashboardMenu />
//           <div className="flex flex-col flex-1 overflow-hidden" id="hehe">
//             <BoardMenu />
//             <div className="flex-1 overflow-hidden flex flex-col">
//               <div className="flex-1 overflow-x-auto overflow-y-auto max-h-full max-w-full">
//                 {children}
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }
