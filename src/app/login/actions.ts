"use server";

import { User } from "@/lib/types";
import { LoginFormInputs } from "./page";
import { UserRoles } from "@/lib/enums";
import { cookies } from "next/headers";

export async function loginUser({ email }: LoginFormInputs): Promise<User> {
  const user: User = {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: email,
    phone: "1234567890",
    role: UserRoles.ADMIN,
    clinicId: "1",
    authToken: "1234567890",
  };

  (await cookies()).set("token", user.authToken, {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
    sameSite: "lax",
  });

  return user;
}
