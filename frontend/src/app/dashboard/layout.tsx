export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="lg:container mx-auto h-screen">
      <div className="flex flex-col h-full">
        <div className="flex justify-between bg-red-300">
          <h2>Header</h2>
          <h2>Action</h2>
        </div>
        <div className="flex flex-col lg:flex-row flex-1 h-full">
          <div className="bg-green-400 lg:min-h-screen lg:min-w-48">
            Board Menu
          </div>
          <div className="flex flex-col flex-1 overflow-hidden" id="hehe">
            <div className="bg-orange-400 flex justify-between">
              <h2>Table Menu</h2>
              <h2>Action</h2>
            </div>
            <div className="flex-1 overflow-hidden flex flex-col">
              <div className="flex-1 overflow-x-auto overflow-y-auto max-h-full max-w-full">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
