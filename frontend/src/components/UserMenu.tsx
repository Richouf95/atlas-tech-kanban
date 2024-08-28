import React from "react";
import UserMenuBtn from "./UserMenuBtn";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

async function UserMenu() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <UserMenuBtn session={session} />
    </>
  );
}

export default UserMenu;
