import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as XLSX from "xlsx";

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

export function downloadxls(e: any, data: any) {
  console.log(data);
  e.preventDefault();
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
  /* generate XLSX file and send to client */
  XLSX.writeFile(wb, "sheetjs.xlsx");
};
