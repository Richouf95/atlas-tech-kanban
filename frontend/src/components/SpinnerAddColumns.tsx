import React from "react";

function SpinnerAddColumns() {
  return (
    <div className="min-w-64 flex-shrink-0">
      <div className="p-4 max-w-xs w-full mx-auto">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-6 py-1">
            <div className="h-10 bg-[#D7D7D7] rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpinnerAddColumns;
