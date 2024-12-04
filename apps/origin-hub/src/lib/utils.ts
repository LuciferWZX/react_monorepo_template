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
const intersectionObs = (target: HTMLElement, parent: HTMLElement) => {
  const targetRect = target.getBoundingClientRect();
  const parentRect = parent.getBoundingClientRect();
  const {
    top: targetTop,
    left: targetLeft,
    bottom: targetBottom,
    right: targetRight,
  } = targetRect;
  const {
    top: parentTop,
    left: parentLeft,
    bottom: parentBottom,
    right: parentRight,
  } = parentRect;
  return (
    targetTop < parentBottom &&
    targetBottom > parentTop &&
    targetLeft < parentRight &&
    targetRight > parentLeft
  );
};
export function isCollision(target: HTMLElement, parent: HTMLElement) {
  return intersectionObs(target, parent);
}
