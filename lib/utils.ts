import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function splitName(name: string | undefined) {
  let splitName = name !== undefined ? name.split(" ") : ['John', 'Doe'];
  if (splitName.length == 1) {
    splitName = [splitName.join(), ""];
  } else if (splitName.length > 2) {
    splitName = [splitName[0], splitName.slice(1).join(" ")];
  }
  return splitName;
}
