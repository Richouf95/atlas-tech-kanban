export type UsersAccesses = {
  [email: string]: string[];
};

export type Board = {
  _id: string;
  boardName: string;
  ownerName: string;
  ownerEmail: string;
  description?: string; // facultatif
  projectId?: string;   // facultatif
  usersAccesses: UsersAccesses;
};
