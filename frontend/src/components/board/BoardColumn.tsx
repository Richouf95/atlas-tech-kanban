import React from "react";
import BoardCard from "./BoardCard";
import { ReactSortable } from "react-sortablejs";

// Définir une interface pour les éléments
interface ItemInterface {
  id: number; // Ajoutez d'autres propriétés si nécessaire
}

function BoardColumn() {
  // Générer un nombre aléatoire entre 0 et 20
  const numberOfCards = Math.floor(Math.random() * 5);

  // Créer un tableau avec le nombre de BoardCard à afficher
  // const boardCards = Array.from({ length: numberOfCards }, (_, index) => (
  //   <BoardCard key={index} />
  // ));
  // const boardCards: ItemInterface[] = Array.from({ length: numberOfCards }, (_, index) => (
  //   <BoardCard key={index} />
  // ));

  const boardCards: ItemInterface[] = Array.from(
    { length: numberOfCards },
    (_, index) => ({
      id: index,
    })
  );

  // Fonction pour mettre à jour la liste après tri
  const handleSortEnd = (newList: ItemInterface[]) => {
    console.log("New order:", newList);
    // Mettez à jour l'état ou faites d'autres actions nécessaires
  };

  return (
    <div className="mx-5 border p-5 min-w-64 bg-gray-50">
      <div className="bg-blue-300 drag-handle">Column name</div>
      <>
        <ReactSortable<ItemInterface>
          list={boardCards}
          setList={handleSortEnd}
          group={"Cards"}
          // handle=".drag-handle" // Ajout de handle ici
        >
          {boardCards.map((item) => (
            <BoardCard key={item.id} />
          ))}
        </ReactSortable>
      </>
    </div>
  );
}

export default BoardColumn;
