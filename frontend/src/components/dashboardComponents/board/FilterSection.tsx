import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

function FilterSection({
  title,
  items,
  selectedItems,
  onSelectionChange,
}: {
  title: string;
  items: any;
  selectedItems: string[];
  onSelectionChange: (selected: string[]) => void;
}) {
  const [open, setOpen] = useState(false);

  const handleCheckboxChange = (item: any) => {
    if (selectedItems.includes(item.id)) {
      onSelectionChange(selectedItems.filter((id) => id !== item.id));
    } else {
      onSelectionChange([...selectedItems, item.id]);
    }
  };

  return (
    <div>
      <button
        className="cursor-pointer font-bold flex items-center p-2 my-2 specialBtn"
        onClick={() => setOpen(!open)}
      >
        {title}
        <KeyboardArrowDownIcon
          className={`ml-2 transform transition-transform duration-300 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      <div
        className={`transition-height duration-300 ${
          open ? "max-h-[1000px]" : "max-h-0"
        } overflow-hidden`}
      >
        <ul>
          {title === "Columns" && items && items.length === 0 && <span className="ml-5">No columns yet</span>}
          {title === "Labels" && items && items.length === 0 && <span className="ml-5">No labels yet</span>}
          {items &&
            items.map((item: any) => (
              <li key={item.id} className="px-4 py-2 flex items-center gap-2">
                <input
                  className="cursor-pointer w-4 h-4"
                  type="checkbox"
                  id={item.name}
                  name={item.name}
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleCheckboxChange(item)}
                />
                <label
                  className="cursor-pointer flex items-center gap-2"
                  htmlFor={item.name}
                >
                  {title === "Columns" && <SpaceDashboardIcon />}
                  {title === "Assign to" && <AccountCircleIcon />}
                  {title === "Due Date" && item.name === "Overdue" ? (
                    <span className="text-red-300">
                      <CalendarMonthIcon />
                    </span>
                  ) : item.name === "Today" ? (
                    <span className="text-orange-300">
                      <CalendarMonthIcon />
                    </span>
                  ) : item.name === "Due tomorrow" ? (
                    <span className="text-green-300">
                      <CalendarMonthIcon />
                    </span>
                  ) : item.name === "No deadline" ? (
                    <span>
                      <CalendarMonthIcon />
                    </span>
                  ) : (
                    ""
                  )}
                  <span className="block">
                    {title === "Labels" ? (
                      <span
                        className="px-4 py-1 rounded-xl"
                        style={{ backgroundColor: item.color }}
                      >
                        {item.name}
                      </span>
                    ) : (
                      item.name
                    )}
                  </span>
                </label>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default FilterSection;
