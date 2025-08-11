"use server";

import { cookies } from "next/headers";
import { User } from "./types";

export async function setSessionCookie(user: User) {
  if (user.id) {
    (await cookies()).set("token", user.id, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
      sameSite: "lax",
    });
  }
}

export async function deleteSessionCookie() {
  (await cookies()).delete("token");
}
