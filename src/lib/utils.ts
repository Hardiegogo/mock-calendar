import { type ClassValue, clsx } from "clsx";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";

export interface DayObject {
  date: string;
  day: string;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateMonthDays = (year: number, month: number) => {
  const daysInMonth = dayjs(`${year}-${month + 1}`).daysInMonth();
  const firstDayOfMonth = dayjs(`${year}-${month + 1}-01`);

  const daysArray: DayObject[] = [];

  for (let i = 0; i < daysInMonth; i++) {
    const day = firstDayOfMonth.add(i, "day");
    daysArray.push({
      day: day.format("dddd"),
      date: day.format("DD-MM-YYYY"),
    });
  }

  return daysArray;
};
