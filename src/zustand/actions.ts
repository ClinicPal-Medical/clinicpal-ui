"use server";

import { ApiErrorResponse, User } from "@/lib/types";
import { LoginFormInputs } from "../app/login/page";
import { AxiosError, AxiosResponse } from "axios";
import { cookies } from "next/headers";
import { POST } from "@/lib/api";

export async function loginUser({ email, password }: LoginFormInputs): Promise<User> {
  const payload = {
    email: email,
    password: password,
  };

  try {
    const response: AxiosResponse = await POST("/auth/login", payload);
    const user: User = response?.data;

    if (user && user.userId) {
      (await cookies()).set("token", user?.userId, {
        httpOnly: true,
        secure: true,
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day
        sameSite: "lax",
      });
      return user;
    }

    throw new Error("Login failed. User data is missing or invalid.");
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    throw new Error(axiosError?.response?.data.description || "Login failed");
  }
}

export async function logoutUser(): Promise<void> {
  (await cookies()).delete("token");
}
