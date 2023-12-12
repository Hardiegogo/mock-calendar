import { IEvent } from "@/redux/features/calendarSlice";
import dayjs from "dayjs";
import { convertDateFormatYYYYMMDD } from "./utils";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(isSameOrAfter);

export const giveSortedEvents = (events: IEvent[] | null, date: string) => {
  if (!events || !date) {
    return null;
  }
  const filteredEvents = events.filter((event) => {
    if (!event?.leaveDates?.includes(date)) {
      return dayjs(convertDateFormatYYYYMMDD(date)).isSameOrAfter(
        convertDateFormatYYYYMMDD(event.date)
      );
    } else return false;
  });
  return [...filteredEvents]?.sort((eventOne, eventTwo) => {
    const startOne = dayjs(eventOne.date + " " + eventOne.startTime, {
      format: "DD-MM-YYYY HH:mm",
    });
    const startTwo = dayjs(eventTwo.date + " " + eventTwo.startTime, {
      format: "DD-MM-YYYY HH:mm",
    });
    if (startOne.isBefore(startTwo)) {
      return -1;
    } else if (startOne.isAfter(startTwo)) {
      return 1;
    } else return 0;
  });
};
