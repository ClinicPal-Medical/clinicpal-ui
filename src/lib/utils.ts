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
  const formattedToday = today.toLocaleDateString("en-GB", {
    weekday: "long", // e.g., Saturday
    day: "numeric", // e.g., 1
    month: "long", // e.g., January
    year: "numeric", // e.g., 2025
  });
  const weekday = formattedToday.split(" ")[0].concat(", ");

  return weekday.concat(formattedToday.split(" ").slice(1).join(" "));
}

export const toLocalDate = (str: string) => {
  const [year, month, day] = str.split("T")[0].split("-").map(Number);
  return new Date(year, month - 1, day);
};

export const formatDateTime = (date: Date, time: string) => {
  return date.toISOString().slice(0, 11) + time;
};
