// next-auth.d.ts
import NextAuth from "next-auth";

// Extend the default session to include the `id` property.
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
  }
}
