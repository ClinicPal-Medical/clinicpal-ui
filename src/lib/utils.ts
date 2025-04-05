import { clsx, type ClassValue } from "clsx";
import { capitalize } from "lodash";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSiteHeader(pathname: string) {
  return capitalize(pathname.replaceAll("/", ""));
}

export function getCurrentDate() {
  const today = new Date();

  return today.toLocaleDateString("en-GB", {
    weekday: "long", // e.g., Saturday
    day: "numeric", // e.g., 1
    month: "long", // e.g., January
    year: "numeric", // e.g., 2025
  });
}
