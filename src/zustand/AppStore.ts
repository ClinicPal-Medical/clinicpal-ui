import { Clinic, User } from "@/lib/types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface AppStore {
  user: User | null;
  setUser: (user: User) => void;
  clinic: Clinic | null;
  setClinic: (clinic: Clinic) => void;
  logOut: () => void;
}

export const useAppStore = create<AppStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user) => set({ user }),
        clinic: null,
        setClinic: (clinic) => set({ clinic }),
        logOut: () => set({ user: null }),
      }),
      {
        name: "app-store",
      },
    ),
  ),
);
