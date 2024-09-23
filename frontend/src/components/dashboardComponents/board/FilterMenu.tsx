import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { useMediaQuery } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterSection from "./FilterSection";
import FilterHeader from "./FilterHeader";
import FilterSearchBar from "./FilterSearchBar";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

function FilterMenu({
  setFilterParams,
}: {
  setFilterParams: (items: any) => any;
}) {
  const [open, setOpen] = useState(false);
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const [searchKey, setSearchKey] = useState<string>("");
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);
  const [selectedDueDates, setSelectedDueDates] = useState<string[]>([]);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

  const thisBoard = useSelector((state: RootState) => state.board.board);
  const columns = useSelector((state: RootState) => state.columns.columns);
  const labels = useSelector((state: RootState) => state.labels.labels);

  useEffect(() => {
    const filterParams = {
      searchKey,
      selectedColumns,
      selectedAssignees,
      selectedDueDates,
      selectedLabels,
    };
    setFilterParams(filterParams);
  }, [
    searchKey,
    selectedColumns,
    selectedAssignees,
    selectedDueDates,
    selectedLabels,
  ]);

  const collaborators: any = [];

  if (!thisBoard) return null;
  Object.keys(thisBoard.usersAccesses).forEach((x) => {
    const item = {
      _id: x,
      name: x,
    };
    collaborators.push(item);
  });

  const toggleDrawer = (state: boolean) => () => setOpen(state);

  // Gestionnaires de changement de filtre
  const handleColumnsChange = (selected: string[]) =>
    setSelectedColumns(selected);
  const handleAssigneesChange = (selected: string[]) =>
    setSelectedAssignees(selected);
  const handleDueDatesChange = (selected: string[]) =>
    setSelectedDueDates(selected);
  const handleLabelsChange = (selected: string[]) =>
    setSelectedLabels(selected);

  return (
    <div>
      <button
        onClick={toggleDrawer(true)}
        className="cursor-pointer specialBtn"
        aria-label="Open settings"
        tabIndex={0}
      >
        <FilterListIcon /> <span>Filter</span>
      </button>
      <Drawer
        anchor={isLargeScreen ? "right" : "bottom"}
        open={open}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{ width: isLargeScreen ? 400 : "auto", padding: 2 }}
          role="presentation"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <FilterHeader onClose={toggleDrawer(false)} />

          <Divider />

          {/* Barre de recherche */}
          <FilterSearchBar searchKey={searchKey} setSearchKey={setSearchKey} />

          <Divider />

          {/* Sections de filtres réutilisables */}
          <FilterSection
            title="Columns"
            items={columns}
            selectedItems={selectedColumns}
            onSelectionChange={handleColumnsChange}
          />

          <Divider />

          <FilterSection
            title="Assign to"
            items={collaborators}
            selectedItems={selectedAssignees}
            onSelectionChange={handleAssigneesChange}
          />

          <Divider />

          <FilterSection
            title="Due Date"
            items={[
              { _id: "overdue", name: "Overdue" },
              { _id: "today", name: "Today" },
              { _id: "dueTomorrow", name: "Due tomorrow" },
            ]}
            selectedItems={selectedDueDates}
            onSelectionChange={handleDueDatesChange}
          />

          <Divider />

          <FilterSection
            title="Labels"
            items={labels}
            selectedItems={selectedLabels}
            onSelectionChange={handleLabelsChange}
          />

          <Divider />

          {/* Bouton pour effacer tous les filtres */}
          <div>
            <button
              className="w-full my-3"
              onClick={() => {
                setSearchKey("");
                setSelectedColumns([]);
                setSelectedAssignees([]);
                setSelectedDueDates([]);
                setSelectedLabels([]);
              }}
            >
              Clear filter
            </button>
          </div>
        </Box>
      </Drawer>
    </div>
  );
}

export default FilterMenu;
