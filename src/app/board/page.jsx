import React from "react";

function page() {
  return (
    <div className="container flex flex-col min-h-screen mx-auto">
      <div className="flex justify-between p-2 bg-red-400">NavBar</div>
      <div className="flex flex-col flex-1 lg:flex-row">
        {/* Board Menu */}
        <div className="h-auto bg-green-400 lg:w-2/12 lg:h-full">Board Menu</div>
        {/* Main Content */}
        <div className="flex flex-col flex-1">
          <div className="bg-orange-400">Table Menu</div>
          <div className="flex-1 bg-blue-400">Table Main content</div>
        </div>
      </div>
    </div>
  );
}

export default page;
