"use client";

import React from "react";
import { ReactSortable } from "react-sortablejs";
import BoardColumn from "./BoardColumn";

// Définir une interface pour les éléments
interface ItemInterface {
  id: number; // Ajoutez d'autres propriétés si nécessaire
}

function BoardContainer() {
  const numberOfColumns = Math.floor(Math.random() * 10);

  // Créez une liste d'objets qui respectent l'interface
  const columnsList: ItemInterface[] = Array.from(
    { length: numberOfColumns },
    (_, index) => ({
      id: index,
    })
  );

  // Fonction pour mettre à jour la liste après tri
  const handleSortEnd = (newList: ItemInterface[]) => {
    // console.log("New order:", newList);
    // Mettez à jour l'état ou faites d'autres actions nécessaires
  };

  return (
    <ReactSortable<ItemInterface>
      list={columnsList}
      setList={handleSortEnd}
      group={"Columns"}
      className="flex"
      handle=".drag-handle" // Ajout de handle ici
    >
      {columnsList.map((item) => (
        <div>
          <BoardColumn key={item.id} />
        </div>
      ))}
    </ReactSortable>
  );
}

export default BoardContainer;
