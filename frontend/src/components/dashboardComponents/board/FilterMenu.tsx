import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { useMediaQuery } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useStorage } from "@/app/liveblocks.config";
import { shallow } from "@liveblocks/client";
import FilterSection from "./FilterSection";
import FilterHeader from "./FilterHeader";
import FilterSearchBar from "./FilterSearchBar";

function FilterMenu({
  id,
  usersAccesses,
  metadata,
  setFilterParams,
}: {
  id: string;
  usersAccesses: any;
  metadata: any;
  setFilterParams: (items: any) => any;
}) {
  const [open, setOpen] = useState(false);
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const [searchKey, setSearchKey] = useState<string>("");

  // Ajout d'états pour les filtres sélectionnés
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);
  const [selectedDueDates, setSelectedDueDates] = useState<string[]>([]);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

  // Utilisation de Liveblocks pour récupérer les données nécessaires
  const columns = useStorage(
    (root) => root.columns.map((col) => ({ ...col })),
    shallow
  );
  const cards = useStorage(
    (root) => root.cards.map((card) => ({ ...card })),
    shallow
  );
  const labels = useStorage(
    (root) => root.labels.map((label) => ({ ...label })),
    shallow
  );
  const collaborators: any = [];

  Object.keys(usersAccesses).forEach((x) => {
    const item = {
      id: x,
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
              { id: "overdue", name: "Overdue" },
              { id: "today", name: "Today" },
              { id: "dueTomorrow", name: "Due tomorrow" },
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
                setSearchKey('');
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
