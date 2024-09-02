import clientPromise from "@/lib/mongoClient";
import { UserSchema } from "@/types";
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    await clientPromise;

    const body = await req.json();
    const { name, email, password } = body;

    const existUser = await UserSchema.findOne({ email });

    if (existUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), {
        status: 409,
        headers: { "Content-Type": "application/json" },
      });
    }

    const hashPass = await bcrypt.hash(password, 10);

    await UserSchema.create({ name, email, password: hashPass });

    return new Response(
      JSON.stringify({ message: "User registered successfully" }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);

    return new Response(
      JSON.stringify({ error: "Error while registering user" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
