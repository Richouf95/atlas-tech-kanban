import React, {useRef, useEffect} from "react";

function FilterSearchBar({
  searchKey,
  setSearchKey,
}: {
  searchKey: string;
  setSearchKey: (key: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  return (
    <form>
      <input
      ref={inputRef}
        type="text"
        name="Search Key"
        aria-label="Filter search input"
        placeholder="Search by keyword ..."
        value={searchKey}
        onChange={(e) => setSearchKey(e.target.value)}
        className="w-full text-black border my-4"
      />
    </form>
  );
}

export default FilterSearchBar;
