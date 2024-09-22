import { UsersAccesses } from "./Board";

export type Project = {
  _id: string;
  name: string;
  usersAccesses: UsersAccesses
};
