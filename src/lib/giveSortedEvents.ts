import { IEvent } from "@/redux/features/calendarSlice";
import dayjs from "dayjs";

export const giveSortedEvents = (events: IEvent[]) => {
  if (!events?.length) {
    return null;
  }
  return [...events]?.sort((eventOne, eventTwo) => {
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
