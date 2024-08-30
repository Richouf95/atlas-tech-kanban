import React from "react";

function FilterSearchBar({
  searchKey,
  setSearchKey,
}: {
  searchKey: string;
  setSearchKey: (key: string) => void;
}) {
  return (
    <div>
      <input
        type="text"
        name="Search Key"
        autoFocus
        placeholder="Search by keyword ..."
        value={searchKey}
        onChange={(e) => setSearchKey(e.target.value)}
        className="w-full text-black border my-4"
      />
    </div>
  );
}

export default FilterSearchBar;
