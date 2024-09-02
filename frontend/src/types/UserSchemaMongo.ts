import { model, models, Schema } from "mongoose";

type ModelsType = {
  User: any;
};

export type UserType = {
  id: string;
  name: string;
  email: string;
  image: string;
};

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  image: String,
  emailVerified: Date,
});

export const UserSchema = (models as ModelsType)?.User || model("User", userSchema);
