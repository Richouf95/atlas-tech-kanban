import { UserSchema, UserType } from "@/types/UserSchemaMongo";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const connectionString = process.env.MONGODB_URI;
  if (!connectionString) {
    return new Response("no db connection string", { status: 500 });
  }

  await mongoose.connect(connectionString);

  let users = [];

  users = await UserSchema.find({});

  return Response.json(
    users.map((u: UserType) => ({
      id: u.email,
      name: u.name,
      image: u.image,
      avatar: u.image,
    }))
  );
}
