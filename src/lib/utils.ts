import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDuration = (duration: number) => {
  const second = Math.floor(duration % 60);
  const minute = Math.floor((duration / 60) % 60);

  return `${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")}`;
}