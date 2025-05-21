import { Clinic, User } from "@/lib/types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface AppStore {
  user: User | null;
  setUser: (user: User) => void;
  clinic: Clinic | null;
  setClinic: (clinic: Clinic) => void;
  logOut: () => void;
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
}

export const useAppStore = create<AppStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user) => set({ user }, false, "SET_USER"),
        clinic: null,
        setClinic: (clinic) => set({ clinic }, false, "SET_CLINIC"),
        logOut: () => set({ user: null }, false, "LOG_OUT"),
        isLoading: false,
        setLoading: (isLoading) => set({ isLoading }, false, "SET_LOADING"),
      }),
      {
        name: "app-store",
      },
    ),
  ),
);
