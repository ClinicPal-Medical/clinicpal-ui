"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const userLoggedIn = false;

  useEffect(() => {
    if (userLoggedIn) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [router, userLoggedIn]);
}
