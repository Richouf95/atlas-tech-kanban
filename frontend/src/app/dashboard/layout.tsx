export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="lg:container flex flex-col min-h-screen mx-auto">
      <h2 className="bg-red-300">Header</h2>
      <div className="flex flex-1">
        <div className="grid grid-cols-12 flex-1">
          <div className="col-span-12 lg:col-span-2 bg-green-400 flex flex-col">
            Board Menu
            <div className="flex-grow"></div>{" "}
            {/* Cette div pousse le contenu vers le bas */}
          </div>
          <div className="col-span-12 lg:col-span-10 flex flex-col">
            <div className="bg-orange-400">Table Menu</div>
            <div className="bg-blue-300 flex-1 overflow-y-auto overflow-x-auto max-h-screen">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>

    //   <div className="lg:container flex flex-col min-h-screen mx-auto">
    //     <h2 className="bg-red-300">Header</h2>
    //     <div className="flex flex-col flex-1 lg:flex-row">
    //       <div className="bg-green-400 lg:w-2/12">Board Menu</div>
    //       <div className="flex flex-col flex-1">
    //         <div className="bg-orange-400">Table Menu</div>
    //         <div className="bg-blue-300 flex-1 overflow-y-auto overflow-x-auto max-h-screen pb-20">
    //           {children}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
  );
}
