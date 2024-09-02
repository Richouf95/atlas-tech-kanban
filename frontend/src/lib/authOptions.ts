import clientPromise from "@/lib/mongoClient";
import { UserSchema } from "@/types";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

export const authOptions: AuthOptions = {
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const connectionString = process.env.MONGODB_URI;
        if (!connectionString) {
          return new Response("no db connection string", { status: 500 });
        }
      
        await mongoose.connect(connectionString);
        
        const user = await UserSchema.findOne({ email: credentials?.email });
        if (!user) throw Error("User not exist");
        const correctPass = await bcrypt.compare(
          credentials!.password,
          user.password
        );
        if (!correctPass) throw Error("Pass not correct");
        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        (token.name = user.name),
          (token.email = user.email),
          (token.id = user.id);
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = session.user || {};
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.id = token?.id as string;
      }
      return session;
    },
  },
  // @ts-ignore
  adapter: MongoDBAdapter(clientPromise),
};
