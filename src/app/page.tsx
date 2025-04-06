"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const userLoggedIn = {
      id: 101234,
      name: "John Doe",
      email: "johnd@clinicpal.com",
      roles: ["admin", "staff"],
    };
    if (userLoggedIn) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [router]);
}
