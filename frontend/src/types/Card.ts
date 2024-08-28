import { LabelType } from "./LabelType";

export type Card = {
  name: string;
  id: string;
  index: number;
  columnId: string;
  assigned: string;
  dueDate: string;
  label: LabelType | string;
  description: string;
};
