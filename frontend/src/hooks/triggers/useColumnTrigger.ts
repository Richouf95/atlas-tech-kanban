import { useRef } from "react";
import { useDispatch } from "react-redux";
import {
  addColumn,
  removeColumn,
  updateColumns,
} from "@/store/reducers/columns/columnsSlice";

export const useColumnTrigger = () => {
  const dispatch = useDispatch();
  const columnChangeStreamRef: any = useRef(null);

  const columnTrigger = async (app: any) => {
    try {
      const mongodb = app.currentUser?.mongoClient("Cluster0");
      const columnsCollection = mongodb
        ?.db("atlas-tech-db")
        .collection("columns");

      columnChangeStreamRef.current = columnsCollection?.watch();
      const labelChangeStream = columnChangeStreamRef.current;

      for await (const change of labelChangeStream) {
        if (change.operationType === "insert") {
          const newColumn = {
            ...change.fullDocument,
            _id: change.documentKey._id.toString(),
          };
          dispatch(addColumn(newColumn));
        }
        if (change.operationType === "update") {
          const updatedColumn = {
            ...change.fullDocument,
            _id: change.documentKey._id.toString(),
          };
          dispatch(updateColumns(updatedColumn));
        }
        if (change.operationType === "delete") {
          dispatch(removeColumn(change.documentKey._id.toString()));
        }
      }
    } catch (error) {
      console.error(
        "Erreur lors de la connexion à la collection columns :",
        error
      );
    }
  };

  return { columnTrigger };
};
