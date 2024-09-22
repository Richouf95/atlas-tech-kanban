import { LabelType } from "./LabelType";

export type Card = {
  _id: string
  name: string;
  index: number;
  columnId: string;
  boardId: string;
  label?: string;
  assigned?: string;
  dueDate?: string;
  description?: string;
};
