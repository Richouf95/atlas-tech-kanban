import BoardMenu from "@/components/dashboardComponents/BoardMenu";
import DashboardHeader from "@/components/dashboardComponents/DashboardHeader";
import DashboardMenu from "@/components/dashboardComponents/DashboardMenu";

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="lg:container mx-auto h-screen">
      <div className="flex flex-col h-full">
        <DashboardHeader />
        <main className="flex flex-col lg:flex-row flex-1 h-full">
          <DashboardMenu />
          <div className="flex flex-col flex-1 overflow-hidden" id="hehe">
            <BoardMenu />
            <div className="flex-1 overflow-hidden flex flex-col">
              <div className="flex-1 overflow-x-auto overflow-y-auto max-h-full max-w-full">
                {children}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
