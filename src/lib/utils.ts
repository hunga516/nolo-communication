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

export const snakeCastToTitle = (str: string) => {
  return str.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

export const translateStatus = (status: string) => {
  switch (status) {
    case "processing":
      return "Đang xử lý";
    case "ready":
      return "Sẵn sàng";
    case "error":
      return "Lỗi";
    case "waiting":
      return "Đang chờ";
    default:
      return status;
  }
  return status;
}