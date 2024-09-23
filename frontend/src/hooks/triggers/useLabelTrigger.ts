import { useRef } from "react";
import { useDispatch } from "react-redux";
import { addLabel } from "@/store/reducers/labels/labelsSlice";

export const useLabelTrigger = () => {
  const dispatch = useDispatch();
  const labelChangeStreamRef: any = useRef(null);

  const labelTrigger = async (app: any) => {
    try {
      const mongodb = app.currentUser?.mongoClient("Cluster0");
      const labelCollection = mongodb?.db("atlas-tech-db").collection("labels");

      labelChangeStreamRef.current = labelCollection?.watch();
      const labelChangeStream = labelChangeStreamRef.current;

      for await (const change of labelChangeStream) {
        if (change.operationType === "insert") {
          const newLabel = {
            ...change.fullDocument,
            _id: change.fullDocument._id.toString(),
          };
          dispatch(addLabel(newLabel));
        }
      }
    } catch (error) {
      console.error(
        "Erreur lors de la connexion à la collection Label :",
        error
      );
    }
  };

  return { labelTrigger };
};
