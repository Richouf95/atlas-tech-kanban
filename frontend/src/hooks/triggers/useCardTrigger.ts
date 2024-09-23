import { useRef } from "react";
import { useDispatch } from "react-redux";
import {
  addCard,
  removeCard,
  updateCard,
} from "@/store/reducers/cards/cardsSlice";
import * as Realm from "realm-web";

export const useCardTrigger = () => {
  const dispatch = useDispatch();
  const cardChangeStreamRef: any = useRef(null);

  const cardTrigger = async (app: Realm.App) => {
    try {
      const mongodb = app.currentUser?.mongoClient("Cluster0");
      const cardCollection = mongodb?.db("atlas-tech-db").collection("cards");

      if (!cardCollection) {
        console.error("Collection 'cards' non trouvée.");
        return;
      }

      cardChangeStreamRef.current = cardCollection.watch();
      const cardChangeStream = cardChangeStreamRef.current;

      for await (const change of cardChangeStream) {
        if (change.operationType === "insert") {
          const newCard = {
            ...change.fullDocument,
            _id: change.documentKey._id.toString(),
            columnId: change.documentKey.columnId.toString(),
          };
          dispatch(addCard(newCard));
        }
        if (change.operationType === "update") {
          const updatedCard = {
            ...change.fullDocument,
            _id: change.documentKey._id.toString(),
            columnId: change.documentKey.columnId.toString(),
            ...(change.fullDocument.label && {
              label: change.fullDocument.label.toString(),
            }),
          };
          dispatch(updateCard(updatedCard));
        }
        if (change.operationType === "delete") {
          dispatch(removeCard(change.documentKey._id.toString()));
        }
      }
    } catch (error) {
      console.error(
        "Erreur lors de la connexion à la collection Card :",
        error
      );
    }
  };

  return { cardTrigger };
};
