import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import store from "storejs";
import { ConstantManager } from "@/instances/ConstantManager.ts";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const getAppColor = () => {
  const colors = ["red", "orange", "yellow", "green", "blue"];
  const color: string | null = store.get(ConstantManager.APP_COLOR);
  if (color === null || !colors.includes(color)) {
    return "blue";
  }
  return color;
};
