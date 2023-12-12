import { type ClassValue, clsx } from "clsx";
import dayjs, { Dayjs } from "dayjs";
import { twMerge } from "tailwind-merge";

export interface DayObject {
  date: string;
  day: string;
  dayObj: Dayjs;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateMonthDays = (year: number, month: number) => {
  const daysInMonth = dayjs(`${year}-${month + 1}`).daysInMonth();

  const firstDayOfMonth = dayjs(`${year}-${month + 1}-01`);

  const daysNeededFromPreviousMonth =
    firstDayOfMonth.day() === 0 ? 6 : firstDayOfMonth.day() - 1;
  const daysNeededFromNextMonth =
    35 - (daysInMonth + daysNeededFromPreviousMonth);

  const startDayOfGrid = firstDayOfMonth.subtract(
    daysNeededFromPreviousMonth + 1,
    "day"
  );
  const endDayOfGrid = startDayOfGrid.add(
    daysInMonth + daysNeededFromPreviousMonth + daysNeededFromNextMonth - 1,
    "day"
  );

  const daysArray: DayObject[] = [];

  for (
    let day = startDayOfGrid;
    day.isBefore(endDayOfGrid.add(1, "day"));
    day = day.add(1, "day")
  ) {
    daysArray.push({
      day: day.format("dddd"),
      date: day.format("DD-MM-YYYY"),
      dayObj: day,
    });
  }

  return daysArray;
};

export function convertDateFormatYYYYMMDD(inputDate:string) {
  // Split the inputDate into day, month, and year parts
  const [day, month, year] = inputDate.split('-');

  // Create a new date string in the required format (YYYY-MM-DD)
  const convertedDate = `${year}-${month}-${day}`;

  return convertedDate;
}
